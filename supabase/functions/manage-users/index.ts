import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const roles = new Set(["admin", "financeiro", "operacional", "consulta"]);
const APP_KEY = "imobiliaria";

function normalizeRole(value: unknown) {
  const role = String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (["admin", "administrador", "administrator", "owner", "proprietario", "master"].includes(role)) return "admin";
  return role;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Sessão ausente." }, 401);
    const { data: authData, error: authError } = await admin.auth.getUser(token);
    if (authError || !authData.user) return json({ error: "Sessão inválida." }, 401);

    const { data: caller, error: callerError } = await admin
      .from("app_users")
      .select("user_id,name,email,role,active,app_key")
      .eq("user_id", authData.user.id)
      .eq("app_key", APP_KEY)
      .maybeSingle();
    if (callerError) throw callerError;
    if (!caller?.active) return json({ error: "Usuário sem acesso ativo ao App Imobiliária." }, 403);
    const metadataRole = normalizeRole(authData.user.app_metadata?.role || authData.user.user_metadata?.role);
    caller.role = metadataRole === "admin" ? "admin" : normalizeRole(caller.role);
    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "me");
    if (action === "me") return json({ user: caller });
    if (String(caller.role || "").trim().toLowerCase() !== "admin") return json({ error: "Apenas administradores podem gerenciar usuários." }, 403);

    if (action === "list") {
      const { data, error } = await admin
        .from("app_users")
        .select("user_id,name,email,role,active,app_key,created_at,updated_at")
        .eq("app_key", APP_KEY)
        .order("name");
      if (error) throw error;
      return json({ users: data || [] });
    }

    if (action === "invite") {
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const role = String(body.role || "consulta");
      if (!name || !email || !roles.has(role)) return json({ error: "Informe nome, e-mail e perfil válidos." }, 400);
      const redirectTo = String(body.redirectTo || "").trim() || undefined;
      let invitationSent = false;
      let invited;
      let result = await admin.auth.admin.inviteUserByEmail(email, {
        data: { name, app: APP_KEY, app_key: APP_KEY },
        ...(redirectTo ? { redirectTo } : {}),
      });
      if (result.error) {
        if (!/already|registered|exists/i.test(result.error.message)) return json({ error: result.error.message }, 400);
        const listed = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
        if (listed.error) throw listed.error;
        invited = listed.data.users.find((user) => user.email?.toLowerCase() === email);
        if (!invited) return json({ error: "O e-mail já existe, mas não foi possível localizar o usuário." }, 400);
        if (!invited.email_confirmed_at && !invited.last_sign_in_at) {
          const { error: deleteError } = await admin.auth.admin.deleteUser(invited.id);
          if (deleteError) throw deleteError;
          result = await admin.auth.admin.inviteUserByEmail(email, {
            data: { name, app: APP_KEY, app_key: APP_KEY },
            ...(redirectTo ? { redirectTo } : {}),
          });
          if (result.error) return json({ error: result.error.message }, 400);
          invited = result.data.user;
          invitationSent = true;
        } else {
          const { error: recoveryError } = await admin.auth.resetPasswordForEmail(email, {
            ...(redirectTo ? { redirectTo } : {}),
          });
          if (recoveryError) return json({ error: recoveryError.message }, 400);
          invitationSent = true;
        }
      } else {
        invited = result.data.user;
        invitationSent = true;
      }
      const { error: profileError } = await admin.from("app_users").upsert({
        user_id: invited.id, name, email, role, active: true, app_key: APP_KEY, invited_by: authData.user.id, updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
      if (profileError) throw profileError;
      return json({ user: { user_id: invited.id, name, email, role, active: true, app_key: APP_KEY }, invitationSent }, invitationSent ? 201 : 200);
    }

    if (action === "update") {
      const userId = String(body.userId || "");
      const role = String(body.role || "");
      if (!userId || !roles.has(role)) return json({ error: "Usuário ou perfil inválido." }, 400);
      if (userId === authData.user.id && role !== "admin") return json({ error: "Outro administrador deve alterar o seu perfil." }, 400);
      const { error } = await admin.from("app_users").update({ role, updated_at: new Date().toISOString() }).eq("user_id", userId).eq("app_key", APP_KEY);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "deactivate") {
      const userId = String(body.userId || "");
      if (!userId || userId === authData.user.id) return json({ error: "O administrador não pode desativar o próprio acesso." }, 400);
      const { error } = await admin.from("app_users").update({ active: false, updated_at: new Date().toISOString() }).eq("user_id", userId).eq("app_key", APP_KEY);
      if (error) throw error;
      await admin.auth.admin.updateUserById(userId, { ban_duration: "876000h" });
      return json({ ok: true });
    }
    return json({ error: "Ação desconhecida." }, 400);
  } catch (error) {
    console.error(error);
    const detail = error instanceof Error
      ? error.message
      : (typeof error === "object" && error && "message" in error ? String(error.message) : JSON.stringify(error));
    return json({ error: detail || "Falha interna." }, 500);
  }
});

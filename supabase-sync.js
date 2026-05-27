// ============================================================
// CAMADA DE SINCRONIZACAO COM SUPABASE
// ============================================================
// - Login com email/senha
// - Carrega estado de workspace_state (linha unica compartilhada)
// - Salva com debounce (300ms) para evitar excesso de writes
// - Realtime: outros usuarios veem mudancas na hora
// - Fallback: mantem ultimo estado em localStorage como cache offline
// ============================================================

(function () {
  const cfg = window.SUPABASE_CONFIG;
  if (!cfg || !cfg.SUPABASE_URL:"https://afwynugokyejfbrtyobk.supabase.co", || cfg.SUPABASE_URL.includes("gestao-locacoes")) {
    console.warn("[Supabase] Configure supabase-config.js antes de usar.");
    return;
  }

  const client = window.supabase.createClient(cfg.SUPABASE_URL:"https://afwynugokyejfbrtyobk.supabase.co", cfg.SUPABASE_ANON_KEY:"Imobiliaria@!",);
  const CACHE_KEY = "gestao-supabase-cache-v1";
  let saveTimer = null;
  let lastLocalUpdate = 0; // timestamp do nosso ultimo save (para ignorar eco do realtime)

  // ---------- AUTH ----------
  async function signIn(email, password) {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  }

  async function signOut() {
    await client.auth.signOut();
    location.reload();
  }

  async function getCurrentUser() {
    const { data } = await client.auth.getUser();
    return data.user || null;
  }

  // ---------- ESTADO ----------
  async function loadRemoteState() {
    const { data, error } = await client
      .from("workspace_state")
      .select("data, updated_at")
      .eq("id", cfg.WORKSPACE_ID)
      .single();
    if (error) {
      console.error("[Supabase] Erro ao carregar:", error);
      // fallback: cache local
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : null;
      } catch { return null; }
    }
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(data.data)); } catch {}
    return data.data;
  }

  function saveRemoteState(state) {
    // Atualiza cache local imediatamente
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(state)); } catch {}

    // Debounce 300ms - evita saves em rajada quando o usuario digita
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      lastLocalUpdate = Date.now();
      const user = await getCurrentUser();
      const { error } = await client
        .from("workspace_state")
        .update({
          data: state,
          updated_at: new Date().toISOString(),
          updated_by: user ? user.id : null
        })
        .eq("id", cfg.WORKSPACE_ID);
      if (error) {
        console.error("[Supabase] Erro ao salvar:", error);
        alert("Falha ao salvar na nuvem: " + error.message + "\n(Os dados foram salvos localmente como backup.)");
      } else {
        console.log("[Supabase] Salvo na nuvem.");
      }
    }, 300);
  }

  // ---------- REALTIME ----------
  function subscribeChanges(onChange) {
    return client
      .channel("workspace-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "workspace_state", filter: `id=eq.${cfg.WORKSPACE_ID}` },
        (payload) => {
          // Ignora se foi nosso proprio save (eco) - janela de 2s
          if (Date.now() - lastLocalUpdate < 2000) return;
          console.log("[Supabase] Mudanca remota recebida.");
          onChange(payload.new.data);
        }
      )
      .subscribe();
  }

  // Exporta API global
  window.SupabaseSync = {
    signIn,
    signOut,
    getCurrentUser,
    loadRemoteState,
    saveRemoteState,
    subscribeChanges,
    client
  };
})();

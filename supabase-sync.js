// ============================================================
// CAMADA DE SINCRONIZACAO COM SUPABASE
// ============================================================
// - Login com email/senha
// - Carrega estado de workspace_state (linha unica compartilhada)
// - Salva com debounce para evitar excesso de writes
// - Realtime: outros usuarios veem mudancas na hora
// - Fallback: mantem ultimo estado em localStorage como cache offline
// ============================================================

(function () {
  const cfg = window.SUPABASE_CONFIG || {};
  const hasConfig = Boolean(
    cfg.SUPABASE_URL &&
    cfg.SUPABASE_ANON_KEY &&
    cfg.WORKSPACE_ID &&
    window.supabase
  );

  if (!hasConfig) {
    console.warn("[Supabase] Configure supabase-config.js antes de usar.");
    return;
  }

  const CACHE_KEY = "gestao-supabase-cache-v1";
  const META_KEY = "gestao-supabase-meta-v1";
  const PENDING_KEY = "gestao-supabase-pending-v1";
  const OFFLINE_USER_KEY = "gestao-locacoes-last-online-user-v1";
  const BACKUP_KEY = "gestao-locacoes-backups-v1";

  function freeLocalStorageSpace() {
    try {
      const storedBackups = JSON.parse(window.localStorage.getItem(BACKUP_KEY) || "{}");
      const items = Array.isArray(storedBackups.items) ? storedBackups.items : [];
      if (items.length) {
        const manual = items.filter((item) => item.reason === "manual").slice(0, 1);
        const latest = items.slice(0, 1);
        const reduced = [...manual, ...latest].filter((item, index, list) => item?.id && list.findIndex((other) => other.id === item.id) === index);
        window.localStorage.setItem(BACKUP_KEY, JSON.stringify({ items: reduced }));
      }
    } catch {
      window.localStorage.removeItem(BACKUP_KEY);
    }

    [CACHE_KEY, PENDING_KEY].forEach((key) => {
      try {
        window.localStorage.removeItem(key);
      } catch {
        console.warn("[Supabase] Nao foi possivel limpar cache local:", key);
      }
    });
  }

  const authStorage = {
    getItem: (key) => window.localStorage.getItem(key),
    removeItem: (key) => window.localStorage.removeItem(key),
    setItem: (key, value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        freeLocalStorageSpace();
        try {
          window.localStorage.setItem(key, value);
        } catch {
          throw error;
        }
      }
    },
  };

  const client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: authStorage,
    },
  });
  let saveTimer = null;
  let flushingPending = false;
  let lastLocalUpdate = 0;
  let signingOut = false;
  const DEFAULT_TIMEOUT_MS = 15000;

  async function invokeUserManagement(payload) {
    const { data, error } = await withTimeout(
      client.functions.invoke("manage-users", { body: payload }),
      "Tempo esgotado ao acessar a gestão de usuários."
    );
    if (error) {
      let message = error.message || String(error);
      try {
        if (error.context instanceof Response) {
          const detail = await error.context.clone().json();
          message = detail?.error || detail?.message || message;
        }
      } catch {}
      throw new Error(message);
    }
    if (data?.error) throw new Error(data.error);
    return data;
  }

  async function attachAccessProfile(user) {
    if (!user) return null;
    try {
      const result = await invokeUserManagement({ action: "me" });
      return { ...user, appAccessProfile: result.user };
    } catch (error) {
      console.warn("[Supabase] Perfil central ainda não disponível:", error);
      return user;
    }
  }

  function withTimeout(promise, message, timeoutMs = DEFAULT_TIMEOUT_MS) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error(message)), timeoutMs)),
    ]);
  }

  function cacheCurrentUser(user) {
    if (!user?.id && !user?.email) return;
    try {
      const name = String(
        user.appAccessProfile?.name ||
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.name ||
        ""
      ).trim();
      localStorage.setItem(OFFLINE_USER_KEY, JSON.stringify({
        id: user.id || user.email,
        email: user.email || "",
        name,
        username: name || user.email || "Usuário offline",
        role: user.appAccessProfile?.role || user.app_metadata?.role || user.user_metadata?.role || "admin",
        cachedAt: new Date().toISOString(),
      }));
    } catch {
      console.warn("[Supabase] Nao foi possivel salvar usuario para modo offline.");
    }
  }

  function getCachedUser() {
    try {
      const cached = localStorage.getItem(OFFLINE_USER_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  async function signIn(email, password) {
    signingOut = false;
    freeLocalStorageSpace();
    let { data, error } = await withTimeout(
      client.auth.signInWithPassword({ email, password }),
      "Tempo esgotado ao tentar entrar. Verifique a internet e tente novamente."
    );
    if (error && /quota|storage|setItem/i.test(error.message || "")) {
      freeLocalStorageSpace();
      const retry = await withTimeout(
        client.auth.signInWithPassword({ email, password }),
        "Tempo esgotado ao tentar entrar. Verifique a internet e tente novamente."
      );
      data = retry.data;
      error = retry.error;
    }
    if (error) throw error;
    const user = await attachAccessProfile(data.user);
    cacheCurrentUser(user);
    return user;
  }

  async function signOut() {
    signingOut = true;
    clearTimeout(saveTimer);
    saveTimer = null;
    await withTimeout(client.auth.signOut(), "Tempo esgotado ao sair. Recarregue o app se a sessao continuar aberta.");
  }

  async function getCurrentUser() {
    try {
      const { data: sessionData, error: sessionError } = await withTimeout(
        client.auth.getSession(),
        "Tempo esgotado ao verificar sessao local.",
        8000
      );
      if (sessionData?.session?.user) {
        const user = await attachAccessProfile(sessionData.session.user);
        cacheCurrentUser(user);
        return user;
      }
      if (sessionError) console.warn("[Supabase] Sessao local nao encontrada:", sessionError);

      const { data, error } = await withTimeout(
        client.auth.getUser(),
        "Tempo esgotado ao validar usuario online.",
        8000
      );
      if (error) {
        console.warn("[Supabase] Usuario atual nao encontrado:", error);
        return null;
      }
      const user = await attachAccessProfile(data.user);
      if (user) cacheCurrentUser(user);
      return user || null;
    } catch (error) {
      console.warn("[Supabase] Nao foi possivel verificar o usuario atual:", error);
      if (!navigator.onLine) return getCachedUser();
      return null;
    }
  }

  async function loadRemoteState(options = {}) {
    const fallbackToCache = options.fallbackToCache !== false;
    const includeMetadata = options.includeMetadata === true;
    const { data, error } = await withTimeout(
      client
        .from("workspace_state")
        .select("data, updated_at")
        .eq("id", cfg.WORKSPACE_ID)
        .maybeSingle(),
      "Tempo esgotado ao carregar dados da nuvem."
    );

    if (error) {
      console.error("[Supabase] Erro ao carregar:", error);
      const cachedState = fallbackToCache ? loadCachedState() : null;
      return includeMetadata && cachedState ? { state: cachedState, updatedAt: loadCachedMeta()?.updatedAt || null } : cachedState;
    }

    if (!data?.data) {
      const cachedState = fallbackToCache ? loadCachedState() : null;
      return includeMetadata && cachedState ? { state: cachedState, updatedAt: loadCachedMeta()?.updatedAt || null } : cachedState;
    }

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data.data));
      localStorage.setItem(META_KEY, JSON.stringify({ updatedAt: data.updated_at || null }));
    } catch {
      console.warn("[Supabase] Nao foi possivel atualizar o cache local.");
    }
    return includeMetadata ? { state: data.data, updatedAt: data.updated_at || null } : data.data;
  }

  function loadCachedState() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  function loadCachedMeta() {
    try {
      const cached = localStorage.getItem(META_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  function cloneState(state) {
    return JSON.parse(JSON.stringify(state || {}));
  }

  function formatSupabaseError(error) {
    if (!error) return "Erro desconhecido.";
    const parts = [
      error.message,
      error.details,
      error.hint,
      error.code ? `Codigo: ${error.code}` : "",
    ].filter(Boolean);
    return parts.join(" | ") || String(error);
  }

  function isMissingRowResult(data, error) {
    return !error && !data;
  }

  function isRowLevelSecurityError(error) {
    return error?.code === "42501" || /row-level security|violates row-level security/i.test(error?.message || "");
  }

  function cacheState(state) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(state));
    } catch {
      console.warn("[Supabase] Nao foi possivel salvar o cache local.");
    }
  }

  function queuePendingState(state, reason = "offline") {
    try {
      localStorage.setItem(PENDING_KEY, JSON.stringify({
        state,
        reason,
        queuedAt: new Date().toISOString(),
      }));
    } catch {
      console.warn("[Supabase] Nao foi possivel registrar sincronizacao pendente.");
    }
  }

  function loadPendingState() {
    try {
      const pending = localStorage.getItem(PENDING_KEY);
      return pending ? JSON.parse(pending) : null;
    } catch {
      return null;
    }
  }

  function clearPendingState() {
    try {
      localStorage.removeItem(PENDING_KEY);
    } catch {
      console.warn("[Supabase] Nao foi possivel limpar sincronizacao pendente.");
    }
  }

  function countStateRecords(state) {
    return ["properties", "clients", "contracts", "expenses", "payments", "auditLogs"].reduce(
      (counts, key) => {
        counts[key] = Array.isArray(state?.[key]) ? state[key].length : 0;
        return counts;
      },
      {},
    );
  }

  function mergeCollections(localItems = [], remoteItems = [], deletedIds = new Set()) {
    const merged = new Map();
    remoteItems.forEach((item) => {
      if (item?.id && !deletedIds.has(item.id)) merged.set(item.id, item);
    });
    localItems.forEach((item) => {
      if (!item?.id) return;
      if (deletedIds.has(item.id)) {
        merged.delete(item.id);
        return;
      }
      const current = merged.get(item.id);
      const currentTime = new Date(current?.updatedAt || 0).getTime();
      const itemTime = new Date(item.updatedAt || 0).getTime();
      if (!current || itemTime >= currentTime) merged.set(item.id, item);
    });
    return [...merged.values()];
  }

  function getLocallyDeletedIds(localState, collection) {
    return new Set(
      (localState.auditLogs || [])
        .filter((log) => log.action === "record_deleted" && log.collection === collection && log.recordId)
        .map((log) => log.recordId)
    );
  }

  function mergeStateForSave(localState, remoteState) {
    if (!remoteState?.data && !remoteState?.properties) return localState;
    const remoteData = remoteState.data || remoteState;
    const merged = { ...remoteData, ...localState };
    ["properties", "clients", "contracts", "expenses", "payments"].forEach((collection) => {
      merged[collection] = mergeCollections(
        Array.isArray(localState[collection]) ? localState[collection] : [],
        Array.isArray(remoteData[collection]) ? remoteData[collection] : [],
        getLocallyDeletedIds(localState, collection)
      );
    });
    merged.auditLogs = [
      ...(Array.isArray(remoteData.auditLogs) ? remoteData.auditLogs : []),
      ...(Array.isArray(localState.auditLogs) ? localState.auditLogs : []),
    ]
      .filter((log, index, logs) => log?.id && logs.findIndex((item) => item.id === log.id) === index)
      .slice(-500);
    return merged;
  }

  async function persistRemoteState(state) {
    let snapshot = cloneState(state);
    lastLocalUpdate = Date.now();
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Sessao do Supabase expirada ou ausente. Entre novamente e tente enviar os dados.");
    }
    const { data: remoteRow, error: readError } = await withTimeout(
      client
        .from("workspace_state")
        .select("data")
        .eq("id", cfg.WORKSPACE_ID)
        .maybeSingle(),
      "Tempo esgotado ao conferir dados da nuvem."
    );

    if (!readError && remoteRow?.data) {
      snapshot = mergeStateForSave(snapshot, remoteRow.data);
    }

    const payload = {
      data: snapshot,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    };

    let { data, error } = await withTimeout(
      client
        .from("workspace_state")
        .update(payload)
        .eq("id", cfg.WORKSPACE_ID)
        .select("updated_at")
        .maybeSingle(),
      "Tempo esgotado ao salvar dados na nuvem."
    );

    if (isMissingRowResult(data, error)) {
      const insertResult = await withTimeout(
        client
          .from("workspace_state")
          .insert({ id: cfg.WORKSPACE_ID, ...payload })
          .select("updated_at")
          .maybeSingle(),
        "Tempo esgotado ao criar a linha de dados na nuvem."
      );
      data = insertResult.data;
      error = insertResult.error;
    }

    if (error) {
      console.error("[Supabase] Erro ao salvar:", error);
      throw new Error(formatSupabaseError(error));
    }

    console.log("[Supabase] Salvo na nuvem.");
    try {
      localStorage.setItem(META_KEY, JSON.stringify({ updatedAt: data?.updated_at || null }));
    } catch {
      console.warn("[Supabase] Nao foi possivel salvar metadados de sincronizacao.");
    }
    return {
      updatedAt: data?.updated_at || null,
      counts: countStateRecords(snapshot),
    };
  }

  async function flushPendingState() {
    if (signingOut || flushingPending || !navigator.onLine) return null;
    const pending = loadPendingState();
    if (!pending?.state) return null;
    flushingPending = true;
    try {
      const result = await persistRemoteState(pending.state);
      clearPendingState();
      return result;
    } finally {
      flushingPending = false;
    }
  }

  function saveRemoteState(state) {
    const snapshot = cloneState(state);
    cacheState(snapshot);

    clearTimeout(saveTimer);
    if (signingOut) return;
    saveTimer = setTimeout(async () => {
      try {
        if (signingOut) return;
        if (!navigator.onLine) {
          queuePendingState(snapshot, "offline");
          return;
        }
        await persistRemoteState(snapshot);
      } catch (error) {
        queuePendingState(snapshot, error.message || "save_failed");
        if (signingOut || /sess[aã]o.*(?:expirada|ausente|inv[aá]lida)|auth session missing|jwt expired/i.test(error.message || "")) {
          console.info("[Supabase] Salvamento pendente preservado durante o encerramento da sessão.");
          return;
        }
        if (isRowLevelSecurityError(error)) {
          console.warn("[Supabase] Salvamento mantido localmente por politica RLS:", error.message);
          return;
        }
        alert(
          "Falha ao salvar na nuvem: " +
          error.message +
          "\nOs dados foram mantidos neste dispositivo e serao reenviados automaticamente."
        );
      }
    }, 500);
  }

  async function saveRemoteStateNow(state) {
    const snapshot = cloneState(state);
    cacheState(snapshot);
    clearTimeout(saveTimer);
    if (!navigator.onLine) {
      queuePendingState(snapshot, "offline");
      return { queued: true, updatedAt: null, counts: countStateRecords(snapshot) };
    }
    try {
      const result = await persistRemoteState(snapshot);
      clearPendingState();
      return result;
    } catch (error) {
      queuePendingState(snapshot, error.message || "save_failed");
      throw error;
    }
  }

  function subscribeChanges(onChange) {
    return client
      .channel("workspace-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "workspace_state", filter: `id=eq.${cfg.WORKSPACE_ID}` },
        (payload) => {
          if (Date.now() - lastLocalUpdate < 2000) return;
          const remoteData = payload.new?.data;
          if (!remoteData) return;
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(remoteData));
            localStorage.setItem(META_KEY, JSON.stringify({ updatedAt: payload.new?.updated_at || null }));
          } catch {
            console.warn("[Supabase] Nao foi possivel atualizar o cache local.");
          }
          console.log("[Supabase] Mudanca remota recebida.");
          onChange(remoteData, payload.new?.updated_at || null);
        }
      )
      .subscribe();
  }

  window.SupabaseSync = {
    signIn,
    signOut,
    getCurrentUser,
    getCachedUser,
    loadRemoteState,
    saveRemoteState,
    saveRemoteStateNow,
    flushPendingState,
    subscribeChanges,
    client,
    listAccessUsers: () => invokeUserManagement({ action: "list" }),
    inviteAccessUser: (user) => invokeUserManagement({ action: "invite", ...user }),
    updateAccessUserRole: (userId, role) => invokeUserManagement({ action: "update", userId, role }),
    deactivateAccessUser: (userId) => invokeUserManagement({ action: "deactivate", userId }),
  };

  window.addEventListener("online", () => {
    flushPendingState().catch((error) => console.warn("[Supabase] Reenvio pendente falhou:", error));
  });
})();

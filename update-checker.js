// update-checker.js
// Registra o service worker, procura novas versoes e permite controlar
// atualizacao automatica pela tela "Acesso e nuvem".
(function () {
  const autoUpdateKey = "gestao-auto-update-v1";
  const checkIntervalMs = 60000;

  let currentVersion = null;
  let waitingWorker = null;
  let registrationPromise = null;
  let deferredInstallPrompt = null;

  function isAutoUpdateEnabled() {
    return localStorage.getItem(autoUpdateKey) !== "off";
  }

  function setAutoUpdateEnabled(enabled) {
    localStorage.setItem(autoUpdateKey, enabled ? "on" : "off");
    updateStatusText(enabled ? "Atualizacao automatica ligada." : "Atualizacao automatica desligada.");
  }

  function updateStatusText(text) {
    const status = document.getElementById("app-update-status");
    if (status) status.textContent = text;
  }

  function showBanner() {
    if (document.getElementById("update-banner")) return;
    const bar = document.createElement("div");
    bar.id = "update-banner";
    bar.className = "app-update-banner";
    bar.innerHTML =
      '<span>Nova versao disponivel.</span>' +
      '<button id="update-btn" class="update-banner-primary" type="button">Atualizar agora</button>' +
      '<button id="update-later" class="update-banner-secondary" type="button">Depois</button>';
    document.body.appendChild(bar);

    document.getElementById("update-btn").onclick = applyUpdate;
    document.getElementById("update-later").onclick = () => bar.remove();
  }

  function applyUpdate() {
    if (waitingWorker) waitingWorker.postMessage({ type: "SKIP_WAITING" });
    setTimeout(() => location.reload(), 200);
  }

  async function fetchVersion() {
    try {
      const response = await fetch("./version.json?_=" + Date.now(), { cache: "no-store" });
      if (!response.ok) return null;
      const data = await response.json();
      return data.version || null;
    } catch {
      return null;
    }
  }

  async function checkNow(options = {}) {
    if (!registrationPromise) {
      updateStatusText("Atualizacao automatica indisponivel neste navegador.");
      return false;
    }

    const registration = await registrationPromise;
    await registration.update();

    const latestVersion = await fetchVersion();
    if (!currentVersion) currentVersion = latestVersion;

    if (latestVersion && currentVersion && latestVersion !== currentVersion) {
      updateStatusText("Nova versao encontrada.");
      if (isAutoUpdateEnabled() || options.apply) {
        applyUpdate();
      } else {
        showBanner();
      }
      return true;
    }

    updateStatusText("App atualizado.");
    return false;
  }

  function bindControls() {
    const toggle = document.getElementById("auto-update-enabled");
    const button = document.getElementById("check-app-update");
    const installButton = document.getElementById("install-app-button");

    if (toggle) {
      toggle.checked = isAutoUpdateEnabled();
      toggle.addEventListener("change", () => setAutoUpdateEnabled(toggle.checked));
    }

    if (button) {
      button.addEventListener("click", async () => {
        updateStatusText("Verificando atualizacao...");
        await checkNow({ apply: false });
      });
    }

    if (installButton) {
      const updateInstallButton = () => {
        const installed = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
        installButton.classList.toggle("hidden", installed || !deferredInstallPrompt);
      };
      installButton.addEventListener("click", async () => {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice.catch(() => null);
        if (choice?.outcome === "accepted") updateStatusText("App instalado neste dispositivo.");
        deferredInstallPrompt = null;
        updateInstallButton();
      });
      updateInstallButton();
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredInstallPrompt = event;
        updateInstallButton();
        updateStatusText("Instalacao disponivel para este dispositivo.");
      });
      window.addEventListener("appinstalled", () => {
        deferredInstallPrompt = null;
        updateInstallButton();
        updateStatusText("App instalado neste dispositivo.");
      });
    }
  }

  if ("serviceWorker" in navigator) {
    registrationPromise = navigator.serviceWorker.register("./sw.js").then((registration) => {
      if (registration.waiting) {
        waitingWorker = registration.waiting;
        if (isAutoUpdateEnabled()) applyUpdate();
        else showBanner();
      }

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            waitingWorker = newWorker;
            if (isAutoUpdateEnabled()) applyUpdate();
            else showBanner();
          }
        });
      });

      return registration;
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      location.reload();
    });

    window.addEventListener("online", () => checkNow());
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") checkNow();
    });
    setInterval(checkNow, checkIntervalMs);
  }

  document.addEventListener("DOMContentLoaded", bindControls);

  window.AppUpdater = {
    checkNow,
    isAutoUpdateEnabled,
    setAutoUpdateEnabled,
  };
})();

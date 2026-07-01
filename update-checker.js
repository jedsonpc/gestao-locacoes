// update-checker.js
// Registra o service worker, procura novas versoes e controla instalacao/atualizacao.
(function () {
  const autoUpdateKey = "gestao-auto-update-v1";
  const checkIntervalMs = 60000;

  let currentVersion = null;
  let waitingWorker = null;
  let registrationPromise = null;
  let installButtons = [];

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

  function getQrCodePageUrl() {
    return new URL("./instalar-celular.html", window.location.href).toString();
  }

  function getInstallButtonText() {
    return "Gerar QR Code para acesso ao sistema";
  }

  function getInstallHelpText() {
    return "Abrir QR Code para compartilhar o acesso ao sistema.";
  }

  function collectInstallButtons() {
    installButtons = Array.from(document.querySelectorAll(".app-install-action"));
  }

  function updateInstallButtons({ announce = false } = {}) {
    collectInstallButtons();
    const helpText = getInstallHelpText();

    installButtons.forEach((button) => {
      button.classList.remove("hidden");
      button.disabled = false;
      button.textContent = getInstallButtonText();
      button.title = helpText;
      button.setAttribute("aria-label", helpText);
    });

    if (announce) updateStatusText(helpText);
  }

  function handleInstallClick() {
    updateStatusText("Abrindo QR Code para compartilhar o acesso.");
    const qrCodeUrl = getQrCodePageUrl();
    const openedWindow = window.open(qrCodeUrl, "_blank", "noopener");
    if (!openedWindow) window.location.href = qrCodeUrl;
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    updateInstallButtons({ announce: true });
  });

  window.addEventListener("appinstalled", () => {
    updateInstallButtons();
    updateStatusText("App instalado neste dispositivo.");
  });

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

    collectInstallButtons();
    installButtons.forEach((installButton) => {
      installButton.addEventListener("click", handleInstallClick);
    });
    updateInstallButtons({ announce: true });
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




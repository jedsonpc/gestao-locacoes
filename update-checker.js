// update-checker.js
// Registra o service worker, procura novas versoes e controla instalacao/atualizacao.
(function () {
  const autoUpdateKey = "gestao-auto-update-v1";
  const checkIntervalMs = 60000;

  let currentVersion = null;
  let waitingWorker = null;
  let registrationPromise = null;
  let deferredInstallPrompt = null;
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

  function isStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  }

  function isIos() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
  }

  function isAndroid() {
    return /android/i.test(window.navigator.userAgent);
  }

  function isChromeLike() {
    const ua = window.navigator.userAgent;
    return /Chrome|CriOS|EdgA/i.test(ua) && !/FBAN|FBAV|Instagram|Line|WhatsApp/i.test(ua);
  }

  function getCurrentHttpsUrl() {
    const url = new URL(window.location.href);
    url.hash = "";
    return url.toString();
  }

  function getAndroidChromeIntentUrl() {
    const currentUrl = new URL(getCurrentHttpsUrl());
    const fallback = encodeURIComponent(currentUrl.toString());
    return `intent://${currentUrl.host}${currentUrl.pathname}${currentUrl.search}#Intent;scheme=${currentUrl.protocol.replace(":", "")};package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
  }

  function openAndroidChromeShortcut() {
    const message = "Abrindo no Chrome. Quando a pagina carregar, toque novamente em Instalar app.";
    updateStatusText(message);
    const intentUrl = getAndroidChromeIntentUrl();
    const openedWindow = window.open(intentUrl, "_blank");
    if (!openedWindow) window.location.href = intentUrl;
  }

  function getInstallHelpText() {
    if (isStandalone()) return "App ja instalado neste dispositivo.";
    if (deferredInstallPrompt) return "Toque em Instalar app para adicionar este app ao celular.";
    if (isAndroid() && !isChromeLike()) return "Toque para abrir no Chrome e concluir a instalacao.";
    if (isAndroid()) return "No Chrome, toque no menu de tres pontos e escolha Instalar app ou Adicionar a tela inicial.";
    if (isIos()) return "No iPhone: toque em Compartilhar e escolha Adicionar a Tela de Inicio.";
    return "Para instalar, use o menu do navegador e escolha Instalar app ou Adicionar a tela inicial.";
  }

  function getInstallButtonText() {
    if (deferredInstallPrompt) return "Instalar app neste dispositivo";
    if (isAndroid() && !isChromeLike()) return "Abrir no Chrome para instalar";
    if (isAndroid()) return "Instalar pelo menu do Chrome";
    return "Como instalar o app";
  }

  function collectInstallButtons() {
    installButtons = Array.from(document.querySelectorAll(".app-install-action"));
  }

  function updateInstallButtons({ announce = false } = {}) {
    collectInstallButtons();
    const installed = isStandalone();
    const helpText = getInstallHelpText();

    installButtons.forEach((button) => {
      button.classList.toggle("hidden", installed);
      button.disabled = false;
      button.textContent = getInstallButtonText();
      button.title = helpText;
      button.setAttribute("aria-label", helpText);
    });

    if (announce && !installed) updateStatusText(helpText);
  }

  async function handleInstallClick() {
    if (isStandalone()) {
      updateStatusText("App ja instalado neste dispositivo.");
      return;
    }

    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice.catch(() => null);
      if (choice?.outcome === "accepted") updateStatusText("App instalado neste dispositivo.");
      else updateStatusText("Instalacao cancelada. Voce pode tentar novamente pelo botao Instalar.");
      deferredInstallPrompt = null;
      updateInstallButtons();
      return;
    }

    if (isAndroid() && !isChromeLike()) {
      openAndroidChromeShortcut();
      return;
    }

    const helpText = getInstallHelpText();
    updateStatusText(helpText);
    alert(helpText);
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallButtons({ announce: true });
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
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

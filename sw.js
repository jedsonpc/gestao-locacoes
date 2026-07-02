// Rio dos Passos PWA - service worker
// A linha __APP_VERSION__ eh reescrita automaticamente pelo GitHub Actions
// no momento do deploy (vira o SHA do commit). Cada deploy = novo cache.
const appVersion = "local-1.9.16";
const cachePrefix = "gestao-locacoes-";
const cacheName = `gestao-locacoes-${appVersion}-mobile-refresh`;
const staticFiles = [
  "./",
  "./index.html",
  "./login.html",
  "./instalar-celular.html",
  "./styles.css",
  "./app.js",
  "./supabase-config.js",
  "./supabase-sync.js",
  "./update-checker.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./logo-imobiliaria-rio.svg",
];
const offlineHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Rio dos Passos offline</title>
  <style>
    body{margin:0;font-family:Arial,sans-serif;background:#f5f7f8;color:#1f2933;display:grid;min-height:100vh;place-items:center;padding:24px}
    main{max-width:520px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;box-shadow:0 12px 32px rgba(0,0,0,.08);padding:28px}
    h1{color:#5c171b;font-size:24px;margin:0 0 10px}
    p{line-height:1.5;margin:0 0 14px}
    button{background:#5c171b;border:0;border-radius:6px;color:#fff;cursor:pointer;font-weight:700;padding:10px 14px}
  </style>
</head>
<body>
  <main>
    <h1>Voce esta offline</h1>
    <p>Os dados ja abertos continuam disponiveis neste dispositivo. Assim que a internet voltar, o app sincroniza as alteracoes pendentes com o Supabase.</p>
    <button type="button" onclick="location.reload()">Tentar novamente</button>
  </main>
</body>
</html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) =>
      Promise.allSettled(staticFiles.map((f) => cache.add(f).catch(() => null))),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(cachePrefix) && k !== cacheName).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
  if (event.data?.type === "CHECK_UPDATES") {
    event.waitUntil(self.registration.update());
  }
});

function isHtmlOrScript(request, url) {
  if (request.mode === "navigate") return true;
  if (request.destination === "document" || request.destination === "script") return true;
  if (url.pathname.endsWith(".html") || url.pathname.endsWith(".js")) return true;
  return false;
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // version.json: sempre rede, nunca cache (eh o checador de nova versao)
  if (url.pathname.endsWith("/version.json")) {
    event.respondWith(fetch(event.request, { cache: "no-store" }).catch(() => new Response("{}", { headers: { "Content-Type": "application/json" } })));
    return;
  }

  if (isHtmlOrScript(event.request, url)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) =>
        fetch(event.request, { cache: "no-store" })
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(cacheName).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cachedResponse || caches.match("./index.html") || new Response(offlineHtml, { headers: { "Content-Type": "text/html; charset=utf-8" } })),
      ),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkResponse = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(cacheName).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cachedResponse);
      return cachedResponse || networkResponse;
    }),
  );
});





















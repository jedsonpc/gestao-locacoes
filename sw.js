// Rio dos Passos PWA - service worker v1.6.0
// Estratégia: network-first para HTML/JS (atualizações aplicam na hora),
// cache-first para assets estáticos (ícones, manifest, CSS).
const appVersion = "1.6.0";
const cacheName = `gestao-locacoes-${appVersion}`;
const staticFiles = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js?v=1.6.0",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./logo-imobiliaria-rio.svg",
];

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
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
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

  // Network-first para HTML e JS: garante que correções de código apliquem
  // na próxima visita, sem ficar preso em versão antiga em cache.
  if (isHtmlOrScript(event.request, url)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(cacheName).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
    );
    return;
  }

  // Cache-first para assets estáticos (CSS, ícones, fontes, etc.)
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

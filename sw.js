const CACHE = "DEXRabbit-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles/global.css",
  "/styles/tokens.css",
  "/scripts/analytics.js"
];

self.addEventListener("install", (e) => {
  console.log("🔧 SW: Installing...");
  e.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log("📦 SW: Caching assets");
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("⚡ SW: Activating...");
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => {
          console.log("🗑️ SW: Deleting old cache:", k);
          return caches.delete(k);
        })
      )
    )
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  
  // Не кэшируем внешние ресурсы (GeckoTerminal, социальные сети)
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Не кэшируем API запросы
  if (request.url.includes("/api/")) {
    return;
  }

  e.respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response;
      }
      
      return fetch(request).catch(() => {
        // Fallback для навигационных запросов
        if (request.mode === 'navigate') {
          return caches.match("/index.html");
        }
      });
    })
  );
});

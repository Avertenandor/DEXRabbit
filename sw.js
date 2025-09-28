// Service Worker с обновленной версией кэша
// ВАЖНО: Меняйте CACHE_VERSION при каждом обновлении!
const CACHE_VERSION = 'v2025-09-29-OG-FIX';
const STATIC_CACHE = `dexrabbit-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `dexrabbit-dynamic-${CACHE_VERSION}`;

// Актуальные файлы для кэширования
const ASSETS = [
  "/",
  "/index.html",
  "/assets/css/main.css",
  "/assets/css/variables.css",
  "/favicon.ico",
  "/favicon.svg",
  "/manifest.webmanifest"
];

// Установка Service Worker
self.addEventListener("install", (event) => {
  console.log(`🔧 SW ${CACHE_VERSION}: Installing...`);
  
  // Сразу активируем новую версию
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log(`📦 SW ${CACHE_VERSION}: Caching static assets`);
      return cache.addAll(ASSETS).catch(err => {
        console.error('Cache addAll failed:', err);
        // Продолжаем установку даже если некоторые файлы не загрузились
        return Promise.resolve();
      });
    })
  );
});

// Активация Service Worker
self.addEventListener("activate", (event) => {
  console.log(`⚡ SW ${CACHE_VERSION}: Activating...`);
  
  event.waitUntil(
    (async () => {
      // Удаляем все старые кэши
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => !name.includes(CACHE_VERSION))
          .map(name => {
            console.log(`🗑️ SW ${CACHE_VERSION}: Deleting old cache:`, name);
            return caches.delete(name);
          })
      );
      
      // Берем контроль над всеми клиентами сразу
      await self.clients.claim();
      console.log(`✅ SW ${CACHE_VERSION}: Activated and controlling all clients`);
    })()
  );
});

// Обработка запросов
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Не кэшируем OG-ресурсы
  if (url.pathname.startsWith('/og/')) {
    return; // прямо в сеть, без кэша
  }
  
  // Пропускаем внешние запросы
  if (!url.origin.includes(self.location.origin)) {
    return;
  }
  
  // Пропускаем запросы к GeckoTerminal iframe
  if (url.href.includes('geckoterminal.com')) {
    return;
  }
  
  // Пропускаем запросы с параметром nocache
  if (url.searchParams.has('nocache')) {
    event.respondWith(fetch(request));
    return;
  }
  
  // Network First для HTML (всегда пытаемся получить свежую версию)
  if (request.mode === 'navigate' || request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Клонируем ответ для кэша
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Если офлайн - берем из кэша
          return caches.match(request).then(response => {
            return response || caches.match('/index.html');
          });
        })
    );
    return;
  }
  
  // Cache First для статических ресурсов (CSS, JS, изображения)
  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        // Обновляем кэш в фоне
        fetch(request).then(freshResponse => {
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, freshResponse);
          });
        }).catch(() => {});
        
        return response;
      }
      
      // Если нет в кэше - загружаем
      return fetch(request).then(response => {
        // Кэшируем только успешные ответы
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      });
    })
  );
});

// Слушаем сообщения от клиента для принудительного обновления
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log(`🔄 SW ${CACHE_VERSION}: Skip waiting requested`);
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLIENTS_CLAIM') {
    console.log(`🔄 SW ${CACHE_VERSION}: Claiming clients`);
    self.clients.claim();
  }
});

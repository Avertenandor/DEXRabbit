/**
 * DEXRabbit - Оптимизированный Service Worker
 * Версия: 20251001-iframe
 * Кэширование и оптимизация производительности
 */

const CACHE_NAME = 'dexrabbit-v20251001-iframe';
const RUNTIME_CACHE = 'dexrabbit-runtime-v20251001-iframe';

// Критические ресурсы для первой загрузки
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/css/variables.css',
  '/assets/css/performance.css',
  '/assets/js/nav.js',
  '/assets/js/responsive-utils-optimized.js',
  '/favicon.svg',
  '/manifest.webmanifest',
];

// Ресурсы для предварительного кэширования
const PRECACHE_ASSETS = [
  '/assets/css/avatars.css',
  '/assets/css/responsive-extreme.css',
  '/assets/css/animations.css',
  '/assets/css/print.css',
  ...CRITICAL_ASSETS,
];

// Паттерны для кэширования
const CACHE_PATTERNS = {
  images: /\.(png|jpg|jpeg|svg|webp|gif|ico)$/i,
  fonts: /\.(woff|woff2|ttf|otf|eot)$/i,
  styles: /\.css$/i,
  scripts: /\.js$/i,
  documents: /\.(html|htm)$/i,
  data: /\.(json|xml)$/i,
};

// Стратегии кэширования
const CACHE_STRATEGIES = {
  // Network First - для HTML
  networkFirst: async request => {
    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
      throw error;
    }
  },

  // Cache First - для статических ресурсов
  cacheFirst: async request => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    try {
      const networkResponse = await fetch(request);
      if (networkResponse.ok) {
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      throw error;
    }
  },

  // Stale While Revalidate - для CSS и JS
  staleWhileRevalidate: async request => {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request)
      .then(async networkResponse => {
        if (networkResponse.ok) {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      })
      .catch(() => cachedResponse);

    return cachedResponse || fetchPromise;
  },

  // Network Only - для API запросов
  networkOnly: async request => {
    return fetch(request);
  },
};

// Установка Service Worker
self.addEventListener('install', event => {
  console.log('[SW] Installing Service Worker v20251001-iframe');

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precaching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        // Предкэширование остальных ресурсов асинхронно
        caches
          .open(CACHE_NAME)
          .then(cache => cache.addAll(PRECACHE_ASSETS))
          .catch(err => console.warn('[SW] Some assets failed to precache:', err));

        // Активируем сразу
        return self.skipWaiting();
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', event => {
  console.log('[SW] Activating Service Worker v20251001-iframe');

  event.waitUntil(
    Promise.all([
      // Удаляем старые кэши
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return (
                cacheName.startsWith('dexrabbit-') &&
                cacheName !== CACHE_NAME &&
                cacheName !== RUNTIME_CACHE
              );
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Берем контроль над всеми клиентами
      self.clients.claim(),
    ])
  );
});

// Обработка запросов
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Игнорируем не-GET запросы
  if (request.method !== 'GET') {
    return;
  }

  // Игнорируем внешние запросы
  if (
    !url.origin.includes('xn--80apagbbfxgmuj4j.site') &&
    !url.origin.includes('localhost') &&
    !url.origin.includes('127.0.0.1')
  ) {
    return;
  }

  // Игнорируем запросы к Telegram и внешним API
  if (
    url.hostname.includes('telegram') ||
    url.hostname.includes('geckoterminal') ||
    url.hostname.includes('api')
  ) {
    return;
  }

  // Определяем стратегию кэширования
  let strategy;

  if (request.mode === 'navigate' || CACHE_PATTERNS.documents.test(url.pathname)) {
    // HTML - Network First
    strategy = CACHE_STRATEGIES.networkFirst;
  } else if (CACHE_PATTERNS.images.test(url.pathname) || CACHE_PATTERNS.fonts.test(url.pathname)) {
    // Изображения и шрифты - Cache First
    strategy = CACHE_STRATEGIES.cacheFirst;
  } else if (
    CACHE_PATTERNS.styles.test(url.pathname) ||
    CACHE_PATTERNS.scripts.test(url.pathname)
  ) {
    // CSS и JS - Stale While Revalidate
    strategy = CACHE_STRATEGIES.staleWhileRevalidate;
  } else {
    // Остальное - Network First
    strategy = CACHE_STRATEGIES.networkFirst;
  }

  event.respondWith(
    strategy(request).catch(() => {
      // Fallback для офлайн режима
      if (request.mode === 'navigate') {
        return caches.match('/index.html');
      }
      return new Response('Офлайн. Ресурс недоступен.', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'text/plain; charset=utf-8',
        }),
      });
    })
  );
});

// Обработка сообщений от клиента
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches
        .keys()
        .then(cacheNames => {
          return Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
        })
        .then(() => {
          event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
        })
    );
  }
});

// Периодическая синхронизация (если поддерживается)
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

// Функция обновления кэша
async function updateCache() {
  const cache = await caches.open(CACHE_NAME);

  try {
    // Обновляем критические ресурсы
    const responses = await Promise.allSettled(
      CRITICAL_ASSETS.map(url =>
        fetch(url, { cache: 'reload' }).then(response => {
          if (response.ok) {
            return cache.put(url, response);
          }
        })
      )
    );

    console.log('[SW] Cache updated successfully');
  } catch (error) {
    console.error('[SW] Cache update failed:', error);
  }
}

// Оптимизация: предварительная загрузка следующих страниц
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PREFETCH') {
    const urlsToPrefetch = event.data.urls;

    event.waitUntil(
      caches.open(RUNTIME_CACHE).then(cache => {
        return Promise.all(
          urlsToPrefetch.map(url =>
            fetch(url)
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch(() => {})
          )
        );
      })
    );
  }
});

console.log('[SW] Service Worker v20251001-iframe loaded successfully');

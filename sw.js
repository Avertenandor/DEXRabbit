// Service Worker для КупитьКролика
// Только кеш статических ассетов
const CACHE_NAME = 'kupit-krolika-v2';
const STATIC_ASSETS = [
    '/',
    '/styles/tokens.css',
    '/styles/global.css',
    '/scripts/main.js',
    '/scripts/consultant.js',
    '/scripts/advanced-features.js',
    '/scripts/social-integration.js',
    '/scripts/final-optimizations.js',
    '/scripts/final-tasks.js',
    '/images/favicon.svg',
    '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch((error) => {
                console.error('[SW] Failed to cache assets:', error);
            })
    );
    
    // Activate immediately
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Service worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Only handle same-origin requests
    if (url.origin !== location.origin) {
        return;
    }
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Check if it's a static asset
    const isStaticAsset = STATIC_ASSETS.some(asset => 
        url.pathname === asset || url.pathname.startsWith('/styles/') || 
        url.pathname.startsWith('/scripts/') || url.pathname.startsWith('/images/')
    );
    
    if (isStaticAsset) {
        // Cache-first strategy for static assets
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    return fetch(request)
                        .then((networkResponse) => {
                            // Don't cache non-successful responses
                            if (!networkResponse || networkResponse.status !== 200) {
                                return networkResponse;
                            }
                            
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(request, responseClone);
                                })
                                .catch((error) => {
                                    console.warn('[SW] Failed to cache:', request.url, error);
                                });
                            
                            return networkResponse;
                        })
                        .catch((error) => {
                            console.warn('[SW] Network request failed:', request.url, error);
                            throw error;
                        });
                })
        );
    } else {
        // Network-first strategy for pages and API calls
        event.respondWith(
            fetch(request)
                .catch(() => {
                    // If network fails, try cache
                    return caches.match(request);
                })
        );
    }
});
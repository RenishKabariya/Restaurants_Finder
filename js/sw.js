const currentCache = 'restaurant-cache-v0';
const itemsToCache = [
  '/',
  'index.html',
  'restaurant.html',
  'css/styles.css',
  'js/restaurant_info.js',
  'js/main.js',
  'js/dbhelper.js',
];

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheName => {
      return Promise.all(
        cacheName.filter(cacheName => {
          return cacheName.startsWith('restaurant-cache-') && cacheName != currentCache;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache).then(cache => {
      return cache.addAll(itemsToCache);
    })
  )
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(currentCache).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
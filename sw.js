const CACHE_NAME = 'timetable-maker-v1';
const assets = [
  './',
  './index.html',
  './about.html',
  './privacy.html',
  './terms.html',
  './logo.png' // Ensure your logo filename matches
];

// Install Service Worker and Cache Files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Timetable App: Caching Offline Assets');
      return cache.addAll(assets);
    })
  );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Offline Content
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

importScripts('js/cache-polyfill.js');

const filesToCache = [
  '/breathing-with-kitty/',
  '/breathing-with-kitty/index.html'
];

const filesToCacheLocal = [
  '/',
  '/index.html'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
    .catch(function(error) {
      caches.open(staticCacheName)
      .then(function(cache) {
        return cache.addAll(filesToCacheLocal)
      })
      .catch(function(error) {
        console.log('Installation failed, ', error);
      })
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request);
    })
  );
});
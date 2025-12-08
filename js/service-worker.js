const CACHE_NAME = 'infinity-gym-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/js/Member.js',
  '/js/Membership.js',
  '/js/GymManager.js',
  '/js/browser-example.js',
  '/js/service-worker.js',
  'https://fonts.googleapis.com/css2?family=Shrikhand&family=Fira+Sans+Extra+Condensed&family=Open+Sans&family=Noto+Sans:wght@400;500&family=Inter:wght@400&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
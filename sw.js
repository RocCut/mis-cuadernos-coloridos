
const CACHE_NAME = 'cuadernos-v2'; // <- CAMBIARLO a v3, v4... en cada deploy
const urlsToCache = [
'./',
'./index.html',
'./manifest.json',
'./icon-192.png',
'./icon-512.png'
];

// Instalar y guardar en cache
self.addEventListener('install', event => {
  self.skipWaiting(); // <- NUEVO: fuerza a instalarse ya
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(urlsToCache))
  );
});

// Servir desde cache cuando no hay internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  );
});

// Limpiar cache viejo
self.addEventListener('activate', event => {
  self.clients.claim(); // <- NUEVO: toma control de la app al toque
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    })
  );
});

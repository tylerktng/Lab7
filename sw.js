// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

const CACHE_NAME = 'cache-lab7';
const urls = [

];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log('Cache open');
                cache.addAll(urls);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches
        .match(event.request)
        .then(response => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request).then(
                response => {
                    if(!response) return response;
                    let cacheResponse = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then(cache => cache.put(event.request, cacheResponse));
                    return response;
              }
          );
        })
    );
});

self.addEventListener('activate', event => event.waitUntil(clients.claim()))
console.log("Service worker registered.");

var cacheName = "kirjat.ml-offline";
var blacklist = [
	"manifest.json"
]

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      const response = await fetch(event.request);
      const cache = await caches.open(cacheName);
	  cache.put(event.request, response.clone());
      return response;
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});

/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
*/




var CACHE_NAME = 'udacity-restaurant-reviews-v1';
var FILES_TO_CACHE = [
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/10.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/index.html',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/restaurant.html',
    '/sw.js'
];

async function cacheAllResources() {
    let c = await caches.open(CACHE_NAME);
    return c.addAll(FILES_TO_CACHE);
}

// Cache all files on install
self.addEventListener('install', e => {
    e.waitUntil(cacheAllResources());
});

self.addEventListener('fetch', event => event.respondWith(fetchHandler(event)));
    
async function fetchHandler(event) {
  const cacheUrl = event.request.url.split('?')[0];
  const cache = await caches.open(CACHE_NAME);
  const cacheResp = await cache.match(cacheUrl);
  return cacheResp || fetch(event.request);
}

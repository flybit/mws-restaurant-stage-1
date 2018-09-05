var CACHE_NAME = 'udacity-restaurant-reviews-v1';

// Always try to fetch from network and put the response to cache on success.
// If this fails, return previously cached data, if any. Otherwise, respond with error.
self.addEventListener('fetch', event => event.respondWith(fetchHandler(event)));
    
async function fetchHandler(event) {
  // Try fetching from the server
  console.log('Trying to fetch ' + event.request.url);
  const fetchResp = await fetch(event.request).catch(r => r);
  const cache = await caches.open(CACHE_NAME);
  if (!fetchResp || (fetchResp.status !== 200 && fetchResp.type !== 'opaque')) {
    console.log('Fetch failed, trying cache');
    // Failure, try the cache
    const cacheReq = event.request.clone();
    const cacheResp = await cache.match(cacheReq);
    // Return cacheResp, or failed response
    return cacheResp || fetchResp;
  }
  // Success
  console.log('Success, caching and returning reponse');
  const respToCache = fetchResp.clone();
  cache.put(event.request, respToCache);
  return fetchResp;
}

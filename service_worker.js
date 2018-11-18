"use strict"

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  new RegExp('/'),
   workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'root-cache',
  })
);

workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.html/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'html-cache',
  })
);


workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  new RegExp('.*\.json'),
  workbox.strategies.networkFirst()
);


/*
*Workbox provides a few caching strategies that you can use.
*For example, your CSS could be served from the cache first and updated in the background or your images could be cached and used until it’s a week old, after which it’ll need updating.
*/
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);


workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
/*
function cleanUp(){
	var currentCacheNames = 'Cache_v2';

	// clean up old SW caches
	self.addEventListener("activate", function(event) {
	  event.waitUntil(
	    caches.keys().then(function(cacheNames) {
	      let validCacheSet = new Set(Object.values(currentCacheNames));
	      return Promise.all(
	        cacheNames
	          .filter(function(cacheName) {
	            return !validCacheSet.has(cacheName);
	          })
	          .map(function(cacheName) {
	            console.log("deleting cache", cacheName);
	            return caches.delete(cacheName);
	          })
	      );
	    })
	  ).then(function() {
      // `skipWaiting()` forces the waiting ServiceWorker to become the
      // active ServiceWorker, triggering the `onactivate` event.
      // Together with `Clients.claim()` this allows a worker to take effect
      // immediately in the client(s).
      return self.skipWaiting();
    })
	});
}


/*

const cacheName = 'iKanban_v1.0.0';

console.log(cacheName);

const staticAssets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css?family=Roboto',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff',
  'css/style.css',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
  'js/typeit.js',
  './img/512x512.png',
  './img/android-icon-144x144.png',
  './img/android-icon-192x192.png',
	'./img/android-icon-36x36.png',
	'./img/android-icon-48x48.png',
	'./img/android-icon-72x72.png',
	'./img/android-icon-96x96.png',
	'./img/apple-icon-114x114.png',
	'./img/apple-icon-120x120.png',
	'./img/apple-icon-144x144.png',
	'./img/apple-icon-152x152.png',
	'./img/apple-icon-180x180.png',
	'./img/apple-icon-57x57.png',
	'./img/apple-icon-60x60.png',
	'./img/apple-icon-72x72.png',
	'./img/apple-icon-76x76.png',
	'./img/apple-icon-precomposed.png',
	'./img/apple-icon.png',
	'./img/bg1.png',
	'./img/demo.gif',
	'./img/favicon-16x16.png',
	'./img/favicon-32x32.png',
	'./img/favicon-96x96.png',
	'./img/favicon.ico',
	'./img/kanban.png',
	'./img/ms-icon-144x144.png',
	'./img/ms-icon-150x150.png',
	'./img/ms-icon-310x310.png',
	'./img/ms-icon-70x70.png',
	'./img/laptop_bg.jpg',

];


self.addEventListener('install', async (event)=>{
  console.log('install event');
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

/*
self.addEventListener('fetch', (event,err)=> {
	//intercept fetch events and servE thE cached content
	console.log('fetch event');
	const req = event.request;
	console.warn(err);

	//determine whether the request is for a JSON file
	if (/.*(json)$/.test(req.url) || /.*(js)$/.test(req.url)) {

		//we want our cache to work in that any JSON calls should first go to the network and attempt to get the most up to date information
		//Then store that in the cache before returning. That way, if the network is down, we always have the most recent version available. We'll call this strategy networkFirst.
		event.respondWith(networkFirst(req));
	} else {
		event.respondWith(cacheFirst(req));
	}
});

//
async function networkFirst(req) {
	//We then try to fetch the request from the network.
	//If that succeeds, we put a clone of the response in our cache (requests can only be read once) and return the response.
	//If the network call fails, we return the latest cached version.
	const cache = await caches.open(cacheName);
		try {
			const fresh = await fetch(req);
		    cache.POST(req, fresh.clone());
		    return fresh;
	    } catch (e) {
	    	const cachedResponse = await cache.match(req);
	    	return cachedResponse;
	    }
}


async function cacheFirst(req) {
	console.log(req);
	console.log('req ^')
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);

  //return either the cached response if there is one, or delegate the request to the network
  return cachedResponse || networkFirst(req);
}

*/



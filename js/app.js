"use strict"

const app = {
  name: 'iKanban App',
  url:'//iKanbanonline.com'
};



//This is the service worker with the Cache-first network

//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if (navigator.serviceWorker.controller) {
  console.log('[PWA Builder] active service worker found, no need to register')
} else {

//Register the ServiceWorker
  navigator.serviceWorker.register('../pwa-sw.js', {
    scope: './'
  }).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
  });
}
/*
START : service worker


// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  console.log('serviceWorker is supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service_worker.js');
  });

}else{
  alert('ServiceWorker not supported');
  Materialize.toast({
      html: `Offline mode not supported `
  });
   Materialize.toast(`Offline mode not supported `, 4000)
}


var deferredPrompt;

window.addEventListener('beforeinstallprompt', function (e) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  showAddToHomeScreen();

});

function showAddToHomeScreen() {
 
  Materialize.toast(`Install ${app.name}`, 4000)

}
*/

const deleteOldCache = (newCache) => {
  // Assuming `CACHE_NAME` is the newest name
  // Time to clean up the old!
  var CACHE_NAME = newCache || 'version-8';

  //caches.keys() returns an array of all existing caches

  caches.keys().then(function (cacheNames) {
    return Promise.all(
      cacheNames.map(function (cacheName) {
        if (cacheName != CACHE_NAME) {
          return caches.delete(cacheName);
        }
      })
    );
  })
  .then(()=>{
     window.location.reload();
  })
}


const deleteCookie = () => {

  document.cookie.split(";").forEach(function (c) {

    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");

  });
};

const swipe = () => {
    navigator.serviceWorker.getRegistrations().then(

      function (registrations) {

        for (let registration of registrations) {

          registration.unregister()
            .then(function () {

              return self.clients.matchAll();

            })
            .then(function (clients) {

              clients.forEach(client => {

                if (client.url && "navigate" in client) {

                  client.navigate(client.url);

                }


              });

            })

        };
      }
      )}
    /*
    END : service worker
    */
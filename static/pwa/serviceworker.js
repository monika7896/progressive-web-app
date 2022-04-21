


import { openDB, deleteDB, wrap, unwrap } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';

var staticCacheName = "django-pwa-v" + new Date().getTime();
var filesToCache = [
        '/',
        '/base_layout',
];

// Cache on install
self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
                            }
                    )
                    )
    });

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("django-pwa-")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// Serve from Cache
self.addEventListener("fetch", event => {
    var requestUrl = new URL(event.request.url);
    if (requestUrl.origin === location.origin) {
        if ((requestUrl.pathname === '/')) {
            event.respondWith(caches.match('/base_layout'));
            return;
          }

        }
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/');
            })
    )
});


self.addEventListener('sync', event => {
    if (event.tag == 'sync-todos') {
      event.waitUntil(syncTodos());
    }
  });
  

  async function syncTodos() {
    alert('Hello world');

    const db = await openDB('feeds-db-vr1', 1);
    const todo = await db.getAll('feeds');
    const todoIdsToRemove = [];
    await Promise.all(todo.map(async ({ method, ...feeds }) => {
      try {
        const response = await fetch('http://127.0.0.1:8000/todos/getdata', {
          method: method,
          body: JSON.stringify(feeds),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          todoToRemove.push(feeds.id);
        }
      } catch (error) { /* Do nothing */ }
    }));
    const tx = db.transaction('feeds', 'readwrite');
    for (const id of todoIdsToRemove) {
      tx.store.delete(id);
    }
    await tx.done;
  }
  
  
  
  
  
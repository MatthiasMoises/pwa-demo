/* eslint-disable no-console */
/* eslint-disable no-undef */

import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

workbox.setConfig({ debug: false })

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// Cache images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'demo-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
)

// Cache Google fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'demo-googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
)

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }
      return fetch(event.request)
    })
  )
})

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then(windowClients => {
    for (const windowClient of windowClients) {
      // Force open pages to refresh, so that they have a chance to load the
      // fresh navigation response from the local dev server.
      windowClient.navigate(windowClient.url)
    }
  })
})

// Check for Push Notifications
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json()
    event.waitUntil(Promise.all([self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon
    })]))
  }
})

// Handle click on notification
self.addEventListener('notificationclick', event => {
  event.notification.close()

  let clickResponsePromise = Promise.resolve()
  clickResponsePromise = clients.openWindow('http://localhost:8080/')

  event.waitUntil(Promise.all([clickResponsePromise]))
})

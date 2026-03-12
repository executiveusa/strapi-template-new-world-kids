// Service Worker for New World Kids PWA
const CACHE_NAME = 'nwk-v1'
const LESSON_CACHE = 'nwk-lessons-v1'
const API_CACHE = 'nwk-api-v1'

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
]

const LESSON_URLS = [
  '/lessons',
  '/progress',
  '/your-profile',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache install error:', err)
      })
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && !cacheName.includes('lessons') && !cacheName.includes('api')) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch event - cache strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Lesson content: Cache first, fallback to network
  if (LESSON_URLS.some(lesson => url.pathname.includes(lesson))) {
    event.respondWith(
      caches.open(LESSON_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          return response || fetch(request).then((response) => {
            cache.put(request, response.clone())
            return response
          })
        })
      }).catch(() => {
        return caches.match('/offline.html')
      })
    )
    return
  }

  // API calls: Network first, fallback to cache
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            caches.open(API_CACHE).then((cache) => {
              cache.put(request, response.clone())
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(request)
        })
    )
    return
  }

  // Static assets: Cache first
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request).then((response) => {
        if (response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone())
          })
        }
        return response
      })
    })
  )
})

// Handle messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

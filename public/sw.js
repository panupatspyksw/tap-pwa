/* public/sw.js */
const APP_VERSION = 'v1.0.1'
const STATIC_CACHE = `static-${APP_VERSION}`
const RUNTIME_CACHE = `runtime-${APP_VERSION}`

const APP_SHELL = [
    '/', // app shell
    '/about', // app shell
    '/how-to-use', // app shell
    '/statistics',
    '/manage',
    '/settings',
]

const PRECACHE_ASSETS = [
    '/favicon.ico',
    '/manifest.webmanifest',
    // icons you actually have in /public/icons
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/maskable-512.png',
    // add any must-have images/sounds from /public:
    // '/images/logo.svg',
    // '/sounds/bell.mp3',
    '/medias/logo.svg',
    '/medias/cloud-background edited v1.0.png',
    '/sounds/break.wav',
    '/sounds/focus.wav',
]

const PUBLIC_FILE_RE = /\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|otf|eot|mp3|wav|ogg|mp4|webm|css|js)$/i

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE)
            .then((cache) =>
                cache.addAll([...APP_SHELL, ...PRECACHE_ASSETS].map((p) => new Request(p, { cache: 'reload' })))
            )
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys()
            await Promise.all(
                keys.filter((k) => ![STATIC_CACHE, RUNTIME_CACHE].includes(k)).map((k) => caches.delete(k))
            )
            await self.clients.claim()
        })()
    )
})

self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Same-origin only
    if (url.origin !== self.location.origin) return

    // 1) Navigations: try network, fallback to a cached app shell
    if (request.mode === 'navigate') {
        event.respondWith(networkFirstNav(request))
        return
    }

    // 2) Next build assets
    if (url.pathname.startsWith('/_next/static/')) {
        event.respondWith(cacheFirst(request))
        return
    }

    // 3) Public files (images, fonts, sounds, css/js in /public)
    if (PUBLIC_FILE_RE.test(url.pathname)) {
        event.respondWith(staleWhileRevalidate(request))
        return
    }
    // Default: pass-through or SWR
})

async function cacheFirst(request) {
    const cache = await caches.open(STATIC_CACHE)
    const hit = await cache.match(request)
    if (hit) return hit
    const res = await fetch(request)
    if (res && res.ok) cache.put(request, res.clone())
    return res
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE)
    const cached = await cache.match(request)
    const fetchPromise = fetch(request)
        .then((res) => {
            if (res && res.ok) cache.put(request, res.clone())
            return res
        })
        .catch(() => cached)
    return cached || fetchPromise
}

async function networkFirstNav(request) {
    const cache = await caches.open(RUNTIME_CACHE)
    try {
        const res = await fetch(request)
        if (res && res.ok) cache.put(request, res.clone())
        return res
    } catch {
        // Fallback to any cached app shell page (prefer root)
        const shellCandidates = await caches.open(STATIC_CACHE)
        const cachedRoot = await shellCandidates.match('/')
        if (cachedRoot) return cachedRoot

        // fallback to any other precached shell route
        for (const path of APP_SHELL) {
            const resp = await shellCandidates.match(path)
            if (resp) return resp
        }
        // Last resort
        return new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
    }
}

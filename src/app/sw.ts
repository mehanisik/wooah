import { defaultCache } from '@serwist/next/worker'
import { CacheFirst, ExpirationPlugin, NetworkOnly, Serwist } from 'serwist'

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: Array<{ url: string; revision: string | null }>
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: /^https:\/\/exercisedb-api\.vercel\.app\/.*/i,
      handler: new CacheFirst({
        cacheName: 'exercise-db',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          }),
        ],
      }),
    },
    {
      matcher: /^https:\/\/static\.exercisedb\.dev\/.*/i,
      handler: new CacheFirst({
        cacheName: 'exercise-gifs',
        plugins: [
          new ExpirationPlugin({
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
        ],
      }),
    },
    {
      matcher: /^https:\/\/.*\.supabase\.co\/(auth|rest|storage)\/.*/i,
      handler: new NetworkOnly(),
    },
    {
      matcher: /^https:\/\/accounts\.google\.com\/.*/i,
      handler: new NetworkOnly(),
    },
  ],
})

serwist.addEventListeners()

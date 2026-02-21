import { defaultCache } from '@serwist/next/worker'
import {
  CacheFirst,
  ExpirationPlugin,
  NetworkOnly,
  Serwist,
  StaleWhileRevalidate,
} from 'serwist'

declare const self: ServiceWorkerGlobalScope & {
  __SW_MANIFEST: Array<{ url: string; revision: string | null }>
}

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      matcher: /\/api\/gif\?/i,
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
      matcher: /\/api\/exercises/i,
      handler: new StaleWhileRevalidate({
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
      matcher: /^https:\/\/.*\.supabase\.co\/(auth|rest|storage)\/.*/i,
      handler: new NetworkOnly(),
    },
    {
      matcher: /^https:\/\/accounts\.google\.com\/.*/i,
      handler: new NetworkOnly(),
    },
    ...defaultCache,
  ],
})

serwist.addEventListeners()

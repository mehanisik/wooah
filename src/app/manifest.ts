import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wooah!',
    short_name: 'Wooah!',
    description: 'Push Pull Legs Hypertrophy Tracker',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#7c3aed',
    orientation: 'portrait',
    icons: [
      {
        src: '/pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}

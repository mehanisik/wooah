import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';

function supabasePreconnect() {
  return {
    name: 'supabase-preconnect',
    transformIndexHtml(html) {
      const url = process.env.VITE_SUPABASE_URL;
      if (url) {
        return html.replace(
          '<link id="supabasePreconnect" rel="preconnect" crossorigin>',
          `<link rel="preconnect" href="${url}" crossorigin>`,
        );
      }
      return html.replace('<link id="supabasePreconnect" rel="preconnect" crossorigin>\n', '');
    },
  };
}

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [
    supabasePreconnect(),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,png,ico,svg}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/accounts\.google\.com\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/.*\.inspirobot\.me\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
      },
      manifest: {
        name: 'IRON PPL — Hypertrophy Tracker',
        short_name: 'IRON PPL',
        description: '6-Day Push/Pull/Legs hypertrophy workout tracker',
        start_url: '/index.html',
        scope: '/',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        background_color: '#151716',
        theme_color: '#151716',
        orientation: 'portrait',
        categories: ['fitness', 'health'],
        shortcuts: [
          {
            name: 'Start Workout',
            short_name: 'Workout',
            url: '/index.html',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    compression({ algorithm: 'brotliCompress' }),
    visualizer({
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});

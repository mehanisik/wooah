import withSerwistInit from '@serwist/next'
import type { NextConfig } from 'next'

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  register: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV !== 'production',
})

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  images: { unoptimized: true },
  turbopack: {},
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'radix-ui',
      'zustand',
    ],
  },
}

export default withSerwist(nextConfig)

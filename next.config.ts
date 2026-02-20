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
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    viewTransition: true,
  },
}

export default withSerwist(nextConfig)

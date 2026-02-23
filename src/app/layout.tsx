import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/app-shell'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { inter, jetbrainsMono } from '@/lib/fonts'

export const metadata: Metadata = {
  metadataBase: new URL('https://wooah.vercel.app'),
  title: 'Wooah! — Hypertrophy Tracker',
  description:
    '6-day Push/Pull/Legs hypertrophy tracker with progressive overload, volume science, and mesocycle management.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon-180x180.png', sizes: '180x180' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Wooah!',
  },
  openGraph: {
    title: 'Wooah! — Hypertrophy Tracker',
    description:
      'Push/Pull/Legs hypertrophy tracker with progressive overload, volume tracking, and mesocycle management.',
    url: 'https://wooah.vercel.app',
    siteName: 'Wooah!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wooah! — Push/Pull/Legs Hypertrophy Tracker',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wooah! — Hypertrophy Tracker',
    description:
      'Push/Pull/Legs hypertrophy tracker with progressive overload, volume tracking, and mesocycle management.',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#222222' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body suppressHydrationWarning>
        <ConvexClientProvider>
          <ThemeProvider>
            <AppShell>{children}</AppShell>
            <Toaster position="bottom-center" richColors />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import './globals.css'
import { AppShell } from '@/components/layout/app-shell'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { inter, jetbrainsMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'IRON PPL — Hypertrophy Tracker',
  description:
    '6-day Push/Pull/Legs hypertrophy tracker with progressive overload, volume science, and mesocycle management.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'IRON PPL',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#151716' },
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
      <body>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
          <Toaster position="bottom-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}

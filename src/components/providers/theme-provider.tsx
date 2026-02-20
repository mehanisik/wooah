'use client'

import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from 'next-themes'
import { useEffect } from 'react'

function ThemeColorSync() {
  const { resolvedTheme } = useNextTheme()

  useEffect(() => {
    const color = resolvedTheme === 'dark' ? '#151716' : '#ffffff'
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color)
  }, [resolvedTheme])

  return null
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      storageKey="ironppl_theme"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}

export { useNextTheme as useTheme }

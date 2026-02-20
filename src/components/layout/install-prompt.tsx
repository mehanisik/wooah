'use client'

import { Download, Share } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(true)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window)
    )

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (isStandalone) return null

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setIsStandalone(true)
    setDeferredPrompt(null)
  }

  return (
    <section className="space-y-3 rounded-lg border border-border bg-card px-4 py-3">
      <h3 className="font-display text-sm tracking-wider">INSTALL APP</h3>
      {deferredPrompt && (
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs"
          onClick={handleInstall}
        >
          <Download className="mr-1.5 h-3.5 w-3.5" />
          ADD TO HOME SCREEN
        </Button>
      )}
      {!deferredPrompt && isIOS && (
        <p className="font-body text-muted-foreground text-xs leading-relaxed">
          Tap <Share className="inline h-3.5 w-3.5 align-text-bottom" /> then
          &ldquo;Add to Home Screen&rdquo; to install.
        </p>
      )}
      {!(deferredPrompt || isIOS) && (
        <p className="font-body text-muted-foreground text-xs">
          Open your browser menu and select &ldquo;Install app&rdquo; or
          &ldquo;Add to Home Screen&rdquo;.
        </p>
      )}
    </section>
  )
}

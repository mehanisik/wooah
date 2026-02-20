'use client'

import { RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export function UpdatePrompt() {
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.ready.then((reg) => {
      reg.addEventListener('updatefound', () => {
        const newSW = reg.installing
        if (!newSW) return
        newSW.addEventListener('statechange', () => {
          if (
            newSW.state === 'installed' &&
            navigator.serviceWorker.controller
          ) {
            setShowUpdate(true)
          }
        })
      })
    })
  }, [])

  if (!showUpdate) return null

  return (
    <div className="fixed right-4 bottom-20 left-4 z-50 flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-lg">
      <RefreshCw className="h-4 w-4 flex-shrink-0 text-primary" />
      <span className="flex-1 font-body text-xs">
        A new version is available
      </span>
      <Button
        size="sm"
        className="h-7 text-xs"
        onClick={() => window.location.reload()}
      >
        UPDATE
      </Button>
    </div>
  )
}

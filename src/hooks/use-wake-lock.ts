'use client'

import { useEffect, useRef } from 'react'

export function useWakeLock(enabled = true) {
  const wakeLock = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    if (!(enabled && 'wakeLock' in navigator)) return

    async function request() {
      try {
        wakeLock.current = await navigator.wakeLock.request('screen')
      } catch {
        // expected — wake lock may be denied
      }
    }

    request()

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled) {
        request()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      wakeLock.current?.release()
      wakeLock.current = null
    }
  }, [enabled])
}

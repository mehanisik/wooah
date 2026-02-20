'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

const ROUTES = [
  '/workout/0',
  '/workout/1',
  '/workout/2',
  '/workout/3',
  '/workout/4',
  '/workout/5',
  '/rest',
  '/info',
  '/stats',
  '/calendar',
  '/photos',
]

const SWIPE_THRESHOLD = 50

export function useSwipeNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return

      const dx = e.changedTouches[0].clientX - touchStart.current.x
      const dy = e.changedTouches[0].clientY - touchStart.current.y
      touchStart.current = null

      if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return

      const currentIdx = ROUTES.indexOf(pathname)
      if (currentIdx === -1) return

      const nextIdx = dx < 0 ? currentIdx + 1 : currentIdx - 1
      if (nextIdx >= 0 && nextIdx < ROUTES.length) {
        router.push(ROUTES[nextIdx])
      }
    }

    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [router, pathname])
}

'use client'

import { useCallback } from 'react'

export function useHaptic() {
  return useCallback((ms = 10) => {
    navigator.vibrate?.(ms)
  }, [])
}

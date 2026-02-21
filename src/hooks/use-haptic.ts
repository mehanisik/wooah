'use client'

export function useHaptic() {
  return (ms = 10) => {
    navigator.vibrate?.(ms)
  }
}

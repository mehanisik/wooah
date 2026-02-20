'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface RestTimerState {
  endAt: number
  total: number
  label: string
  active: boolean
}

export function useRestTimer() {
  const [state, setState] = useState<RestTimerState>({
    endAt: 0,
    total: 0,
    label: '',
    active: false,
  })
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState({ endAt: 0, total: 0, label: '', active: false })
    setRemaining(0)
  }, [])

  const start = useCallback(
    (seconds: number, label = 'Rest') => {
      stop()
      const endAt = Date.now() + seconds * 1000
      setState({ endAt, total: seconds, label, active: true })
      setRemaining(seconds)
    },
    [stop]
  )

  useEffect(() => {
    if (!state.active) return

    const tick = () => {
      const left = Math.round((state.endAt - Date.now()) / 1000)
      if (left <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
        navigator.vibrate?.([100, 50, 100])
        setState((prev) => ({ ...prev, active: false }))
        setRemaining(0)
      } else {
        setRemaining(left)
      }
    }

    tick()
    intervalRef.current = setInterval(tick, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.active, state.endAt])

  return {
    remaining,
    total: state.total,
    label: state.label,
    active: state.active,
    start,
    stop,
  }
}

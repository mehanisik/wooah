'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'

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

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setState({ endAt: 0, total: 0, label: '', active: false })
    setRemaining(0)
  }

  const start = (seconds: number, label = 'Rest') => {
    stop()
    const endAt = Date.now() + seconds * 1000
    setState({ endAt, total: seconds, label, active: true })
    setRemaining(seconds)
  }

  const tick = useEffectEvent(() => {
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
  })

  useEffect(() => {
    if (!state.active) return

    tick()
    intervalRef.current = setInterval(tick, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.active])

  return {
    remaining,
    total: state.total,
    label: state.label,
    active: state.active,
    start,
    stop,
  }
}

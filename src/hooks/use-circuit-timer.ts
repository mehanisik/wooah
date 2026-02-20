'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const WORK_TIME = 45
const REST_TIME = 15
const PREPARE_TIME = 3

export type CircuitPhase = 'prepare' | 'work' | 'rest' | 'done'

interface CircuitState {
  phase: CircuitPhase
  currentIdx: number
  endAt: number
  totalTime: number
  paused: boolean
  pausedRemaining: number
}

function beep(freq = 880, duration = 150) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    gain.gain.value = 0.15
    osc.start()
    osc.stop(ctx.currentTime + duration / 1000)
  } catch {
    // expected — AudioContext may not be available
  }
}

export function useCircuitTimer(
  items: { name: string }[],
  onItemComplete: (idx: number) => void,
  onFinish: () => void
) {
  const [state, setState] = useState<CircuitState | null>(null)
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state
  const lastBeepRef = useRef(0)

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    setState(null)
    setRemaining(0)
  }, [])

  const advancePhase = useCallback(() => {
    const s = stateRef.current
    if (!s) return

    if (s.phase === 'prepare') {
      beep(1000, 200)
      navigator.vibrate?.([100, 50, 100])
      setState({
        ...s,
        phase: 'work',
        endAt: Date.now() + WORK_TIME * 1000,
        totalTime: WORK_TIME,
        pausedRemaining: 0,
      })
    } else if (s.phase === 'work') {
      onItemComplete(s.currentIdx)
      beep(440, 300)
      navigator.vibrate?.([200, 100, 200])

      if (s.currentIdx + 1 < items.length) {
        setState({
          ...s,
          phase: 'rest',
          endAt: Date.now() + REST_TIME * 1000,
          totalTime: REST_TIME,
          pausedRemaining: 0,
        })
      } else {
        setState({
          ...s,
          phase: 'done',
          endAt: 0,
          totalTime: 0,
          pausedRemaining: 0,
        })
        setRemaining(0)
        beep(1000, 100)
        setTimeout(() => beep(1200, 100), 150)
        setTimeout(() => beep(1400, 200), 300)
        navigator.vibrate?.([100, 80, 100, 80, 200])
        setTimeout(() => {
          stop()
          onFinish()
        }, 2500)
      }
    } else if (s.phase === 'rest') {
      beep(1000, 200)
      navigator.vibrate?.([100, 50, 100])
      setState({
        ...s,
        currentIdx: s.currentIdx + 1,
        phase: 'work',
        endAt: Date.now() + WORK_TIME * 1000,
        totalTime: WORK_TIME,
        pausedRemaining: 0,
      })
    }
  }, [items.length, onItemComplete, onFinish, stop])

  useEffect(() => {
    if (!state || state.phase === 'done' || state.paused) return
    if (intervalRef.current) clearInterval(intervalRef.current)

    const tick = () => {
      const left = Math.max(0, Math.round((state.endAt - Date.now()) / 1000))
      setRemaining(left)

      if (left <= 4 && left > 0 && state.phase !== 'prepare') {
        const now = Date.now()
        if (now - lastBeepRef.current > 800) {
          beep(660, 100)
          lastBeepRef.current = now
        }
      }

      if (left <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        intervalRef.current = null
        setTimeout(advancePhase, 0)
      }
    }

    tick()
    intervalRef.current = setInterval(tick, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [
    state?.phase,
    state?.currentIdx,
    state?.paused,
    state?.endAt,
    advancePhase,
    state,
  ])

  const start = useCallback((startIdx: number) => {
    setState({
      phase: 'prepare',
      currentIdx: startIdx,
      endAt: Date.now() + PREPARE_TIME * 1000,
      totalTime: PREPARE_TIME,
      paused: false,
      pausedRemaining: 0,
    })
  }, [])

  const togglePause = useCallback(() => {
    setState((prev) => {
      if (!prev) return null
      if (prev.paused) {
        return {
          ...prev,
          paused: false,
          endAt: Date.now() + prev.pausedRemaining * 1000,
          pausedRemaining: 0,
        }
      }
      const left = Math.max(0, Math.round((prev.endAt - Date.now()) / 1000))
      return { ...prev, paused: true, pausedRemaining: left }
    })
  }, [])

  const skipNext = useCallback(() => {
    const s = stateRef.current
    if (!s) return
    if (s.phase === 'work') onItemComplete(s.currentIdx)
    if (s.currentIdx + 1 < items.length) {
      setState({
        ...s,
        currentIdx: s.currentIdx + 1,
        phase: 'prepare',
        endAt: Date.now() + PREPARE_TIME * 1000,
        totalTime: PREPARE_TIME,
        pausedRemaining: 0,
      })
    } else {
      stop()
      onFinish()
    }
  }, [items.length, onItemComplete, onFinish, stop])

  const skipPrev = useCallback(() => {
    const s = stateRef.current
    if (!s || s.currentIdx <= 0) return
    setState({
      ...s,
      currentIdx: s.currentIdx - 1,
      phase: 'prepare',
      endAt: Date.now() + PREPARE_TIME * 1000,
      totalTime: PREPARE_TIME,
      pausedRemaining: 0,
    })
  }, [])

  const publicState = state
    ? {
        phase: state.phase,
        currentIdx: state.currentIdx,
        remaining,
        totalTime: state.totalTime,
        paused: state.paused,
      }
    : null

  return { state: publicState, start, stop, togglePause, skipNext, skipPrev }
}

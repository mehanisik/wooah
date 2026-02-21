'use client'

import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { selectWorkoutTimer } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

export function useWorkoutClock(dayIdx: number) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timer = useWorkoutStore((s) => selectWorkoutTimer(s, dayIdx))

  const isRunning = !!timer?.startedAt && !timer.finishedAt

  const update = useEffectEvent(() => {
    if (timer?.startedAt && !timer.finishedAt) {
      const diff = Math.round(
        (Date.now() - new Date(timer.startedAt).getTime()) / 1000
      )
      setElapsed(diff)
    } else if (timer?.duration) {
      setElapsed(timer.duration)
    } else {
      setElapsed(0)
    }
  })

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (isRunning) {
      update()
      intervalRef.current = setInterval(update, 1000)
    } else {
      update()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  return elapsed
}

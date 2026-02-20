'use client'

import { useEffect, useRef, useState } from 'react'
import { selectWorkoutTimer } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

export function useWorkoutClock(dayIdx: number) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timer = useWorkoutStore((s) => selectWorkoutTimer(s, dayIdx))

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (timer?.startedAt && !timer.finishedAt) {
      const update = () => {
        const diff = Math.round(
          (Date.now() - new Date(timer.startedAt).getTime()) / 1000
        )
        setElapsed(diff)
      }
      update()
      intervalRef.current = setInterval(update, 1000)
    } else if (timer?.duration) {
      setElapsed(timer.duration)
    } else {
      setElapsed(0)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [timer?.startedAt, timer?.finishedAt, timer?.duration])

  return elapsed
}

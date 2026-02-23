'use client'

import { useQuery } from 'convex/react'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { api } from '../../convex/_generated/api'

export function useWorkoutClock(dayIdx: number) {
  const [elapsed, setElapsed] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const week = useCurrentWeek()
  const session = useQuery(api.sessions.getByWeekAndDay, {
    week,
    dayIndex: dayIdx,
  })

  const startedAt = session?.startedAt ?? null
  const finishedAt = session?.finishedAt ?? null

  const isRunning = !!startedAt && !finishedAt

  const update = useEffectEvent(() => {
    if (startedAt && !finishedAt) {
      const diff = Math.round(
        (Date.now() - new Date(startedAt).getTime()) / 1000
      )
      setElapsed(diff)
    } else if (startedAt && finishedAt) {
      const duration = Math.round(
        (new Date(finishedAt).getTime() - new Date(startedAt).getTime()) / 1000
      )
      setElapsed(duration)
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

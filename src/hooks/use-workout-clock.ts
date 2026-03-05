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
  const pausedSec =
    (session as { pausedDurationSec?: number } | null)?.pausedDurationSec ?? 0

  const isRunning = !!startedAt && !finishedAt

  const update = useEffectEvent(() => {
    if (startedAt && !finishedAt) {
      const activeSec = Math.round(
        (Date.now() - new Date(startedAt).getTime()) / 1000
      )
      setElapsed(pausedSec + activeSec)
    } else if (startedAt && finishedAt) {
      const activeSec = Math.round(
        (new Date(finishedAt).getTime() - new Date(startedAt).getTime()) / 1000
      )
      setElapsed(pausedSec + activeSec)
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

'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { calcWeekNumber } from '@/lib/workout/helpers'
import { api } from '../../convex/_generated/api'

export function useCurrentWeek(): number {
  const prefs = useQuery(api.preferences.get)
  return useMemo(() => {
    if (!prefs?.startDate) return 1
    return Math.max(1, calcWeekNumber(prefs.startDate, new Date()))
  }, [prefs?.startDate])
}

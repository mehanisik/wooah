'use client'

import { useQuery } from 'convex/react'
import { useMemo } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

interface ReadinessBadgeProps {
  dayIdx: number
}

export function ReadinessBadge({ dayIdx }: ReadinessBadgeProps) {
  const currentWeek = useCurrentWeek()
  const sessions = useQuery(api.sessions.getAll)

  const notes = useMemo(() => {
    if (!sessions) return null
    const session = sessions.find(
      (s) => s.week === currentWeek && s.dayIndex === dayIdx
    )
    if (!session) return null
    return session.notes ?? null
  }, [sessions, currentWeek, dayIdx])

  if (!notes) return null

  const energy = notes.energy ?? null
  const sleep = notes.sleep ?? null
  const mood = notes.mood ?? null
  const soreness = notes.soreness ?? null

  if (!(energy || sleep || mood || soreness)) return null

  const ENERGY_SCORES: Record<string, number> = {
    Low: 25,
    Normal: 50,
    High: 75,
    Peak: 100,
  }
  const SLEEP_SCORES: Record<string, number> = {
    '<5h': 20,
    '5-6h': 40,
    '7-8h': 80,
    '8+h': 100,
  }
  const MOOD_SCORES: Record<string, number> = {
    Rough: 25,
    Meh: 50,
    Good: 75,
    Great: 100,
  }
  const SORENESS_SCORES: Record<string, number> = {
    'Very Sore': 20,
    Moderate: 50,
    Mild: 80,
    None: 100,
  }

  const eScore = ENERGY_SCORES[energy ?? ''] ?? 50
  const slScore = SLEEP_SCORES[sleep ?? ''] ?? 50
  const mScore = MOOD_SCORES[mood ?? ''] ?? 50
  const soScore = SORENESS_SCORES[soreness ?? ''] ?? 50
  const score = Math.round(
    eScore * 0.25 + slScore * 0.25 + mScore * 0.2 + soScore * 0.2
  )

  let zone: string
  let label: string
  if (score <= 40) {
    zone = 'rest'
    label = 'Rest'
  } else if (score <= 60) {
    zone = 'light'
    label = 'Light day'
  } else if (score <= 80) {
    zone = 'normal'
    label = 'Train normally'
  } else {
    zone = 'push'
    label = 'Push hard'
  }

  const zoneStyles: Record<string, string> = {
    rest: 'bg-destructive/15 text-destructive',
    light: 'bg-warning-dim text-warning',
    normal: 'bg-success-dim text-success',
    push: 'bg-info/15 text-info',
  }

  return (
    <span
      className={cn(
        'rounded-full px-1.5 py-0.5 font-mono text-[10px]',
        zoneStyles[zone]
      )}
      title={label}
    >
      {score}
    </span>
  )
}

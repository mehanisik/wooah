'use client'

import { useQuery } from 'convex/react'
import { Flame, Trophy, Zap } from 'lucide-react'
import { useMemo } from 'react'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { api } from '../../../convex/_generated/api'

export function StatsBar() {
  const { isAuthenticated } = useAuth()
  const currentWeek = useCurrentWeek()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')
  const weekSessions = useQuery(
    api.sessions.getByWeek,
    isAuthenticated ? { week: currentWeek } : 'skip'
  )
  const allSessions = useQuery(
    api.sessions.getAll,
    isAuthenticated ? {} : 'skip'
  )
  const allPRs = useQuery(
    api.personalRecords.getAll,
    isAuthenticated ? {} : 'skip'
  )

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const dayCount = getTemplateOrDefault(activeProgramId).days.length

  const completed = useMemo(() => {
    if (!weekSessions) return 0
    return weekSessions.filter((s) => s.finishedAt != null).length
  }, [weekSessions])

  const streak = useMemo(() => {
    if (!allSessions || dayCount === 0) return 0
    const finishedSet = new Set<string>()
    for (const s of allSessions) {
      if (s.finishedAt != null) finishedSet.add(`w${s.week}-d${s.dayIndex}`)
    }
    let count = 0
    for (let w = currentWeek; w >= 1; w--) {
      for (let d = dayCount - 1; d >= 0; d--) {
        if (finishedSet.has(`w${w}-d${d}`)) {
          count++
        } else if (count > 0) {
          return count
        }
      }
    }
    return count
  }, [allSessions, dayCount, currentWeek])

  const prs = allPRs?.length ?? 0

  return (
    <div className="flex justify-center gap-6 py-1.5">
      <div className="flex items-center gap-1.5">
        <Flame className="h-3.5 w-3.5 text-warning" />
        <span className="font-mono font-semibold text-sm">{completed}</span>
        <span className="text-[10px] text-muted-foreground">/6</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Zap className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono font-semibold text-sm">{streak}</span>
        <span className="text-[10px] text-muted-foreground">streak</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Trophy className="h-3.5 w-3.5 text-success" />
        <span className="font-mono font-semibold text-sm">{prs}</span>
        <span className="text-[10px] text-muted-foreground">PRs</span>
      </div>
    </div>
  )
}

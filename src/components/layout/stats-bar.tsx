'use client'

import { Flame, Trophy, Zap } from 'lucide-react'
import {
  selectCompletedThisWeek,
  usePRCount,
  useStreak,
} from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

export function StatsBar() {
  const completed = useWorkoutStore((s) => selectCompletedThisWeek(s))
  const streak = useStreak()
  const prs = usePRCount()

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

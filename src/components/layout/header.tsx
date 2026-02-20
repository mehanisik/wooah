'use client'

import { Flame, Settings, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import {
  selectCompletedThisWeek,
  usePRCount,
  useStreak,
} from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

export function Header() {
  const completed = useWorkoutStore((s) => selectCompletedThisWeek(s))
  const streak = useStreak()
  const prs = usePRCount()

  return (
    <header className="sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg px-3">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="font-display text-brand text-xl tracking-wider">
              IRON PPL
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-warning" />
                <span className="font-mono font-semibold text-sm">
                  {completed}
                </span>
                <span className="text-[10px] text-muted-foreground">/6</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono font-semibold text-sm">
                  {streak}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  streak
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-success" />
                <span className="font-mono font-semibold text-sm">{prs}</span>
                <span className="text-[10px] text-muted-foreground">PRs</span>
              </div>
            </div>
            <Link
              href="/settings"
              className="rounded-md p-1.5 transition-colors hover:bg-accent"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

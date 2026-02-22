'use client'

import { Flame, Settings, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { WooahLogo } from '@/components/ui/wooah-logo'
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
  const { user } = useAuth()
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
  const [avatarError, setAvatarError] = useState(false)

  return (
    <header className="safe-area-pt sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg px-4">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <WooahLogo className="text-xl" />
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
              {avatarUrl && !avatarError ? (
                <img
                  src={avatarUrl}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <Settings className="h-4 w-4 text-muted-foreground" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

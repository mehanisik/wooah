'use client'

import { Flame, Settings, Trophy, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useAuth } from '@/hooks/auth-context'
import { useT } from '@/lib/i18n'
import {
  selectCompletedThisWeek,
  usePRCount,
  useStreak,
} from '@/lib/store/selectors'
import {
  getActiveDayCount,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { getMesoWeek, isDeloadWeek } from '@/lib/workout/mesocycle'

export function Header() {
  const t = useT()
  const completed = useWorkoutStore((s) => selectCompletedThisWeek(s))
  const dayCount = useWorkoutStore((s) => getActiveDayCount(s))
  const streak = useStreak()
  const prs = usePRCount()
  const { user } = useAuth()
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined
  const [avatarError, setAvatarError] = useState(false)
  const mesocycleConfig = useWorkoutStore((s) => s.mesocycleConfig)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const mesoWeek = getMesoWeek(mesocycleConfig, currentWeek)
  const deload = isDeloadWeek(mesocycleConfig, currentWeek)

  return (
    <header className="safe-area-pt sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg px-4">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <WooahLogo className="text-xl" />
            {mesoWeek !== null && (
              <span className="font-mono text-[10px] text-muted-foreground">
                {deload ? t('deload') : `W${mesoWeek}`}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-warning" />
                <span className="font-mono font-semibold text-sm">
                  {completed}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {t('ofN', { total: dayCount })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono font-semibold text-sm">
                  {streak}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {t('streak')}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-success" />
                <span className="font-mono font-semibold text-sm">{prs}</span>
                <span className="text-[10px] text-muted-foreground">
                  {t('prs')}
                </span>
              </div>
            </div>
            <Link
              href="/settings"
              className="rounded-md p-1.5 transition-colors hover:bg-accent"
              aria-label={t('settingsAriaLabel')}
            >
              {avatarUrl && !avatarError ? (
                <Image
                  src={avatarUrl}
                  alt=""
                  width={24}
                  height={24}
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarError(true)}
                  unoptimized
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

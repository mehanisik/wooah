'use client'

import { useQuery } from 'convex/react'
import { Flame, Settings, Trophy, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import type { MesocycleConfig } from '@/lib/store/types'
import { getMesoWeek, isDeloadWeek } from '@/lib/workout/mesocycle'
import { api } from '../../../convex/_generated/api'

function useCompletedThisWeek(
  weekSessions: { finishedAt?: string | null }[] | undefined
): number {
  return useMemo(() => {
    if (!weekSessions) return 0
    return weekSessions.filter((s) => s.finishedAt != null).length
  }, [weekSessions])
}

function useStreak(
  allSessions:
    | { finishedAt?: string | null; week: number; dayIndex: number }[]
    | undefined,
  dayCount: number,
  currentWeek: number
): number {
  return useMemo(() => {
    if (!allSessions || dayCount === 0) return 0
    const finishedSet = new Set<string>()
    for (const s of allSessions) {
      if (s.finishedAt != null) finishedSet.add(`w${s.week}-d${s.dayIndex}`)
    }
    let streak = 0
    for (let w = currentWeek; w >= 1; w--) {
      for (let d = dayCount - 1; d >= 0; d--) {
        if (finishedSet.has(`w${w}-d${d}`)) {
          streak++
        } else if (streak > 0) {
          return streak
        }
      }
    }
    return streak
  }, [allSessions, dayCount, currentWeek])
}

function usePRCount(prs: unknown[] | undefined): number {
  return prs?.length ?? 0
}

export function Header() {
  const t = useT()
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
  const viewer = useQuery(api.users.viewer, isAuthenticated ? {} : 'skip')

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)
  const dayCount = template.days.length
  const mesocycleConfig: MesocycleConfig = {
    length: prefs?.mesocycleConfig?.length ?? 6,
    deloadLength: prefs?.mesocycleConfig?.deloadLength ?? 1,
    startWeek: prefs?.mesocycleConfig?.startWeek ?? null,
    rampRate: prefs?.mesocycleConfig?.rampRate ?? 1,
  }

  const completed = useCompletedThisWeek(weekSessions)
  const streak = useStreak(allSessions, dayCount, currentWeek)
  const prs = usePRCount(allPRs)

  const avatarUrl = (viewer as Record<string, unknown> | null)?.image as
    | string
    | undefined
  const [avatarError, setAvatarError] = useState(false)

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

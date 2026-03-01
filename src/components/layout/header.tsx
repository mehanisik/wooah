'use client'

import { useQuery } from 'convex/react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useTemplate } from '@/hooks/use-template'
import { useT } from '@/lib/i18n'
import type { MesocycleConfig } from '@/lib/store/types'
import { cn } from '@/lib/utils'
import { getMesoWeek, isDeloadWeek } from '@/lib/workout/mesocycle'
import { api } from '../../../convex/_generated/api'

export function Header() {
  const t = useT()
  const { isAuthenticated } = useAuth()
  const currentWeek = useCurrentWeek()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)
  const mesocycleConfig: MesocycleConfig = {
    length: prefs?.mesocycleConfig?.length ?? 6,
    deloadLength: prefs?.mesocycleConfig?.deloadLength ?? 1,
    startWeek: prefs?.mesocycleConfig?.startWeek ?? null,
    rampRate: prefs?.mesocycleConfig?.rampRate ?? 1,
  }

  const mesoWeek = getMesoWeek(mesocycleConfig, currentWeek)
  const deload = isDeloadWeek(mesocycleConfig, currentWeek)

  return (
    <header className="safe-area-pt sticky top-0 z-40 border-border border-b bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-lg px-4 py-2">
        <div className="flex items-center justify-between">
          <Link href="/">
            <WooahLogo className="text-xl" />
          </Link>
          {mesoWeek !== null && (
            <span
              className={cn(
                'rounded-full px-2.5 py-0.5 font-medium font-mono text-[11px]',
                deload
                  ? 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-500'
                  : 'bg-primary/10 text-primary'
              )}
            >
              {deload ? t('deload') : `W${mesoWeek}`}
            </span>
          )}
        </div>
        <Link
          href="/programs"
          className="group mt-1.5 flex items-center justify-between rounded-lg bg-muted/60 px-3 py-1.5 transition-colors hover:bg-muted"
          aria-label={t('browseProgramsAriaLabel')}
        >
          <span className="truncate text-[13px] text-muted-foreground transition-colors group-hover:text-foreground">
            {template?.meta.name}
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  )
}

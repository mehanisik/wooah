'use client'

import { useQuery } from 'convex/react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { WooahLogo } from '@/components/ui/wooah-logo'
import { useAuth } from '@/hooks/auth-context'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import type { MesocycleConfig } from '@/lib/store/types'
import { getMesoWeek, isDeloadWeek } from '@/lib/workout/mesocycle'
import { api } from '../../../convex/_generated/api'

export function Header() {
  const t = useT()
  const { isAuthenticated } = useAuth()
  const currentWeek = useCurrentWeek()

  const prefs = useQuery(api.preferences.get, isAuthenticated ? {} : 'skip')

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)
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
      <div className="mx-auto max-w-lg px-4">
        <div className="flex h-12 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <WooahLogo className="text-xl" />
              {mesoWeek !== null && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  {deload ? t('deload') : `W${mesoWeek}`}
                </span>
              )}
            </Link>
            <span className="text-border">|</span>
            <Link
              href="/programs"
              className="flex items-center gap-0.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-accent"
              aria-label={t('browseProgramsAriaLabel')}
            >
              <span className="max-w-[120px] truncate font-body text-[10px] text-muted-foreground">
                {template.meta.name}
              </span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

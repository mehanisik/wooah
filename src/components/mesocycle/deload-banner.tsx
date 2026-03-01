'use client'

import { useMutation, useQuery } from 'convex/react'
import { AlertTriangle } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useTemplate } from '@/hooks/use-template'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { checkDeloadSignals } from '@/lib/workout/deload-detect'
import { api } from '../../../convex/_generated/api'

const DEFAULT_MESO = {
  length: 6,
  deloadLength: 1,
  startWeek: null,
  rampRate: 1,
}

export function DeloadBanner() {
  const t = useT()
  const prefs = useQuery(api.preferences.get)
  const currentWeek = useCurrentWeek()
  const upsertPrefs = useMutation(api.preferences.upsert)

  const raw = prefs?.mesocycleConfig ?? DEFAULT_MESO
  const config = useMemo(
    () => ({ ...raw, startWeek: raw.startWeek ?? null }),
    [raw]
  )
  const deloadDismissed = prefs?.deloadDismissed ?? null
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)

  const signal = useMemo(
    () =>
      template
        ? checkDeloadSignals({
            mesocycleConfig: config,
            currentWeek,
            deloadDismissed,
            dayCount: template.days.length,
          })
        : null,
    [config, currentWeek, deloadDismissed, template]
  )

  if (!signal) return null

  const acceptDeload = () => {
    upsertPrefs({
      mesocycleConfig: {
        ...config,
        startWeek: Math.max(1, currentWeek - config.length + 1),
      },
    })
  }

  const dismiss = () => {
    upsertPrefs({ deloadDismissed: currentWeek })
  }

  return (
    <div
      className={cn(
        'rounded-lg border px-3 py-2',
        signal.level === 'red'
          ? 'border-destructive/30 bg-destructive/5'
          : 'border-warning/30 bg-warning-dim/20'
      )}
    >
      <div className="flex items-start gap-2">
        <AlertTriangle
          className={cn(
            'mt-0.5 h-4 w-4 flex-shrink-0',
            signal.level === 'red' ? 'text-destructive' : 'text-warning'
          )}
        />
        <p className="flex-1 font-body text-foreground text-xs">
          {signal.reason}
        </p>
      </div>
      <div className="mt-2 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={acceptDeload}
        >
          {t('deload')}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={dismiss}
        >
          {t('dismiss')}
        </Button>
      </div>
    </div>
  )
}

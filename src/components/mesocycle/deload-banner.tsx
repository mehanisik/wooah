'use client'

import { useMutation, useQuery } from 'convex/react'
import { AlertTriangle } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { useCurrentWeek } from '@/hooks/use-current-week'
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
  const prefs = useQuery(api.preferences.get)
  const currentWeek = useCurrentWeek()
  const upsertPrefs = useMutation(api.preferences.upsert)

  const raw = prefs?.mesocycleConfig ?? DEFAULT_MESO
  const config = { ...raw, startWeek: raw.startWeek ?? null }
  const deloadDismissed = prefs?.deloadDismissed ?? null
  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'

  const signal = useMemo(
    () =>
      checkDeloadSignals({
        mesocycleConfig: config,
        currentWeek,
        deloadDismissed,
        activeProgramId,
      }),
    [config, currentWeek, deloadDismissed, activeProgramId]
  )

  if (!signal) return null

  const acceptDeload = () => {
    upsertPrefs({
      mesocycleConfig: {
        ...config,
        startWeek: currentWeek - config.length,
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
          DELOAD
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={dismiss}
        >
          DISMISS
        </Button>
      </div>
    </div>
  )
}

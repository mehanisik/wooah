'use client'

import { useMutation, useQuery } from 'convex/react'
import { Button } from '@/components/ui/button'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'

const DEFAULT_MESO = {
  length: 6,
  deloadLength: 1,
  startWeek: null,
  rampRate: 1,
}

export function MesoSetup() {
  const t = useT()
  const prefs = useQuery(api.preferences.get)
  const currentWeek = useCurrentWeek()
  const upsertPrefs = useMutation(api.preferences.upsert)

  const raw = prefs?.mesocycleConfig ?? DEFAULT_MESO
  const config = { ...raw, startWeek: raw.startWeek ?? null }

  if (config.startWeek) return null

  const startMesocycle = () => {
    upsertPrefs({
      mesocycleConfig: { ...config, startWeek: currentWeek },
    })
  }

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3 text-center">
      <div className="font-body font-semibold text-sm">{t('mesocycle')}</div>
      <p className="mt-0.5 font-body text-[10px] text-muted-foreground">
        {t('mesoStartDesc', {
          length: config.length,
          deload: config.deloadLength,
        })}
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 text-xs"
        onClick={startMesocycle}
      >
        {t('startMesocycle')}
      </Button>
    </div>
  )
}

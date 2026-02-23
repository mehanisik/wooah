'use client'

import { useMutation, useQuery } from 'convex/react'
import { Button } from '@/components/ui/button'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { api } from '../../../convex/_generated/api'

const DEFAULT_MESO = {
  length: 6,
  deloadLength: 1,
  startWeek: null,
  rampRate: 1,
}

export function MesoSetup() {
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
      <div className="font-body font-semibold text-sm">MESOCYCLE</div>
      <p className="mt-0.5 font-body text-[10px] text-muted-foreground">
        Start a {config.length}+{config.deloadLength} mesocycle for progressive
        overload
      </p>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 text-xs"
        onClick={startMesocycle}
      >
        START MESOCYCLE
      </Button>
    </div>
  )
}

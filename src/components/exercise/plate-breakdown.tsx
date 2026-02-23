'use client'

import { useQuery } from 'convex/react'
import { useT } from '@/lib/i18n'
import { calcPlates, isBarbell, PLATE_COLORS } from '@/lib/workout/plate-calc'
import { api } from '../../../convex/_generated/api'

interface PlateBreakdownProps {
  weight: string
  exerciseName: string
}

export function PlateBreakdown({ weight, exerciseName }: PlateBreakdownProps) {
  const t = useT()
  const prefs = useQuery(api.preferences.get)
  const barWeight = prefs?.plateSettings?.barWeight ?? 20

  if (!(weight && isBarbell(exerciseName))) return null

  const result = calcPlates(Number.parseFloat(weight), exerciseName, barWeight)
  if (!result || result.plates.length === 0) return null

  const grouped: Record<number, number> = {}
  for (const p of result.plates) {
    grouped[p] = (grouped[p] || 0) + 1
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      {Object.entries(grouped)
        .sort((a, b) => Number(b[0]) - Number(a[0]))
        .map(([plate, count]) => {
          const p = Number(plate)
          const color = PLATE_COLORS[p] || '#666'
          const label = count > 1 ? `${count}x${plate}` : plate
          return (
            <span
              key={plate}
              className="rounded-sm px-1.5 py-0.5 font-mono text-[9px]"
              style={{
                background: color,
                color: p === 5 ? '#333' : '#fff',
              }}
            >
              {label}
            </span>
          )
        })}
      <span className="font-body text-[9px] text-muted-foreground">
        {t('perSide')}
      </span>
      {result.remainder > 0 && (
        <span className="font-body text-[9px] text-warning">
          +{result.remainder}kg
        </span>
      )}
    </div>
  )
}

'use client'

import { useMutation, useQuery } from 'convex/react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { type MessageKey, useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

const ENERGY_OPTIONS = [
  { value: 'Low', key: 'energyLow' as const },
  { value: 'Normal', key: 'energyNormal' as const },
  { value: 'High', key: 'energyHigh' as const },
  { value: 'Peak', key: 'energyPeak' as const },
]
const SLEEP_OPTIONS = [
  { value: '<5h', key: 'sleepUnder5' as const },
  { value: '5-6h', key: 'sleep56' as const },
  { value: '7-8h', key: 'sleep78' as const },
  { value: '8+h', key: 'sleepOver8' as const },
]
const MOOD_OPTIONS = [
  { value: 'Rough', key: 'moodRough' as const },
  { value: 'Meh', key: 'moodMeh' as const },
  { value: 'Good', key: 'moodGood' as const },
  { value: 'Great', key: 'moodGreat' as const },
]
const SORENESS_OPTIONS = [
  { value: 'Very Sore', key: 'sorenessVerySore' as const },
  { value: 'Moderate', key: 'sorenessModerate' as const },
  { value: 'Mild', key: 'sorenessMild' as const },
  { value: 'None', key: 'sorenessNone' as const },
]

interface SessionNotesData {
  energy?: string
  sleep?: string
  mood?: string
  soreness?: string
  rating?: number
  text?: string
}

interface SessionStripProps {
  dayIdx: number
}

export function SessionStrip({ dayIdx }: SessionStripProps) {
  const t = useT()
  const week = useCurrentWeek()
  const session = useQuery(api.sessions.getByWeekAndDay, {
    week,
    dayIndex: dayIdx,
  })
  const setNotesMut = useMutation(api.sessions.setNotes)

  const notes: Partial<SessionNotesData> = session?.notes
    ? (session.notes as Partial<SessionNotesData>)
    : {}

  const update = (field: keyof SessionNotesData, value: string) => {
    setNotesMut({
      week,
      dayIndex: dayIdx,
      notes: { ...notes, [field]: value },
    })
  }

  return (
    <div className="space-y-2">
      <PillRow
        label={t('energy')}
        options={ENERGY_OPTIONS}
        value={notes.energy}
        onChange={(v) => update('energy', v)}
        t={t}
      />
      <PillRow
        label={t('sleep')}
        options={SLEEP_OPTIONS}
        value={notes.sleep}
        onChange={(v) => update('sleep', v)}
        t={t}
      />
      <PillRow
        label={t('mood')}
        options={MOOD_OPTIONS}
        value={notes.mood}
        onChange={(v) => update('mood', v)}
        t={t}
      />
      <PillRow
        label={t('sorenessLabel')}
        options={SORENESS_OPTIONS}
        value={notes.soreness}
        onChange={(v) => update('soreness', v)}
        t={t}
      />
    </div>
  )
}

function PillRow({
  label,
  options,
  value,
  onChange,
  t,
}: {
  label: string
  options: { value: string; key: MessageKey }[]
  value?: string
  onChange: (v: string) => void
  t: (key: MessageKey, params?: Record<string, string | number>) => string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 flex-shrink-0 font-body text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-full border px-2.5 py-1 font-body text-[10px] transition-all active:scale-95',
              value === opt.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {t(opt.key)}
          </button>
        ))}
      </div>
    </div>
  )
}

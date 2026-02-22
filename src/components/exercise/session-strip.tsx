'use client'

import { selectSessionNotes } from '@/lib/store/selectors'
import type { SessionNotes } from '@/lib/store/types'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'

const ENERGY_OPTIONS = ['Low', 'Normal', 'High', 'Peak']
const SLEEP_OPTIONS = ['<5h', '5-6h', '7-8h', '8+h']
const MOOD_OPTIONS = ['Rough', 'Meh', 'Good', 'Great']
const SORENESS_OPTIONS = ['Very Sore', 'Moderate', 'Mild', 'None']

interface SessionStripProps {
  dayIdx: number
}

export function SessionStrip({ dayIdx }: SessionStripProps) {
  const notes = useWorkoutStore((s) => selectSessionNotes(s, dayIdx))
  const setNotes = useWorkoutStore((s) => s.setSessionNotes)

  const update = (field: keyof SessionNotes, value: string) => {
    setNotes(dayIdx, { ...notes, [field]: value })
  }

  return (
    <div className="space-y-2">
      <PillRow
        label="Energy"
        options={ENERGY_OPTIONS}
        value={notes.energy}
        onChange={(v) => update('energy', v)}
      />
      <PillRow
        label="Sleep"
        options={SLEEP_OPTIONS}
        value={notes.sleep}
        onChange={(v) => update('sleep', v)}
      />
      <PillRow
        label="Mood"
        options={MOOD_OPTIONS}
        value={notes.mood}
        onChange={(v) => update('mood', v)}
      />
      <PillRow
        label="Soreness"
        options={SORENESS_OPTIONS}
        value={notes.soreness}
        onChange={(v) => update('soreness', v)}
      />
    </div>
  )
}

function PillRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value?: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 flex-shrink-0 font-body text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              'rounded-full border px-2.5 py-1 font-body text-[10px] transition-colors',
              value === opt
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:text-foreground'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

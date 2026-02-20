'use client'

import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { CardioItem } from '@/lib/data/program'
import { selectCardioLog } from '@/lib/store/selectors'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'

interface CardioSectionProps {
  dayIdx: number
  items: CardioItem[]
}

export function CardioSection({ dayIdx, items }: CardioSectionProps) {
  const [open, setOpen] = useState(false)
  const setCardioLog = useWorkoutStore((s) => s.setCardioLog)

  const completedCount = useWorkoutStore(
    (s) => items.filter((_, i) => selectCardioLog(s, dayIdx, i)).length
  )

  return (
    <div className="rounded-md border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-sm">Abs / Cardio</span>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">
          {completedCount}/{items.length}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="space-y-1.5 px-3 pb-3">
          {items.map((item, i) => (
            <CardioItemRow
              key={`${item.name}-${i}`}
              dayIdx={dayIdx}
              itemIdx={i}
              item={item}
              setCardioLog={setCardioLog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CardioItemRow({
  dayIdx,
  itemIdx,
  item,
  setCardioLog,
}: {
  dayIdx: number
  itemIdx: number
  item: CardioItem
  setCardioLog: (dayIdx: number, itemIdx: number, done: boolean) => void
}) {
  const done = useWorkoutStore((s) => selectCardioLog(s, dayIdx, itemIdx))

  return (
    <button
      type="button"
      onClick={() => setCardioLog(dayIdx, itemIdx, !done)}
      className={cn(
        'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors',
        done
          ? 'bg-success-dim/30 text-success'
          : 'text-foreground hover:bg-accent'
      )}
    >
      <span
        className={cn(
          'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border',
          done ? 'border-success bg-success-dim' : 'border-border'
        )}
      >
        {done && <Check className="h-3 w-3" />}
      </span>
      <span className="flex-1 font-body text-xs">{item.name}</span>
      <span className="font-mono text-[10px] text-muted-foreground">
        {item.duration}
      </span>
    </button>
  )
}

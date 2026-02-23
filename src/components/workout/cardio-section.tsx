'use client'

import { useMutation, useQuery } from 'convex/react'
import { Check, ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import type { CardioItem } from '@/lib/data/program'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

interface CardioSectionProps {
  dayIdx: number
  items: CardioItem[]
}

export function CardioSection({ dayIdx, items }: CardioSectionProps) {
  const t = useT()
  const [open, setOpen] = useState(false)
  const week = useCurrentWeek()
  const cardioLogs = useQuery(api.cardio.getByWeekAndDay, {
    week,
    dayIndex: dayIdx,
  })
  const setCardio = useMutation(api.cardio.set)

  const completedCount = useMemo(() => {
    if (!cardioLogs) return 0
    return items.filter((_, i) =>
      cardioLogs.some(
        (c: { itemIndex: number; done: boolean }) => c.itemIndex === i && c.done
      )
    ).length
  }, [cardioLogs, items])

  return (
    <div className="rounded-md border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left"
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-sm">
          {t('absCardio')}
        </span>
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
              week={week}
              cardioLogs={cardioLogs}
              setCardio={setCardio}
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
  week,
  cardioLogs,
  setCardio,
}: {
  dayIdx: number
  itemIdx: number
  item: CardioItem
  week: number
  cardioLogs: Array<{ itemIndex: number; done: boolean }> | undefined
  setCardio: (args: {
    week: number
    dayIndex: number
    itemIndex: number
    done: boolean
  }) => void
}) {
  const done = useMemo(() => {
    if (!cardioLogs) return false
    return cardioLogs.some((c) => c.itemIndex === itemIdx && c.done)
  }, [cardioLogs, itemIdx])

  return (
    <button
      type="button"
      onClick={() =>
        setCardio({ week, dayIndex: dayIdx, itemIndex: itemIdx, done: !done })
      }
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

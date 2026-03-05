'use client'

import { ChevronDown, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { useExerciseGif } from '@/hooks/use-exercise-gif'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { SetRow } from './set-row'

interface FreestyleExerciseCardProps {
  dayIdx: number
  exerciseIndex: number
  name: string
  equipment?: string
  targetSets: number
  rest?: number
  onRemove: () => void
  onStartRest: (sec: number, label: string) => void
}

export function FreestyleExerciseCard({
  dayIdx,
  exerciseIndex,
  name,
  equipment,
  targetSets,
  rest,
  onRemove,
  onStartRest,
}: FreestyleExerciseCardProps) {
  const t = useT()
  const [expanded, setExpanded] = useState(true)
  const [setCount, setSetCount] = useState(targetSets)
  const gifUrl = useExerciseGif(name)

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-3 px-4 py-3"
      >
        {gifUrl ? (
          <Image
            src={gifUrl}
            alt=""
            className="h-10 w-10 flex-shrink-0 rounded bg-muted object-cover"
            width={40}
            height={40}
            loading="lazy"
            unoptimized
          />
        ) : (
          <div className="h-10 w-10 flex-shrink-0 rounded bg-muted" />
        )}
        <div className="min-w-0 flex-1 text-left">
          <div className="truncate font-body font-semibold text-sm capitalize">
            {name}
          </div>
          {equipment && (
            <Badge variant="outline" className="mt-0.5 px-1 py-0 text-[9px]">
              {equipment}
            </Badge>
          )}
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {/* Set rows */}
      {expanded && (
        <div className="border-border border-t px-4 pt-2 pb-3">
          {/* Column headers */}
          <div className="mb-1 grid grid-cols-[2rem_1fr_1fr_2.5rem] gap-2 font-display text-[10px] text-muted-foreground tracking-wider">
            <span>{t('setLabel')}</span>
            <span>{t('kgLabel')}</span>
            <span>{t('repsLabel')}</span>
            <span />
          </div>

          {Array.from({ length: setCount }, (_, setIdx) => (
            <SetRow
              key={setIdx}
              dayIdx={dayIdx}
              exIdx={exerciseIndex}
              setIdx={setIdx}
              isAmrap={false}
              restSeconds={rest ?? 90}
              exerciseName={name}
              onStartRest={onStartRest}
            />
          ))}

          {/* Actions */}
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setSetCount((c) => c + 1)}
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-border border-dashed py-1.5 font-body text-muted-foreground text-xs transition-colors active:bg-muted"
            >
              <Plus className="h-3 w-3" />
              {t('addSet')}
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="flex items-center justify-center gap-1 rounded-md border border-destructive/30 px-3 py-1.5 font-body text-destructive text-xs transition-colors active:bg-destructive/10"
            >
              <Trash2 className="h-3 w-3" />
              {t('remove')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

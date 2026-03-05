'use client'

import { Check, Zap } from 'lucide-react'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { ProgramTemplate } from '@/lib/data/programs/types'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const TYPE_COLORS: Record<string, string> = {
  push: 'bg-push',
  pull: 'bg-pull',
  legs: 'bg-legs',
  upper: 'bg-upper',
  lower: 'bg-lower',
  full: 'bg-full',
  chest: 'bg-chest',
  back: 'bg-back',
  shoulders: 'bg-shoulders',
  arms: 'bg-arms',
  power_upper: 'bg-upper',
  power_lower: 'bg-lower',
}

interface DayPickerSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: ProgramTemplate | undefined
  todayIdx: number | null
  finishedDays: Set<number>
}

export function DayPickerSheet({
  open,
  onOpenChange,
  template,
  todayIdx,
  finishedDays,
}: DayPickerSheetProps) {
  const t = useT()

  if (!template) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="max-h-[80vh]"
      >
        <SheetHeader>
          <SheetTitle className="font-display tracking-wider">
            {t('chooseWorkout')}
          </SheetTitle>
          <SheetDescription className="sr-only">
            {t('chooseWorkout')}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2 overflow-y-auto px-4 pb-4">
          {template.days.map((day, i) => {
            const finished = finishedDays.has(i)
            const isToday = i === todayIdx

            return (
              <Link
                key={day.day}
                href={`/workout/${i}`}
                onClick={() => onOpenChange(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border border-border p-3 transition-colors active:bg-muted/50',
                  isToday && 'ring-1 ring-primary'
                )}
              >
                <span
                  className={cn(
                    'rounded-md px-2 py-0.5 font-display text-[10px] text-white uppercase tracking-wider',
                    TYPE_COLORS[day.type] || 'bg-primary'
                  )}
                >
                  {day.type}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-body font-semibold text-sm">
                      {day.name}
                    </span>
                    {isToday && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 font-body text-[9px] text-primary">
                        {t('scheduledToday')}
                      </span>
                    )}
                  </div>
                  <span className="font-body text-muted-foreground text-xs">
                    {day.focus} ·{' '}
                    {t('exercisesCount', { count: day.exercises.length })}
                  </span>
                </div>
                {finished && (
                  <Check className="h-4 w-4 flex-shrink-0 text-success" />
                )}
              </Link>
            )
          })}

          {/* Freestyle option */}
          <Link
            href="/workout/freestyle"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-3 rounded-lg border border-border border-dashed p-3 transition-colors active:bg-muted/50"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-body font-semibold text-sm">
                {t('startFreestyle')}
              </div>
              <span className="font-body text-muted-foreground text-xs">
                {t('freestyleDesc')}
              </span>
            </div>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

'use client'

import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { ProgramTemplate } from '@/lib/data/programs/types'
import type { MessageKey } from '@/lib/i18n'
import { useT } from '@/lib/i18n'

const WEEKDAY_KEYS: MessageKey[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

const SHORT_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export function DayPicker({
  open,
  onOpenChange,
  template,
  onConfirm,
  onBack,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: ProgramTemplate
  onConfirm: (trainingDays: number[]) => void
  onBack: () => void
}) {
  const t = useT()
  const required = template.meta.daysPerWeek

  const defaultSelected = useMemo(() => {
    const restSet = new Set(template.defaultRestDays)
    return Array.from({ length: 7 }, (_, i) => i).filter((i) => !restSet.has(i))
  }, [template.defaultRestDays])

  const [selected, setSelected] = useState<number[]>(defaultSelected)

  const toggle = useCallback(
    (day: number) => {
      setSelected((prev) => {
        if (prev.includes(day)) {
          return prev.filter((d) => d !== day)
        }
        if (prev.length >= required) return prev
        return [...prev, day]
      })
    },
    [required]
  )

  const sorted = useMemo(() => [...selected].sort((a, b) => a - b), [selected])
  const isValid = selected.length === required

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="rounded-t-2xl"
      >
        <SheetHeader className="pb-0">
          <SheetTitle className="font-display text-sm tracking-wider">
            {t('selectTrainingDays')}
          </SheetTitle>
          <p className="font-body text-[11px] text-muted-foreground">
            {t('trainingDaysHelper', { count: required })}
          </p>
        </SheetHeader>

        <div className="px-4 py-2">
          <p className="mb-3 text-center font-body text-muted-foreground text-xs">
            {t('daysSelected', {
              selected: selected.length,
              required,
            })}
          </p>

          <div className="grid grid-cols-7 gap-1.5">
            {WEEKDAY_KEYS.map((key, i) => {
              const active = selected.includes(i)
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => toggle(i)}
                  className={`flex flex-col items-center rounded-lg py-3 transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <span className="font-display text-xs">
                    {SHORT_LABELS[i]}
                  </span>
                  <span className="mt-0.5 font-body text-[9px]">
                    {t(key).slice(0, 3)}
                  </span>
                </button>
              )
            })}
          </div>

          {isValid && (
            <div className="mt-4 space-y-1">
              {sorted.map((weekday, i) => (
                <div
                  key={weekday}
                  className="flex items-baseline justify-between font-body text-[11px]"
                >
                  <span className="text-muted-foreground">
                    {t(WEEKDAY_KEYS[weekday])}
                  </span>
                  <span className="text-foreground">
                    {template.days[i]?.name ?? '—'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter className="flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={onBack}
          >
            {t('cancel')}
          </Button>
          <Button
            size="sm"
            className="flex-1 text-xs"
            disabled={!isValid}
            onClick={() => onConfirm(sorted)}
          >
            {t('confirmSwitch')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

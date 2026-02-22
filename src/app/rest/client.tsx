'use client'

import { Coffee } from 'lucide-react'
import { useState } from 'react'
import { useRestQuotes, useT } from '@/lib/i18n'
import { selectCompletedThisWeek } from '@/lib/store/selectors'
import {
  getActiveDayCount,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'

export function RestPageClient() {
  const t = useT()
  const restQuotes = useRestQuotes()
  const completedThisWeek = useWorkoutStore((s) => selectCompletedThisWeek(s))
  const dayCount = useWorkoutStore((s) => getActiveDayCount(s))
  const [quote] = useState(
    () => restQuotes[Math.floor(Math.random() * restQuotes.length)]
  )

  return (
    <div className="flex flex-col items-center space-y-6 pt-4 pb-8 text-center">
      <Coffee className="h-12 w-12 text-primary" />
      <div>
        <h2 className="font-display text-3xl tracking-wider">{t('restDay')}</h2>
        <p className="mt-1 font-body text-muted-foreground text-sm">
          {t('sundayRecovery')}
        </p>
      </div>
      <div className="max-w-xs">
        <p className="font-body text-muted-foreground text-sm italic">
          &ldquo;{quote}&rdquo;
        </p>
      </div>
      <div className="rounded-lg border border-border bg-card px-6 py-4">
        <span className="font-display text-3xl text-primary">
          {completedThisWeek}
        </span>
        <span className="ml-1 font-body text-muted-foreground text-sm">
          {t('thisWeek', { total: dayCount })}
        </span>
      </div>
    </div>
  )
}

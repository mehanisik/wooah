'use client'

import { useQuery } from 'convex/react'
import { Coffee } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useRestQuotes, useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'

export function RestPageClient() {
  const t = useT()
  const restQuotes = useRestQuotes()
  const currentWeek = useCurrentWeek()
  const prefs = useQuery(api.preferences.get)
  const sessions = useQuery(api.sessions.getAll)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = getTemplateOrDefault(activeProgramId)
  const dayCount = template.days.length

  const completedThisWeek = useMemo(() => {
    if (!sessions) return 0
    let count = 0
    for (let d = 0; d < dayCount; d++) {
      const found = sessions.some(
        (s) => s.week === currentWeek && s.dayIndex === d && s.finishedAt
      )
      if (found) count++
    }
    return count
  }, [sessions, currentWeek, dayCount])

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

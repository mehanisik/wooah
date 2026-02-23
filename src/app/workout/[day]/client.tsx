'use client'

import { useQuery } from 'convex/react'
import { WorkoutPage } from '@/components/workout/workout-page'
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation'
import { getTemplateOrDefault } from '@/lib/data/programs/registry'
import { useT } from '@/lib/i18n'
import { api } from '../../../../convex/_generated/api'

export function WorkoutPageClient({ dayIdx }: { dayIdx: number }) {
  useSwipeNavigation()
  const t = useT()
  const prefs = useQuery(api.preferences.get)

  if (prefs === undefined) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('loading')}
      </div>
    )
  }

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const dayCount = getTemplateOrDefault(activeProgramId).days.length

  if (dayIdx < 0 || dayIdx >= dayCount) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('invalidDay')}
      </div>
    )
  }

  return <WorkoutPage dayIdx={dayIdx} />
}

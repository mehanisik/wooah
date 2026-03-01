'use client'

import { useQuery } from 'convex/react'
import { DayTabBar } from '@/components/workout/day-tab-bar'
import { WorkoutPage } from '@/components/workout/workout-page'
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation'
import { useTemplate } from '@/hooks/use-template'
import { useT } from '@/lib/i18n'
import { api } from '../../../../convex/_generated/api'

export function WorkoutPageClient({ dayIdx }: { dayIdx: number }) {
  useSwipeNavigation()
  const t = useT()
  const prefs = useQuery(api.preferences.get)

  const activeProgramId = prefs?.activeProgramId ?? 'wooah-ppl'
  const template = useTemplate(activeProgramId)

  if (prefs === undefined || !template) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('loading')}
      </div>
    )
  }

  const dayCount = template.days.length

  if (dayIdx < 0 || dayIdx >= dayCount) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t('invalidDay')}
      </div>
    )
  }

  return (
    <>
      <DayTabBar activeDayIdx={dayIdx} />
      <WorkoutPage dayIdx={dayIdx} />
    </>
  )
}

'use client'

import { WorkoutPage } from '@/components/workout/workout-page'
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation'

export function WorkoutPageClient({ dayIdx }: { dayIdx: number }) {
  useSwipeNavigation()

  if (dayIdx < 0 || dayIdx > 5) {
    return (
      <div className="py-8 text-center text-muted-foreground">Invalid day</div>
    )
  }

  return <WorkoutPage dayIdx={dayIdx} />
}

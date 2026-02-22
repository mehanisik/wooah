'use client'

import { WorkoutPage } from '@/components/workout/workout-page'
import { useSwipeNavigation } from '@/hooks/use-swipe-navigation'
import {
  getActiveDayCount,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'

export function WorkoutPageClient({ dayIdx }: { dayIdx: number }) {
  useSwipeNavigation()
  const dayCount = useWorkoutStore((s) => getActiveDayCount(s))

  if (dayIdx < 0 || dayIdx >= dayCount) {
    return (
      <div className="py-8 text-center text-muted-foreground">Invalid day</div>
    )
  }

  return <WorkoutPage dayIdx={dayIdx} />
}

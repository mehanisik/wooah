'use client'

import { BodyweightSection } from '@/components/bodyweight/bodyweight-section'
import { ExerciseComparison } from './exercise-comparison'
import { FrequencyHeatmap } from './frequency-heatmap'
import { JourneySummary } from './journey-summary'
import { MuscleVolumeChart } from './muscle-volume-chart'
import { PersonalRecordsList } from './personal-records-list'
import { VolumeChart } from './volume-chart'
import { WeightProgression } from './weight-progression'

export function StatsPage() {
  return (
    <div className="space-y-3 pb-4">
      <JourneySummary />
      <MuscleVolumeChart />
      <FrequencyHeatmap />
      <WeightProgression />
      <VolumeChart />
      <ExerciseComparison />
      <PersonalRecordsList />
      <BodyweightSection />
    </div>
  )
}

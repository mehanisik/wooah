import type { SessionNotes, WorkoutState } from '@/lib/store/types'
import { getEffectiveProgram } from '@/lib/store/use-workout-store'

const ENERGY_SCORES: Record<string, number> = {
  Low: 25,
  Normal: 50,
  High: 75,
  Peak: 100,
}

const SLEEP_SCORES: Record<string, number> = {
  '<5h': 20,
  '5-6h': 40,
  '7-8h': 80,
  '8+h': 100,
}

const MOOD_SCORES: Record<string, number> = {
  Rough: 25,
  Meh: 50,
  Good: 75,
  Great: 100,
}

const SORENESS_SCORES: Record<string, number> = {
  'Very Sore': 20,
  Moderate: 50,
  Mild: 80,
  None: 100,
}

function getSubjectiveScore(notes: SessionNotes): number | null {
  if (!(notes.energy || notes.sleep || notes.mood || notes.soreness))
    return null

  const energy = ENERGY_SCORES[notes.energy ?? ''] ?? 50
  const sleep = SLEEP_SCORES[notes.sleep ?? ''] ?? 50
  const mood = MOOD_SCORES[notes.mood ?? ''] ?? 50
  const soreness = SORENESS_SCORES[notes.soreness ?? ''] ?? 50

  return energy * 0.25 + sleep * 0.25 + mood * 0.2 + soreness * 0.2
}

function calcVolumeLoad(
  state: WorkoutState,
  week: number,
  dayIdx: number
): number {
  let load = 0
  const day = getEffectiveProgram(dayIdx)
  if (!day.exercises.length) return 0

  for (let e = 0; e < day.exercises.length; e++) {
    const ex = day.exercises[e]
    const extraKey = `w${week}-d${dayIdx}-e${e}`
    const totalSets = ex.sets + (state.extraSets[extraKey] || 0)
    for (let s = 0; s < totalSets; s++) {
      const log = state.logs[`w${week}-d${dayIdx}-e${e}-s${s}`]
      if (log?.done) {
        const w = Number.parseFloat(log.weight) || 0
        const r = Number.parseInt(log.reps, 10) || 0
        load += w * r
      }
    }
  }
  return load
}

function getWeeklyVolumeLoad(state: WorkoutState, week: number): number {
  let total = 0
  for (let d = 0; d < 6; d++) total += calcVolumeLoad(state, week, d)
  return total
}

function getACWR(state: WorkoutState): number {
  const acute = getWeeklyVolumeLoad(state, state.currentWeek)
  if (acute === 0) return 1.0

  let chronicTotal = 0
  let chronicWeeks = 0
  for (let w = state.currentWeek - 4; w < state.currentWeek; w++) {
    if (w < 1) continue
    const wl = getWeeklyVolumeLoad(state, w)
    if (wl > 0) {
      chronicTotal += wl
      chronicWeeks++
    }
  }

  if (chronicWeeks === 0) return 1.0
  const chronic = chronicTotal / chronicWeeks
  return chronic > 0 ? acute / chronic : 1.0
}

function getPerformanceScore(state: WorkoutState): number {
  const acwr = getACWR(state)
  if (acwr >= 0.8 && acwr <= 1.3) return 100
  if (acwr < 0.8) return Math.max(0, 100 - (0.8 - acwr) * 200)
  return Math.max(0, 100 - (acwr - 1.3) * 150)
}

export function calcReadiness(
  state: WorkoutState,
  notes: SessionNotes
): number | null {
  const subjective = getSubjectiveScore(notes)
  if (subjective === null) return null

  const performance = getPerformanceScore(state)
  return Math.round(subjective * 0.9 + performance * 0.1)
}

export interface ReadinessZone {
  zone: 'rest' | 'light' | 'normal' | 'push'
  label: string
  color: string
}

export function getReadinessZone(score: number): ReadinessZone {
  if (score <= 40) return { zone: 'rest', label: 'Rest', color: 'red' }
  if (score <= 60) return { zone: 'light', label: 'Light day', color: 'yellow' }
  if (score <= 80)
    return { zone: 'normal', label: 'Train normally', color: 'green' }
  return { zone: 'push', label: 'Push hard', color: 'blue' }
}

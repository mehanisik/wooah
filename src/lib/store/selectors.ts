import type {
  HistoryEntry,
  SessionNotes,
  SetLog,
  WorkoutState,
  WorkoutTimer,
} from './types'
import {
  getEffectiveProgramForState,
  useWorkoutStore,
} from './use-workout-store'

type S = WorkoutState

const EMPTY_LOG: SetLog = { weight: '', reps: '', done: false }
const EMPTY_HISTORY: HistoryEntry[] = []
const EMPTY_NOTES: Partial<SessionNotes> = {}

export function selectLog(
  s: S,
  dayIdx: number,
  exIdx: number,
  setIdx: number
): SetLog {
  const key = `w${s.currentWeek}-d${dayIdx}-e${exIdx}-s${setIdx}`
  return s.logs[key] ?? EMPTY_LOG
}

export function selectHistory(
  s: S,
  dayIdx: number,
  exIdx: number
): HistoryEntry[] {
  return s.history[`d${dayIdx}-e${exIdx}`] ?? EMPTY_HISTORY
}

export function selectLastSession(
  s: S,
  dayIdx: number,
  exIdx: number
): HistoryEntry | null {
  const h = s.history[`d${dayIdx}-e${exIdx}`]
  return h && h.length > 0 ? h[h.length - 1] : null
}

export function selectExtraSets(s: S, dayIdx: number, exIdx: number): number {
  return s.extraSets[`w${s.currentWeek}-d${dayIdx}-e${exIdx}`] || 0
}

export function selectExerciseSwap(
  s: S,
  dayIdx: number,
  exIdx: number
): string | null {
  return s.exerciseSwaps[`d${dayIdx}-e${exIdx}`] || null
}

export function selectCardioLog(
  s: S,
  dayIdx: number,
  itemIdx: number
): boolean {
  return !!s.cardioLogs[`w${s.currentWeek}-d${dayIdx}-c${itemIdx}`]
}

export function selectWorkoutTimer(s: S, dayIdx: number): WorkoutTimer | null {
  return s.workoutTimers[`w${s.currentWeek}-d${dayIdx}`] ?? null
}

export function selectSessionNotes(
  s: S,
  dayIdx: number
): Partial<SessionNotes> {
  return s.sessionNotes[`w${s.currentWeek}-d${dayIdx}`] ?? EMPTY_NOTES
}

export function selectExerciseNote(
  s: S,
  dayIdx: number,
  exIdx: number
): string {
  return s.exerciseNotes[`w${s.currentWeek}-d${dayIdx}-e${exIdx}`] || ''
}

export function selectPinnedNote(s: S, dayIdx: number, exIdx: number): string {
  return s.pinnedNotes[`d${dayIdx}-e${exIdx}`] || ''
}

export function selectCompletedThisWeek(s: S): number {
  let count = 0
  for (let d = 0; d < 6; d++) {
    if (s.finishedDays[`w${s.currentWeek}-d${d}`]) count++
  }
  return count
}

export function selectIsDayFinished(s: S, dayIdx: number): boolean {
  return !!s.finishedDays[`w${s.currentWeek}-d${dayIdx}`]
}

export function selectIsDayComplete(s: S, dayIdx: number): boolean {
  const day = getEffectiveProgramForState(s, dayIdx)
  if (!day.exercises.length) return false
  for (let e = 0; e < day.exercises.length; e++) {
    const totalSets = day.exercises[e].sets + selectExtraSets(s, dayIdx, e)
    for (let si = 0; si < totalSets; si++) {
      const logKey = `w${s.currentWeek}-d${dayIdx}-e${e}-s${si}`
      if (!s.logs[logKey]?.done) return false
    }
  }
  return true
}

export function useIsDayComplete(dayIdx: number) {
  return useWorkoutStore((s) => selectIsDayComplete(s, dayIdx))
}

export function useIsDayFinished(dayIdx: number) {
  return useWorkoutStore((s) => selectIsDayFinished(s, dayIdx))
}

export function useCompletedThisWeek() {
  return useWorkoutStore((s) => selectCompletedThisWeek(s))
}

export function useStreak() {
  return useWorkoutStore((s) => {
    let streak = 0
    for (let w = s.currentWeek; w >= 1; w--) {
      for (let d = 5; d >= 0; d--) {
        if (s.finishedDays[`w${w}-d${d}`]) {
          streak++
        } else if (streak > 0) {
          return streak
        }
      }
    }
    return streak
  })
}

export function usePRCount() {
  return useWorkoutStore((s) => Object.keys(s.personalRecords).length)
}

export function useDisplayName(dayIdx: number, exIdx: number) {
  return useWorkoutStore((s) => {
    const swap = s.exerciseSwaps[`d${dayIdx}-e${exIdx}`]
    if (swap) return swap
    const day = getEffectiveProgramForState(s, dayIdx)
    return day.exercises[exIdx]?.name || ''
  })
}

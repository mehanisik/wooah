import type { WorkoutState } from './types'

export function migrateFromV2(): Partial<WorkoutState> | null {
  try {
    const raw = localStorage.getItem('ironppl_state_v2')
    if (!raw) return null

    const v2 = JSON.parse(raw)
    if (!v2 || typeof v2 !== 'object') return null

    return {
      currentWeek: v2.currentWeek || 1,
      logs: v2.logs || {},
      history: v2.history || {},
      finishedDays: v2.finishedDays || {},
      totalSessions: v2.totalSessions || 0,
      personalRecords: v2.personalRecords || {},
      startDate: v2.startDate || null,
      workoutTimers: v2.workoutTimers || {},
      extraSets: v2.extraSets || {},
      exerciseSwaps: v2.exerciseSwaps || {},
      bodyweight: v2.bodyweight || [],
      oneRmHistory: v2.oneRmHistory || {},
      cardioLogs: v2.cardioLogs || {},
      sessionNotes: v2.sessionNotes || {},
      exerciseNotes: v2.exerciseNotes || {},
      pinnedNotes: v2.pinnedNotes || {},
      mesocycleConfig: v2.mesocycleConfig || {
        length: 4,
        deloadLength: 1,
        startWeek: null,
        rampRate: 2,
      },
      deloadDismissed: v2.deloadDismissed || null,
      swapFrequency: v2.swapFrequency || {},
      programOverrides: v2.programOverrides || {},
      plateSettings: v2.plateSettings || { barWeight: 20, unit: 'kg' },
    }
  } catch {
    return null
  }
}

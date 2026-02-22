import type { Equipment } from '@/lib/data/program'
import type { Locale } from '@/lib/i18n/types'

export interface SetLog {
  weight: string
  reps: string
  done: boolean
}

export interface HistoryEntry {
  week: number
  weight: number
  reps: number
  date: string
  sets?: { weight: number; reps: number }[]
}

export interface PersonalRecord {
  volume: number
  date: string
}

export interface WorkoutTimer {
  startedAt: string
  finishedAt: string | null
  duration: number
}

export interface SessionNotes {
  energy?: string
  sleep?: string
  mood?: string
  soreness?: string
  rating?: number
  text?: string
}

export interface OneRmEntry {
  date: string
  value: number
  week: number
}

export interface BodyweightEntry {
  date: string
  weight: number
}

export interface MesocycleConfig {
  length: number
  deloadLength: number
  startWeek: number | null
  rampRate: number
}

export interface PlateSettings {
  barWeight: number
  unit: 'kg' | 'lbs'
  plates?: number[]
}

export interface ProgramOverrideEntry {
  originalIdx?: number
  custom?: boolean
  name?: string
  equipment?: Equipment
  sets?: number
  reps?: string
  rest?: number
  rir?: string
  compound?: boolean
  amrap?: boolean
  notes?: string
  alternatives?: { name: string; equipment: Equipment }[]
}

export interface WorkoutState {
  currentWeek: number
  logs: Record<string, SetLog>
  history: Record<string, HistoryEntry[]>
  finishedDays: Record<string, boolean>
  totalSessions: number
  personalRecords: Record<string, PersonalRecord>
  startDate: string | null
  workoutTimers: Record<string, WorkoutTimer>
  extraSets: Record<string, number>
  exerciseSwaps: Record<string, string>
  swapFrequency: Record<string, number>
  bodyweight: BodyweightEntry[]
  oneRmHistory: Record<string, OneRmEntry[]>
  cardioLogs: Record<string, boolean>
  sessionNotes: Record<string, SessionNotes>
  exerciseNotes: Record<string, string>
  pinnedNotes: Record<string, string>
  mesocycleConfig: MesocycleConfig
  deloadDismissed: number | null
  programOverrides: Record<number, ProgramOverrideEntry[]>
  plateSettings: PlateSettings
  locale: Locale
  activeProgramId: string
  trainingDays: number[]
}

export interface WorkoutActions {
  getLog: (dayIdx: number, exIdx: number, setIdx: number) => SetLog
  setLog: (dayIdx: number, exIdx: number, setIdx: number, data: SetLog) => void
  getHistory: (dayIdx: number, exIdx: number) => HistoryEntry[]
  getLastSession: (dayIdx: number, exIdx: number) => HistoryEntry | null
  isDayComplete: (dayIdx: number) => boolean
  isDayFinished: (dayIdx: number) => boolean
  getCompletedThisWeek: () => number
  getExtraSets: (dayIdx: number, exIdx: number) => number
  addExtraSet: (dayIdx: number, exIdx: number) => void
  getExerciseSwap: (dayIdx: number, exIdx: number) => string | null
  setExerciseSwap: (dayIdx: number, exIdx: number, name: string | null) => void
  getCardioLog: (dayIdx: number, itemIdx: number) => boolean
  setCardioLog: (dayIdx: number, itemIdx: number, done: boolean) => void
  getWorkoutTimer: (dayIdx: number) => WorkoutTimer | null
  startWorkoutTimer: (dayIdx: number) => void
  stopWorkoutTimer: (dayIdx: number) => void
  finishDay: (dayIdx: number) => void
  getSessionNotes: (dayIdx: number) => SessionNotes
  setSessionNotes: (dayIdx: number, notes: SessionNotes) => void
  getExerciseNote: (dayIdx: number, exIdx: number) => string
  setExerciseNote: (dayIdx: number, exIdx: number, note: string) => void
  getPinnedNote: (dayIdx: number, exIdx: number) => string
  setPinnedNote: (dayIdx: number, exIdx: number, note: string) => void
  addExerciseToDay: (dayIdx: number, entry: ProgramOverrideEntry) => void
  removeExerciseFromDay: (dayIdx: number, exIdx: number) => void
  addBodyweight: (weight: number) => void
  setLocale: (locale: Locale) => void
  switchProgram: (programId: string, trainingDays: number[]) => void
  setTrainingDays: (days: number[]) => void
  mergeState: (imported: Partial<WorkoutState>) => void
  overwriteState: (imported: WorkoutState) => void
  initWeek: () => void
}

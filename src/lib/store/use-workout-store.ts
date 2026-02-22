import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PROGRAM } from '@/lib/data/program'
import type {
  HistoryEntry,
  SessionNotes,
  SetLog,
  WorkoutActions,
  WorkoutState,
} from './types'

const EMPTY_LOG: SetLog = { weight: '', reps: '', done: false }
const EMPTY_HISTORY: HistoryEntry[] = []
const EMPTY_NOTES: Partial<SessionNotes> = {}

function getMonday(d: Date): Date {
  const m = new Date(d)
  m.setHours(0, 0, 0, 0)
  const day = m.getDay()
  m.setDate(m.getDate() - (day === 0 ? 6 : day - 1))
  return m
}

function calcCurrentWeek(startDate: string | null): number {
  if (!startDate) return 1
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  return Math.max(
    1,
    Math.floor(
      (getMonday(new Date()).getTime() -
        getMonday(new Date(startDate)).getTime()) /
        msPerWeek
    ) + 1
  )
}

export function getEffectiveProgramForState(
  state: WorkoutState,
  dayIdx: number
) {
  if (!state.programOverrides?.[dayIdx]) return PROGRAM[dayIdx]

  const base = PROGRAM[dayIdx]
  const list = state.programOverrides[dayIdx]
  const exercises = list
    .map((entry) => {
      if (entry.custom) {
        return {
          name: entry.name || 'Custom Exercise',
          equipment: entry.equipment || ('dumbbell' as const),
          sets: entry.sets || 3,
          reps: entry.reps || '10-12',
          rest: entry.rest || 90,
          rir: entry.rir || '1-2',
          compound: entry.compound,
          amrap: entry.amrap,
          notes: entry.notes || '',
          alternatives: entry.alternatives || [],
        }
      }
      const orig = base.exercises[entry.originalIdx!]
      if (!orig) return null
      return {
        ...orig,
        ...(entry.sets != null && { sets: entry.sets }),
        ...(entry.reps != null && { reps: entry.reps }),
        ...(entry.rest != null && { rest: entry.rest }),
        ...(entry.rir != null && { rir: entry.rir }),
      }
    })
    .filter(Boolean)

  return { ...base, exercises: exercises as typeof base.exercises }
}

const initialState: WorkoutState = {
  currentWeek: 1,
  logs: {},
  history: {},
  finishedDays: {},
  totalSessions: 0,
  personalRecords: {},
  startDate: null,
  workoutTimers: {},
  extraSets: {},
  exerciseSwaps: {},
  bodyweight: [],
  oneRmHistory: {},
  cardioLogs: {},
  sessionNotes: {},
  exerciseNotes: {},
  pinnedNotes: {},
  mesocycleConfig: { length: 4, deloadLength: 1, startWeek: null, rampRate: 2 },
  deloadDismissed: null,
  swapFrequency: {},
  programOverrides: {},
  plateSettings: { barWeight: 20, unit: 'kg' },
  locale: 'en',
}

export const useWorkoutStore = create<WorkoutState & WorkoutActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      getLog: (dayIdx, exIdx, setIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}-e${exIdx}-s${setIdx}`
        return get().logs[key] ?? EMPTY_LOG
      },

      setLog: (dayIdx, exIdx, setIdx, data) => {
        const key = `w${get().currentWeek}-d${dayIdx}-e${exIdx}-s${setIdx}`
        set((s) => ({ logs: { ...s.logs, [key]: data } }))
      },

      getHistory: (dayIdx, exIdx) => {
        const key = `d${dayIdx}-e${exIdx}`
        return get().history[key] ?? EMPTY_HISTORY
      },

      getLastSession: (dayIdx, exIdx) => {
        const h = get().getHistory(dayIdx, exIdx)
        return h.length > 0 ? h[h.length - 1] : null
      },

      isDayComplete: (dayIdx) => {
        const state = get()
        const day = getEffectiveProgramForState(state, dayIdx)
        if (!day.exercises.length) return false
        for (let e = 0; e < day.exercises.length; e++) {
          const extraKey = `w${state.currentWeek}-d${dayIdx}-e${e}`
          const totalSets =
            day.exercises[e].sets + (state.extraSets[extraKey] || 0)
          for (let s = 0; s < totalSets; s++) {
            const logKey = `w${state.currentWeek}-d${dayIdx}-e${e}-s${s}`
            if (!state.logs[logKey]?.done) return false
          }
        }
        return true
      },

      isDayFinished: (dayIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        return !!get().finishedDays[key]
      },

      getCompletedThisWeek: () => {
        const state = get()
        let count = 0
        for (let d = 0; d < 6; d++) {
          if (state.finishedDays[`w${state.currentWeek}-d${d}`]) count++
        }
        return count
      },

      getExtraSets: (dayIdx, exIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}-e${exIdx}`
        return get().extraSets[key] || 0
      },

      addExtraSet: (dayIdx, exIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}-e${exIdx}`
        set((s) => ({
          extraSets: { ...s.extraSets, [key]: (s.extraSets[key] || 0) + 1 },
        }))
      },

      getExerciseSwap: (dayIdx, exIdx) => {
        return get().exerciseSwaps[`d${dayIdx}-e${exIdx}`] || null
      },

      setExerciseSwap: (dayIdx, exIdx, name) => {
        const key = `d${dayIdx}-e${exIdx}`
        set((s) => {
          const swaps = { ...s.exerciseSwaps }
          if (name) swaps[key] = name
          else delete swaps[key]
          return { exerciseSwaps: swaps }
        })
      },

      getCardioLog: (dayIdx, itemIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}-c${itemIdx}`
        return !!get().cardioLogs[key]
      },

      setCardioLog: (dayIdx, itemIdx, done) => {
        const key = `w${get().currentWeek}-d${dayIdx}-c${itemIdx}`
        set((s) => {
          const logs = { ...s.cardioLogs }
          if (done) logs[key] = true
          else delete logs[key]
          return { cardioLogs: logs }
        })
      },

      getWorkoutTimer: (dayIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        return get().workoutTimers[key] || null
      },

      startWorkoutTimer: (dayIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        if (get().workoutTimers[key]) return
        set((s) => ({
          workoutTimers: {
            ...s.workoutTimers,
            [key]: {
              startedAt: new Date().toISOString(),
              finishedAt: null,
              duration: 0,
            },
          },
        }))
      },

      stopWorkoutTimer: (dayIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        const timer = get().workoutTimers[key]
        if (!timer || timer.finishedAt) return
        const finishedAt = new Date().toISOString()
        const duration = Math.round(
          (new Date(finishedAt).getTime() -
            new Date(timer.startedAt).getTime()) /
            1000
        )
        set((s) => ({
          workoutTimers: {
            ...s.workoutTimers,
            [key]: { ...timer, finishedAt, duration },
          },
        }))
      },

      finishDay: (dayIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        set((s) => ({
          finishedDays: { ...s.finishedDays, [key]: true },
          totalSessions: s.totalSessions + 1,
        }))
        get().stopWorkoutTimer(dayIdx)
      },

      getSessionNotes: (dayIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        return get().sessionNotes[key] ?? EMPTY_NOTES
      },

      setSessionNotes: (dayIdx, notes) => {
        const key = `w${get().currentWeek}-d${dayIdx}`
        set((s) => ({
          sessionNotes: { ...s.sessionNotes, [key]: notes },
        }))
      },

      getExerciseNote: (dayIdx, exIdx) => {
        const key = `w${get().currentWeek}-d${dayIdx}-e${exIdx}`
        return get().exerciseNotes[key] || ''
      },

      setExerciseNote: (dayIdx, exIdx, note) => {
        const key = `w${get().currentWeek}-d${dayIdx}-e${exIdx}`
        set((s) => ({
          exerciseNotes: { ...s.exerciseNotes, [key]: note },
        }))
      },

      getPinnedNote: (dayIdx, exIdx) => {
        const key = `d${dayIdx}-e${exIdx}`
        return get().pinnedNotes[key] || ''
      },

      setPinnedNote: (dayIdx, exIdx, note) => {
        const key = `d${dayIdx}-e${exIdx}`
        set((s) => {
          const notes = { ...s.pinnedNotes }
          if (note) notes[key] = note
          else delete notes[key]
          return { pinnedNotes: notes }
        })
      },

      addExerciseToDay: (dayIdx, entry) => {
        set((s) => {
          const overrides = { ...s.programOverrides }
          if (!overrides[dayIdx]) {
            const base = PROGRAM[dayIdx].exercises
            overrides[dayIdx] = base.map((_, i) => ({ originalIdx: i }))
          } else {
            overrides[dayIdx] = [...overrides[dayIdx]]
          }
          overrides[dayIdx].push(entry)
          return { programOverrides: overrides }
        })
      },

      removeExerciseFromDay: (dayIdx, exIdx) => {
        set((s) => {
          const overrides = { ...s.programOverrides }
          if (!overrides[dayIdx]) return s
          const list = [...overrides[dayIdx]]
          list.splice(exIdx, 1)

          const base = PROGRAM[dayIdx].exercises
          const isBaseProgram =
            list.length === base.length &&
            list.every((e, i) => !e.custom && e.originalIdx === i)

          if (isBaseProgram) {
            delete overrides[dayIdx]
          } else {
            overrides[dayIdx] = list
          }
          return { programOverrides: overrides }
        })
      },

      setLocale: (locale) => set({ locale }),

      addBodyweight: (weight) => {
        const date = new Date().toISOString().split('T')[0]
        set((s) => {
          const existing = s.bodyweight.findIndex((e) => e.date === date)
          const bw = [...s.bodyweight]
          if (existing >= 0) bw[existing] = { date, weight }
          else bw.push({ date, weight })
          return { bodyweight: bw }
        })
      },

      mergeState: (imported) => {
        set((s) => {
          const merged = { ...s }

          if (imported.history) {
            const history = { ...merged.history }
            for (const [key, sessions] of Object.entries(imported.history)) {
              if (!history[key]) history[key] = []
              const existing = new Set(history[key].map((e) => `${e.week}`))
              for (const session of sessions) {
                if (!existing.has(`${session.week}`)) history[key].push(session)
              }
              history[key].sort((a, b) => a.week - b.week)
              if (history[key].length > 24)
                history[key] = history[key].slice(-24)
            }
            merged.history = history
          }

          if (imported.personalRecords) {
            const prs = { ...merged.personalRecords }
            for (const [key, pr] of Object.entries(imported.personalRecords)) {
              if (!prs[key] || pr.volume > prs[key].volume) prs[key] = pr
            }
            merged.personalRecords = prs
          }

          if (imported.bodyweight) {
            const existingDates = new Set(merged.bodyweight.map((e) => e.date))
            const bw = [...merged.bodyweight]
            for (const e of imported.bodyweight) {
              if (!existingDates.has(e.date)) bw.push(e)
            }
            bw.sort((a, b) => a.date.localeCompare(b.date))
            merged.bodyweight = bw
          }

          if (imported.oneRmHistory) {
            const orm = { ...merged.oneRmHistory }
            for (const [key, entries] of Object.entries(
              imported.oneRmHistory
            )) {
              if (!orm[key]) orm[key] = []
              const existing = new Set(orm[key].map((e) => e.date))
              for (const e of entries) {
                if (!existing.has(e.date)) orm[key].push(e)
              }
              orm[key].sort((a, b) => a.date.localeCompare(b.date))
            }
            merged.oneRmHistory = orm
          }

          const objectFields = [
            'logs',
            'finishedDays',
            'workoutTimers',
            'extraSets',
            'exerciseSwaps',
            'cardioLogs',
            'sessionNotes',
            'exerciseNotes',
            'pinnedNotes',
          ] as const
          for (const field of objectFields) {
            if (imported[field]) {
              ;(merged as Record<string, unknown>)[field] = {
                ...(merged[field] as Record<string, unknown>),
                ...(imported[field] as Record<string, unknown>),
              }
            }
          }

          if (
            imported.totalSessions &&
            imported.totalSessions > merged.totalSessions
          ) {
            merged.totalSessions = imported.totalSessions
          }
          if (
            imported.startDate &&
            (!merged.startDate || imported.startDate < merged.startDate)
          ) {
            merged.startDate = imported.startDate
          }

          return merged
        })
      },

      overwriteState: (imported) => {
        set(imported)
      },

      initWeek: () => {
        const state = get()
        if (!state.startDate) {
          set({ startDate: new Date().toISOString().split('T')[0] })
        }
        const week = calcCurrentWeek(get().startDate)
        if (week !== get().currentWeek) {
          set({ currentWeek: week })
        }
      },
    }),
    {
      name: 'ironppl_state_v3',
      partialize: (state) => {
        const {
          getLog,
          setLog,
          getHistory,
          getLastSession,
          isDayComplete,
          isDayFinished,
          getCompletedThisWeek,
          getExtraSets,
          addExtraSet,
          getExerciseSwap,
          setExerciseSwap,
          addExerciseToDay,
          removeExerciseFromDay,
          getCardioLog,
          setCardioLog,
          getWorkoutTimer,
          startWorkoutTimer,
          stopWorkoutTimer,
          finishDay,
          getSessionNotes,
          setSessionNotes,
          getExerciseNote,
          setExerciseNote,
          getPinnedNote,
          setPinnedNote,
          setLocale,
          addBodyweight,
          mergeState,
          overwriteState,
          initWeek,
          ...data
        } = state
        return data
      },
    }
  )
)

export function getEffectiveProgram(dayIdx: number) {
  return getEffectiveProgramForState(useWorkoutStore.getState(), dayIdx)
}

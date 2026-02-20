import type {
  HistoryEntry,
  PersonalRecord,
  WorkoutTimer,
} from '@/lib/store/types'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { getSupabaseClient } from './client'

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error'

export async function syncToSupabase(dayIdx: number) {
  const supabase = getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const state = useWorkoutStore.getState()
  const week = state.currentWeek
  const timerKey = `w${week}-d${dayIdx}`
  const timer = state.workoutTimers[timerKey]
  const prog = getEffectiveProgram(dayIdx)

  const { data: session, error: sessionErr } = await supabase
    .from('sessions')
    .insert({
      user_id: user.id,
      week,
      day_index: dayIdx,
      day_name: prog.day,
      workout_type: prog.type,
      started_at: timer?.startedAt || new Date().toISOString(),
      finished_at: timer?.finishedAt || new Date().toISOString(),
      duration_sec: timer?.duration || 0,
    })
    .select('id')
    .single()

  if (sessionErr || !session) return

  const setRows: {
    user_id: string
    session_id: string
    exercise_index: number
    exercise_name: string
    set_index: number
    weight: number
    reps: number
    is_amrap: boolean
  }[] = []

  prog.exercises.forEach((ex, eIdx) => {
    const totalSets = ex.sets + (state.extraSets[`d${dayIdx}-e${eIdx}`] || 0)
    for (let s = 0; s < totalSets; s++) {
      const log = state.logs[`w${week}-d${dayIdx}-e${eIdx}-s${s}`]
      if (log?.done) {
        setRows.push({
          user_id: user.id,
          session_id: session.id,
          exercise_index: eIdx,
          exercise_name: ex.name,
          set_index: s,
          weight: Number.parseFloat(log.weight) || 0,
          reps: Number.parseInt(log.reps, 10) || 0,
          is_amrap: !!(ex.amrap && s === ex.sets - 1),
        })
      }
    }
  })

  if (setRows.length > 0) {
    await supabase.from('sets').insert(setRows)
  }

  const prUpserts = prog.exercises
    .map((ex, eIdx) => {
      const hKey = `d${dayIdx}-e${eIdx}`
      const pr = state.personalRecords[hKey]
      if (!pr) return null
      const lastHistory = state.history[hKey]?.at(-1)
      return supabase.rpc('upsert_pr', {
        p_user_id: user.id,
        p_day_index: dayIdx,
        p_exercise_index: eIdx,
        p_exercise_name: ex.name,
        p_best_weight: lastHistory?.weight || 0,
        p_best_reps: lastHistory?.reps || 0,
        p_best_volume: pr.volume,
        p_achieved_at: pr.date,
      })
    })
    .filter(Boolean)

  await Promise.allSettled(prUpserts)
}

export async function syncAllToSupabase() {
  const supabase = getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const state = useWorkoutStore.getState()

  const { data: existing } = await supabase
    .from('sessions')
    .select('week, day_index')
    .eq('user_id', user.id)

  const synced = new Set(
    (existing || []).map((s) => `w${s.week}-d${s.day_index}`)
  )

  const toSync: { week: number; dayIdx: number }[] = []
  for (const key of Object.keys(state.finishedDays)) {
    if (!state.finishedDays[key]) continue
    if (synced.has(key)) continue
    const match = key.match(/^w(\d+)-d(\d+)$/)
    if (match) {
      toSync.push({ week: Number(match[1]), dayIdx: Number(match[2]) })
    }
  }

  for (const { week, dayIdx } of toSync) {
    const timerKey = `w${week}-d${dayIdx}`
    const timer = state.workoutTimers[timerKey]
    const prog = getEffectiveProgram(dayIdx)

    const { data: session, error: sessionErr } = await supabase
      .from('sessions')
      .insert({
        user_id: user.id,
        week,
        day_index: dayIdx,
        day_name: prog.day,
        workout_type: prog.type,
        started_at: timer?.startedAt || new Date().toISOString(),
        finished_at: timer?.finishedAt || new Date().toISOString(),
        duration_sec: timer?.duration || 0,
      })
      .select('id')
      .single()

    if (sessionErr || !session) continue

    const setRows: {
      user_id: string
      session_id: string
      exercise_index: number
      exercise_name: string
      set_index: number
      weight: number
      reps: number
      is_amrap: boolean
    }[] = []

    prog.exercises.forEach((ex, eIdx) => {
      const totalSets =
        ex.sets + (state.extraSets[`w${week}-d${dayIdx}-e${eIdx}`] || 0)
      for (let s = 0; s < totalSets; s++) {
        const log = state.logs[`w${week}-d${dayIdx}-e${eIdx}-s${s}`]
        if (log?.done) {
          setRows.push({
            user_id: user.id,
            session_id: session.id,
            exercise_index: eIdx,
            exercise_name: ex.name,
            set_index: s,
            weight: Number.parseFloat(log.weight) || 0,
            reps: Number.parseInt(log.reps, 10) || 0,
            is_amrap: !!(ex.amrap && s === ex.sets - 1),
          })
        }
      }
    })

    if (setRows.length > 0) {
      await supabase.from('sets').insert(setRows)
    }
  }
}

export async function pullFromSupabase() {
  const supabase = getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const [sessionsRes, setsRes, prsRes] = await Promise.all([
    supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('started_at'),
    supabase.from('sets').select('*').eq('user_id', user.id),
    supabase.from('personal_records').select('*').eq('user_id', user.id),
  ])

  const sessions = sessionsRes.data || []
  const sets = setsRes.data || []
  const prs = prsRes.data || []

  const cloudHistory: Record<string, HistoryEntry[]> = {}
  const cloudFinished: Record<string, boolean> = {}
  const cloudTimers: Record<string, WorkoutTimer> = {}
  const cloudPRs: Record<string, PersonalRecord> = {}

  const setsBySession: Record<string, typeof sets> = {}
  for (const s of sets) {
    if (!setsBySession[s.session_id]) setsBySession[s.session_id] = []
    setsBySession[s.session_id].push(s)
  }

  for (const sess of sessions) {
    const key = `w${sess.week}-d${sess.day_index}`
    cloudFinished[key] = true
    cloudTimers[key] = {
      startedAt: sess.started_at,
      finishedAt: sess.finished_at,
      duration: sess.duration_sec || 0,
    }

    const sessionSets = setsBySession[sess.id] || []
    const grouped: Record<number, { weight: number; reps: number }[]> = {}
    for (const s of sessionSets) {
      if (!grouped[s.exercise_index]) grouped[s.exercise_index] = []
      grouped[s.exercise_index].push({ weight: s.weight, reps: s.reps })
    }

    for (const [eIdxStr, exSets] of Object.entries(grouped)) {
      const hKey = `d${sess.day_index}-e${eIdxStr}`
      if (!cloudHistory[hKey]) cloudHistory[hKey] = []
      const maxSet = exSets.reduce(
        (best, s) => (s.weight > best.weight ? s : best),
        exSets[0]
      )
      cloudHistory[hKey].push({
        week: sess.week,
        weight: maxSet.weight,
        reps: maxSet.reps,
        date: sess.started_at,
        sets: exSets,
      })
    }
  }

  for (const pr of prs) {
    const key = `d${pr.day_index}-e${pr.exercise_index}`
    cloudPRs[key] = { volume: pr.best_volume, date: pr.achieved_at }
  }

  for (const key of Object.keys(cloudHistory)) {
    cloudHistory[key] = cloudHistory[key].slice(-12)
  }

  const state = useWorkoutStore.getState()
  const merged = {
    history: { ...state.history },
    finishedDays: { ...state.finishedDays, ...cloudFinished },
    workoutTimers: { ...state.workoutTimers, ...cloudTimers },
    personalRecords: { ...state.personalRecords },
    totalSessions: Math.max(state.totalSessions, sessions.length),
  }

  for (const [key, entries] of Object.entries(cloudHistory)) {
    const existing = merged.history[key] || []
    const byWeek = new Map<number, HistoryEntry>()
    for (const e of existing) byWeek.set(e.week, e)
    for (const e of entries) byWeek.set(e.week, e)
    merged.history[key] = Array.from(byWeek.values())
      .sort((a, b) => a.week - b.week)
      .slice(-12)
  }

  for (const [key, pr] of Object.entries(cloudPRs)) {
    const existing = merged.personalRecords[key]
    if (!existing || pr.volume > existing.volume) {
      merged.personalRecords[key] = pr
    }
  }

  useWorkoutStore.setState(merged)
}

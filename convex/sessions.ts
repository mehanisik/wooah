import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import type { Id } from './_generated/dataModel'
import type { MutationCtx } from './_generated/server'
import { mutation, query } from './_generated/server'

export const getByWeek = query({
  args: { week: v.number() },
  handler: async (ctx, { week }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('sessions')
      .withIndex('by_user_week', (q) => q.eq('userId', userId).eq('week', week))
      .collect()
  },
})

export const getByWeekRange = query({
  args: { fromWeek: v.number(), toWeek: v.number() },
  handler: async (ctx, { fromWeek, toWeek }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    const all = await ctx.db
      .query('sessions')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
    return all.filter((s) => s.week >= fromWeek && s.week <= toWeek)
  },
})

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('sessions')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  },
})

export const getByWeekAndDay = query({
  args: { week: v.number(), dayIndex: v.number() },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return null
    return ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()
  },
})

export const startTimer = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
    sessionType: v.optional(
      v.union(v.literal('program'), v.literal('freestyle'))
    ),
  },
  handler: async (ctx, { week, dayIndex, sessionType }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()

    if (existing) {
      const patch: Record<string, string> = {}
      if (!existing.startedAt) {
        patch.startedAt = new Date().toISOString()
      }
      if (sessionType && !existing.sessionType) {
        patch.sessionType = sessionType
      }
      if (Object.keys(patch).length > 0) {
        await ctx.db.patch(existing._id, patch)
      }
      return existing._id
    }

    return ctx.db.insert('sessions', {
      userId,
      week,
      dayIndex,
      startedAt: new Date().toISOString(),
      ...(sessionType ? { sessionType } : {}),
    })
  },
})

/** Resolve exercise name for a given session+exerciseIndex */
async function resolveExerciseName(
  ctx: MutationCtx,
  userId: Id<'users'>,
  session: { sessionType?: string; dayIndex: number },
  exerciseIndex: number
): Promise<string | null> {
  if (session.sessionType === 'freestyle') {
    // Look up from freestyleExercises
    const freestyleExs = await ctx.db
      .query('freestyleExercises')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
    const match = freestyleExs.find(
      (e) => e.exerciseIndex === exerciseIndex
    )
    return match?.name ?? null
  }

  // Program workout — look up from programTemplates via userPreferences
  const prefs = await ctx.db
    .query('userPreferences')
    .withIndex('by_user', (q) => q.eq('userId', userId))
    .unique()
  if (!prefs) return null

  const template = await ctx.db
    .query('programTemplates')
    .withIndex('by_programId', (q) =>
      q.eq('programId', prefs.activeProgramId)
    )
    .first()
  if (!template) return null

  const days = template.days as Array<{
    exercises: Array<{ name: string }>
  }>
  const day = days[session.dayIndex]
  if (!day) return null

  return day.exercises[exerciseIndex]?.name ?? null
}

/** Persist history, personal records, and 1RM data for all completed sets in a session */
async function persistWorkoutData(
  ctx: MutationCtx,
  userId: Id<'users'>,
  session: {
    week: number
    dayIndex: number
    sessionType?: string
  }
) {
  const { week, dayIndex } = session
  const date = new Date().toISOString().split('T')[0]

  // Get all completed sets for this session
  const allSets = await ctx.db
    .query('sets')
    .withIndex('by_user_week_day', (q) =>
      q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
    )
    .collect()

  const doneSets = allSets.filter((s) => s.done)
  if (doneSets.length === 0) return

  // Group by exerciseIndex
  const byExercise = new Map<
    number,
    Array<{ weight: number; reps: number }>
  >()
  for (const s of doneSets) {
    const w = Number.parseFloat(String(s.weight)) || 0
    const r = Number.parseInt(String(s.reps), 10) || 0
    if (w === 0 && r === 0) continue
    const group = byExercise.get(s.exerciseIndex) ?? []
    group.push({ weight: w, reps: r })
    byExercise.set(s.exerciseIndex, group)
  }

  for (const [exerciseIndex, sets] of byExercise) {
    const exerciseName = await resolveExerciseName(
      ctx,
      userId,
      session,
      exerciseIndex
    )
    if (!exerciseName) continue

    const bestWeight = Math.max(...sets.map((s) => s.weight))
    const bestReps = Math.max(...sets.map((s) => s.reps))
    const bestVolume = sets.reduce((sum, s) => sum + s.weight * s.reps, 0)
    const detailedSets = sets.map((s) => ({
      weight: s.weight,
      reps: s.reps,
    }))

    // Upsert history (same logic as history.add)
    const existingHistory = await ctx.db
      .query('history')
      .withIndex('by_user_day_exercise', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .filter((q) =>
        q.and(
          q.eq(q.field('week'), week),
          q.eq(q.field('date'), date)
        )
      )
      .first()

    if (existingHistory) {
      await ctx.db.patch(existingHistory._id, {
        weight: bestWeight,
        reps: bestReps,
        detailedSets,
      })
    } else {
      await ctx.db.insert('history', {
        userId,
        dayIndex,
        exerciseIndex,
        week,
        weight: bestWeight,
        reps: bestReps,
        date,
        detailedSets,
      })
    }

    // Upsert personal records (only if new volume is higher)
    const existingPR = await ctx.db
      .query('personalRecords')
      .withIndex('by_user_exercise', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .unique()

    if (existingPR) {
      if (bestVolume > existingPR.bestVolume) {
        await ctx.db.patch(existingPR._id, {
          exerciseName,
          bestVolume,
          bestWeight,
          bestReps,
          achievedAt: new Date().toISOString(),
        })
      }
    } else {
      await ctx.db.insert('personalRecords', {
        userId,
        dayIndex,
        exerciseIndex,
        exerciseName,
        bestVolume,
        bestWeight,
        bestReps,
        achievedAt: new Date().toISOString(),
      })
    }

    // 1RM via Epley formula for the set with highest reps (AMRAP candidate)
    const amrapSet = sets.reduce((best, s) =>
      s.reps > best.reps ? s : best
    )
    if (amrapSet.weight > 0 && amrapSet.reps > 1) {
      const oneRm = Math.round(
        amrapSet.weight * (1 + amrapSet.reps / 30)
      )
      await ctx.db.insert('oneRmHistory', {
        userId,
        dayIndex,
        exerciseIndex,
        date,
        value: oneRm,
        week,
      })
    }
  }
}

export const finishDay = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
  },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()

    const now = new Date().toISOString()

    let sessionId: Id<'sessions'>
    let sessionType: string | undefined

    if (existing) {
      const pausedSec = existing.pausedDurationSec ?? 0
      const activeSec = existing.startedAt
        ? Math.round(
            (Date.now() - new Date(existing.startedAt).getTime()) / 1000
          )
        : 0
      await ctx.db.patch(existing._id, {
        finishedAt: now,
        durationSec: pausedSec + activeSec,
      })
      sessionId = existing._id
      sessionType = existing.sessionType
    } else {
      sessionId = await ctx.db.insert('sessions', {
        userId,
        week,
        dayIndex,
        finishedAt: now,
        durationSec: 0,
      })
    }

    await persistWorkoutData(ctx, userId, { week, dayIndex, sessionType })
    return sessionId
  },
})

export const finishById = mutation({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, { sessionId }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const session = await ctx.db.get(sessionId)
    if (!session || session.userId !== userId)
      throw new Error('Session not found')

    // Idempotent: don't overwrite if already finished
    if (session.finishedAt) return sessionId

    const now = new Date().toISOString()
    const pausedSec = session.pausedDurationSec ?? 0
    const activeSec = session.startedAt
      ? Math.round(
          (Date.now() - new Date(session.startedAt).getTime()) / 1000
        )
      : 0
    await ctx.db.patch(sessionId, {
      finishedAt: now,
      durationSec: pausedSec + activeSec,
    })

    await persistWorkoutData(ctx, userId, {
      week: session.week,
      dayIndex: session.dayIndex,
      sessionType: session.sessionType,
    })
    return sessionId
  },
})

export const setNotes = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
    notes: v.object({
      energy: v.optional(v.string()),
      sleep: v.optional(v.string()),
      mood: v.optional(v.string()),
      soreness: v.optional(v.string()),
      rating: v.optional(v.number()),
      text: v.optional(v.string()),
    }),
  },
  handler: async (ctx, { week, dayIndex, notes }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()

    if (existing) {
      const merged = { ...(existing.notes ?? {}), ...notes }
      await ctx.db.patch(existing._id, { notes: merged })
      return existing._id
    }

    return ctx.db.insert('sessions', {
      userId,
      week,
      dayIndex,
      notes,
    })
  },
})

export const reopenSession = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
  },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const session = await ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()

    if (!session) throw new Error('Session not found')
    if (!session.finishedAt) return session._id

    // Store accumulated duration, reset clock
    await ctx.db.patch(session._id, {
      pausedDurationSec: session.durationSec ?? 0,
      startedAt: new Date().toISOString(),
      finishedAt: undefined,
      durationSec: undefined,
    })
    return session._id
  },
})

export const cancelSession = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
  },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    // Delete session
    const session = await ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()
    if (session) {
      if (session.finishedAt) throw new Error('Cannot cancel a finished session')
      await ctx.db.delete(session._id)
    }

    // Delete sets
    const sets = await ctx.db
      .query('sets')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
    for (const s of sets) await ctx.db.delete(s._id)

    // Delete extra sets
    const extras = await ctx.db
      .query('extraSets')
      .withIndex('by_user_week_day_ex', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
    for (const e of extras) await ctx.db.delete(e._id)

    // Delete cardio logs
    const cardio = await ctx.db
      .query('cardioLogs')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
    for (const c of cardio) await ctx.db.delete(c._id)

    // Delete exercise notes
    const notes = await ctx.db
      .query('exerciseNotes')
      .withIndex('by_user_week_day_ex', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
    for (const n of notes) await ctx.db.delete(n._id)
  },
})

export const count = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return 0
    const all = await ctx.db
      .query('sessions')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
    return all.filter((s) => s.finishedAt).length
  },
})

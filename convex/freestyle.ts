import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createSession = mutation({
  args: { week: v.number() },
  handler: async (ctx, { week }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    // Count existing freestyle sessions this week to generate negative dayIndex
    const weekSessions = await ctx.db
      .query('sessions')
      .withIndex('by_user_week', (q) =>
        q.eq('userId', userId).eq('week', week)
      )
      .collect()

    const freestyleIndices = weekSessions
      .filter((s) => s.sessionType === 'freestyle')
      .map((s) => s.dayIndex)

    const dayIndex =
      freestyleIndices.length > 0 ? Math.min(...freestyleIndices) - 1 : -1

    const sessionId = await ctx.db.insert('sessions', {
      userId,
      week,
      dayIndex,
      sessionType: 'freestyle',
      startedAt: new Date().toISOString(),
    })

    return { sessionId, dayIndex }
  },
})

export const addExercise = mutation({
  args: {
    sessionId: v.id('sessions'),
    name: v.string(),
    equipment: v.optional(v.string()),
    targetSets: v.number(),
    targetReps: v.optional(v.string()),
    rest: v.optional(v.number()),
  },
  handler: async (ctx, { sessionId, name, equipment, targetSets, targetReps, rest }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const session = await ctx.db.get(sessionId)
    if (!session || session.userId !== userId)
      throw new Error('Session not found')
    if (session.sessionType !== 'freestyle')
      throw new Error('Not a freestyle session')

    // Get current max exerciseIndex
    const existing = await ctx.db
      .query('freestyleExercises')
      .withIndex('by_session', (q) => q.eq('sessionId', sessionId))
      .collect()

    const nextIndex =
      existing.length > 0
        ? Math.max(...existing.map((e) => e.exerciseIndex)) + 1
        : 0

    return ctx.db.insert('freestyleExercises', {
      userId,
      sessionId,
      exerciseIndex: nextIndex,
      name,
      equipment,
      targetSets,
      targetReps,
      rest,
    })
  },
})

export const removeExercise = mutation({
  args: { exerciseId: v.id('freestyleExercises') },
  handler: async (ctx, { exerciseId }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const exercise = await ctx.db.get(exerciseId)
    if (!exercise || exercise.userId !== userId)
      throw new Error('Exercise not found')

    const sessionId = exercise.sessionId
    const removedIndex = exercise.exerciseIndex

    await ctx.db.delete(exerciseId)

    // Reindex remaining exercises
    const remaining = await ctx.db
      .query('freestyleExercises')
      .withIndex('by_session', (q) => q.eq('sessionId', sessionId))
      .collect()

    const toReindex = remaining
      .filter((e) => e.exerciseIndex > removedIndex)
      .sort((a, b) => a.exerciseIndex - b.exerciseIndex)

    for (const ex of toReindex) {
      await ctx.db.patch(ex._id, { exerciseIndex: ex.exerciseIndex - 1 })
    }
  },
})

export const getExercises = query({
  args: { sessionId: v.id('sessions') },
  handler: async (ctx, { sessionId }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []

    // Validate session ownership upfront
    const session = await ctx.db.get(sessionId)
    if (!session || session.userId !== userId) return []

    const exercises = await ctx.db
      .query('freestyleExercises')
      .withIndex('by_session', (q) => q.eq('sessionId', sessionId))
      .collect()

    return exercises.sort((a, b) => a.exerciseIndex - b.exerciseIndex)
  },
})

export const getActiveSession = query({
  args: { week: v.number() },
  handler: async (ctx, { week }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return null

    const weekSessions = await ctx.db
      .query('sessions')
      .withIndex('by_user_week', (q) =>
        q.eq('userId', userId).eq('week', week)
      )
      .collect()

    // Find most recent freestyle session that is not finished
    const active = weekSessions
      .filter((s) => s.sessionType === 'freestyle' && !s.finishedAt)
      .sort((a, b) => (b.startedAt ?? '').localeCompare(a.startedAt ?? ''))

    return active[0] ?? null
  },
})

export const getFreestyleSessions = query({
  args: { week: v.number() },
  handler: async (ctx, { week }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []

    const weekSessions = await ctx.db
      .query('sessions')
      .withIndex('by_user_week', (q) =>
        q.eq('userId', userId).eq('week', week)
      )
      .collect()

    return weekSessions.filter((s) => s.sessionType === 'freestyle')
  },
})

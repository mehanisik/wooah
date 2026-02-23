import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('personalRecords')
      .withIndex('by_user_exercise', (q) => q.eq('userId', userId))
      .collect()
  },
})

export const upsert = mutation({
  args: {
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    exerciseName: v.string(),
    bestVolume: v.number(),
    bestWeight: v.optional(v.number()),
    bestReps: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('personalRecords')
      .withIndex('by_user_exercise', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', args.dayIndex)
          .eq('exerciseIndex', args.exerciseIndex)
      )
      .unique()

    const now = new Date().toISOString()

    if (existing) {
      if (args.bestVolume > existing.bestVolume) {
        await ctx.db.patch(existing._id, {
          exerciseName: args.exerciseName,
          bestVolume: args.bestVolume,
          bestWeight: args.bestWeight,
          bestReps: args.bestReps,
          achievedAt: now,
        })
      }
      return existing._id
    }

    return ctx.db.insert('personalRecords', {
      userId,
      dayIndex: args.dayIndex,
      exerciseIndex: args.exerciseIndex,
      exerciseName: args.exerciseName,
      bestVolume: args.bestVolume,
      bestWeight: args.bestWeight,
      bestReps: args.bestReps,
      achievedAt: now,
    })
  },
})

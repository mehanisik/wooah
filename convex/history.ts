import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByDayAndExercise = query({
  args: { dayIndex: v.number(), exerciseIndex: v.number() },
  handler: async (ctx, { dayIndex, exerciseIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('history')
      .withIndex('by_user_day_exercise', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .collect()
  },
})

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('history')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  },
})

export const add = mutation({
  args: {
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    week: v.number(),
    weight: v.number(),
    reps: v.number(),
    date: v.string(),
    detailedSets: v.optional(
      v.array(v.object({ weight: v.number(), reps: v.number() }))
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('history')
      .withIndex('by_user_day_exercise', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', args.dayIndex)
          .eq('exerciseIndex', args.exerciseIndex)
      )
      .filter((q) =>
        q.and(
          q.eq(q.field('week'), args.week),
          q.eq(q.field('date'), args.date)
        )
      )
      .first()

    if (existing) {
      await ctx.db.patch(existing._id, {
        weight: args.weight,
        reps: args.reps,
        detailedSets: args.detailedSets,
      })
      return existing._id
    }

    return ctx.db.insert('history', {
      userId,
      dayIndex: args.dayIndex,
      exerciseIndex: args.exerciseIndex,
      week: args.week,
      weight: args.weight,
      reps: args.reps,
      date: args.date,
      detailedSets: args.detailedSets,
    })
  },
})

import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByWeekAndDay = query({
  args: { week: v.number(), dayIndex: v.number() },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('sets')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
  },
})

export const getByUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('sets')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  },
})

export const upsert = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    setIndex: v.number(),
    weight: v.string(),
    reps: v.string(),
    done: v.boolean(),
    isExtra: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('sets')
      .withIndex('by_user_week_day', (q) =>
        q
          .eq('userId', userId)
          .eq('week', args.week)
          .eq('dayIndex', args.dayIndex)
      )
      .collect()

    const match = existing.find(
      (s) =>
        s.exerciseIndex === args.exerciseIndex && s.setIndex === args.setIndex
    )

    if (match) {
      await ctx.db.patch(match._id, {
        weight: args.weight,
        reps: args.reps,
        done: args.done,
        isExtra: args.isExtra,
      })
      return match._id
    }

    return ctx.db.insert('sets', {
      userId,
      week: args.week,
      dayIndex: args.dayIndex,
      exerciseIndex: args.exerciseIndex,
      setIndex: args.setIndex,
      weight: args.weight,
      reps: args.reps,
      done: args.done,
      isExtra: args.isExtra,
    })
  },
})

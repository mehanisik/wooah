import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('oneRmHistory')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .order('desc')
      .take(500)
  },
})

export const add = mutation({
  args: {
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    date: v.string(),
    value: v.number(),
    week: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    return ctx.db.insert('oneRmHistory', {
      userId,
      dayIndex: args.dayIndex,
      exerciseIndex: args.exerciseIndex,
      date: args.date,
      value: args.value,
      week: args.week,
    })
  },
})

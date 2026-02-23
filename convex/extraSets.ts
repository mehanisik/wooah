import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: { week: v.number(), dayIndex: v.number(), exerciseIndex: v.number() },
  handler: async (ctx, { week, dayIndex, exerciseIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return 0
    const entry = await ctx.db
      .query('extraSets')
      .withIndex('by_user_week_day_ex', (q) =>
        q
          .eq('userId', userId)
          .eq('week', week)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .unique()
    return entry?.count ?? 0
  },
})

export const getByWeekAndDay = query({
  args: { week: v.number(), dayIndex: v.number() },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('extraSets')
      .withIndex('by_user_week_day_ex', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
  },
})

export const add = mutation({
  args: { week: v.number(), dayIndex: v.number(), exerciseIndex: v.number() },
  handler: async (ctx, { week, dayIndex, exerciseIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('extraSets')
      .withIndex('by_user_week_day_ex', (q) =>
        q
          .eq('userId', userId)
          .eq('week', week)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, { count: existing.count + 1 })
      return existing._id
    }

    return ctx.db.insert('extraSets', {
      userId,
      week,
      dayIndex,
      exerciseIndex,
      count: 1,
    })
  },
})

import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getByWeekAndDay = query({
  args: { week: v.number(), dayIndex: v.number() },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('cardioLogs')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .collect()
  },
})

export const set = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
    itemIndex: v.number(),
    done: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('cardioLogs')
      .withIndex('by_user_week_day', (q) =>
        q
          .eq('userId', userId)
          .eq('week', args.week)
          .eq('dayIndex', args.dayIndex)
      )
      .collect()

    const match = existing.find((c) => c.itemIndex === args.itemIndex)

    if (match) {
      await ctx.db.patch(match._id, { done: args.done })
      return match._id
    }

    return ctx.db.insert('cardioLogs', {
      userId,
      week: args.week,
      dayIndex: args.dayIndex,
      itemIndex: args.itemIndex,
      done: args.done,
    })
  },
})

import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    return ctx.db
      .query('bodyweightEntries')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
  },
})

export const add = mutation({
  args: { weight: v.number(), date: v.optional(v.string()) },
  handler: async (ctx, { weight, date: clientDate }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const date = clientDate ?? new Date().toISOString().split('T')[0]
    const existing = await ctx.db
      .query('bodyweightEntries')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('date'), date))
      .unique()

    if (existing) {
      await ctx.db.patch(existing._id, { weight })
      return existing._id
    }
    return ctx.db.insert('bodyweightEntries', { userId, date, weight })
  },
})

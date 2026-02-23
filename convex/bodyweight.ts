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
  args: { weight: v.number() },
  handler: async (ctx, { weight }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    return ctx.db.insert('bodyweightEntries', {
      userId,
      date: new Date().toISOString().split('T')[0],
      weight,
    })
  },
})

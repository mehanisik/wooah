import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
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
  args: { week: v.number(), dayIndex: v.number() },
  handler: async (ctx, { week, dayIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('sessions')
      .withIndex('by_user_week_day', (q) =>
        q.eq('userId', userId).eq('week', week).eq('dayIndex', dayIndex)
      )
      .unique()

    if (existing) {
      if (!existing.startedAt) {
        await ctx.db.patch(existing._id, {
          startedAt: new Date().toISOString(),
        })
      }
      return existing._id
    }

    return ctx.db.insert('sessions', {
      userId,
      week,
      dayIndex,
      startedAt: new Date().toISOString(),
    })
  },
})

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

    if (existing) {
      const duration = existing.startedAt
        ? Math.round(
            (Date.now() - new Date(existing.startedAt).getTime()) / 1000
          )
        : 0
      await ctx.db.patch(existing._id, {
        finishedAt: now,
        durationSec: duration,
      })
      return existing._id
    }

    return ctx.db.insert('sessions', {
      userId,
      week,
      dayIndex,
      finishedAt: now,
      durationSec: 0,
    })
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

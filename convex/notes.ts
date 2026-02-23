import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getExerciseNote = query({
  args: { week: v.number(), dayIndex: v.number(), exerciseIndex: v.number() },
  handler: async (ctx, { week, dayIndex, exerciseIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return null
    return ctx.db
      .query('exerciseNotes')
      .withIndex('by_user_week_day_ex', (q) =>
        q
          .eq('userId', userId)
          .eq('week', week)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .unique()
  },
})

export const setExerciseNote = mutation({
  args: {
    week: v.number(),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('exerciseNotes')
      .withIndex('by_user_week_day_ex', (q) =>
        q
          .eq('userId', userId)
          .eq('week', args.week)
          .eq('dayIndex', args.dayIndex)
          .eq('exerciseIndex', args.exerciseIndex)
      )
      .unique()

    if (existing) {
      if (args.note === '') {
        await ctx.db.delete(existing._id)
      } else {
        await ctx.db.patch(existing._id, { note: args.note })
      }
      return existing._id
    }

    if (args.note === '') return null
    return ctx.db.insert('exerciseNotes', {
      userId,
      week: args.week,
      dayIndex: args.dayIndex,
      exerciseIndex: args.exerciseIndex,
      note: args.note,
    })
  },
})

export const getPinnedNote = query({
  args: { dayIndex: v.number(), exerciseIndex: v.number() },
  handler: async (ctx, { dayIndex, exerciseIndex }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return null
    return ctx.db
      .query('pinnedNotes')
      .withIndex('by_user_day_ex', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', dayIndex)
          .eq('exerciseIndex', exerciseIndex)
      )
      .unique()
  },
})

export const setPinnedNote = mutation({
  args: {
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('pinnedNotes')
      .withIndex('by_user_day_ex', (q) =>
        q
          .eq('userId', userId)
          .eq('dayIndex', args.dayIndex)
          .eq('exerciseIndex', args.exerciseIndex)
      )
      .unique()

    if (existing) {
      if (args.note === '') {
        await ctx.db.delete(existing._id)
      } else {
        await ctx.db.patch(existing._id, { note: args.note })
      }
      return existing._id
    }

    if (args.note === '') return null
    return ctx.db.insert('pinnedNotes', {
      userId,
      dayIndex: args.dayIndex,
      exerciseIndex: args.exerciseIndex,
      note: args.note,
    })
  },
})

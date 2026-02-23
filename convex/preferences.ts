import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return null
    const prefs = await ctx.db
      .query('userPreferences')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .unique()
    return prefs
  },
})

export const upsert = mutation({
  args: {
    locale: v.optional(v.string()),
    activeProgramId: v.optional(v.string()),
    trainingDays: v.optional(v.array(v.number())),
    startDate: v.optional(v.string()),
    plateSettings: v.optional(
      v.object({
        barWeight: v.number(),
        unit: v.union(v.literal('kg'), v.literal('lbs')),
        plates: v.optional(v.array(v.number())),
      })
    ),
    mesocycleConfig: v.optional(
      v.object({
        length: v.number(),
        deloadLength: v.number(),
        startWeek: v.optional(v.union(v.number(), v.null())),
        rampRate: v.number(),
      })
    ),
    exerciseSwaps: v.optional(v.any()),
    swapFrequency: v.optional(v.any()),
    programOverrides: v.optional(v.any()),
    deloadDismissed: v.optional(v.union(v.number(), v.null())),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('userPreferences')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .unique()

    const updates: Record<string, unknown> = {}
    for (const [k, val] of Object.entries(args)) {
      if (val !== undefined) updates[k] = val
    }

    if (existing) {
      await ctx.db.patch(existing._id, updates)
      return existing._id
    }

    return ctx.db.insert('userPreferences', {
      userId,
      locale: (args.locale as string) ?? 'en',
      activeProgramId: (args.activeProgramId as string) ?? 'wooah-ppl',
      trainingDays: args.trainingDays ?? [0, 1, 2, 3, 4, 5],
      startDate: args.startDate,
      plateSettings: args.plateSettings ?? {
        barWeight: 20,
        unit: 'kg' as const,
      },
      mesocycleConfig: args.mesocycleConfig ?? {
        length: 6,
        deloadLength: 1,
        startWeek: null,
        rampRate: 1,
      },
      exerciseSwaps: args.exerciseSwaps ?? {},
      swapFrequency: args.swapFrequency ?? {},
      programOverrides: args.programOverrides ?? {},
      deloadDismissed: args.deloadDismissed ?? null,
    })
  },
})

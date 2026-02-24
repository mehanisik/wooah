import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { internalMutation, mutation, query } from './_generated/server'

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)

    const globals = await ctx.db
      .query('programTemplates')
      .withIndex('by_global', (q) => q.eq('isGlobal', true))
      .collect()

    if (!userId) return globals

    const userPrograms = await ctx.db
      .query('programTemplates')
      .withIndex('by_user', (q) => q.eq('createdBy', userId))
      .collect()

    return [...globals, ...userPrograms]
  },
})

export const getByProgramId = query({
  args: { programId: v.string() },
  handler: async (ctx, { programId }) => {
    return ctx.db
      .query('programTemplates')
      .withIndex('by_programId', (q) => q.eq('programId', programId))
      .first()
  },
})

export const create = mutation({
  args: {
    programId: v.string(),
    name: v.string(),
    author: v.optional(v.string()),
    gender: v.string(),
    difficulty: v.string(),
    daysPerWeek: v.number(),
    description: v.string(),
    tags: v.array(v.string()),
    days: v.any(),
    defaultRestDays: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const existing = await ctx.db
      .query('programTemplates')
      .withIndex('by_programId', (q) => q.eq('programId', args.programId))
      .first()
    if (existing) throw new Error(`Program "${args.programId}" already exists`)

    return ctx.db.insert('programTemplates', {
      ...args,
      isGlobal: false,
      createdBy: userId,
    })
  },
})

export const fork = mutation({
  args: {
    sourceProgramId: v.string(),
    newProgramId: v.string(),
    newName: v.string(),
  },
  handler: async (ctx, { sourceProgramId, newProgramId, newName }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const source = await ctx.db
      .query('programTemplates')
      .withIndex('by_programId', (q) => q.eq('programId', sourceProgramId))
      .first()
    if (!source) throw new Error(`Program "${sourceProgramId}" not found`)

    const existing = await ctx.db
      .query('programTemplates')
      .withIndex('by_programId', (q) => q.eq('programId', newProgramId))
      .first()
    if (existing) throw new Error(`Program "${newProgramId}" already exists`)

    return ctx.db.insert('programTemplates', {
      programId: newProgramId,
      name: newName,
      author: source.author,
      gender: source.gender,
      difficulty: source.difficulty,
      daysPerWeek: source.daysPerWeek,
      description: source.description,
      tags: source.tags,
      days: source.days,
      defaultRestDays: source.defaultRestDays,
      isGlobal: false,
      createdBy: userId,
      forkedFrom: sourceProgramId,
    })
  },
})

export const update = mutation({
  args: {
    programId: v.string(),
    name: v.optional(v.string()),
    author: v.optional(v.string()),
    gender: v.optional(v.string()),
    difficulty: v.optional(v.string()),
    daysPerWeek: v.optional(v.number()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    days: v.optional(v.any()),
    defaultRestDays: v.optional(v.array(v.number())),
  },
  handler: async (ctx, { programId, ...updates }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const program = await ctx.db
      .query('programTemplates')
      .withIndex('by_programId', (q) => q.eq('programId', programId))
      .first()
    if (!program) throw new Error(`Program "${programId}" not found`)

    if (
      program.isGlobal ||
      (program.createdBy && program.createdBy !== userId)
    ) {
      throw new Error('Cannot edit a program you do not own')
    }

    const filtered = Object.fromEntries(
      Object.entries(updates).filter(([, val]) => val !== undefined)
    )

    await ctx.db.patch(program._id, filtered)
  },
})

export const remove = mutation({
  args: { programId: v.string() },
  handler: async (ctx, { programId }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const program = await ctx.db
      .query('programTemplates')
      .withIndex('by_programId', (q) => q.eq('programId', programId))
      .first()
    if (!program) throw new Error(`Program "${programId}" not found`)

    if (
      program.isGlobal ||
      (program.createdBy && program.createdBy !== userId)
    ) {
      throw new Error('Cannot delete a program you do not own')
    }

    await ctx.db.delete(program._id)
  },
})

export const seed = internalMutation({
  args: {
    programs: v.array(
      v.object({
        programId: v.string(),
        name: v.string(),
        author: v.optional(v.string()),
        gender: v.string(),
        difficulty: v.string(),
        daysPerWeek: v.number(),
        description: v.string(),
        tags: v.array(v.string()),
        days: v.any(),
        defaultRestDays: v.array(v.number()),
      })
    ),
  },
  handler: async (ctx, { programs }) => {
    let inserted = 0
    let skipped = 0

    for (const program of programs) {
      const existing = await ctx.db
        .query('programTemplates')
        .withIndex('by_programId', (q) => q.eq('programId', program.programId))
        .first()

      if (existing) {
        skipped++
        continue
      }

      await ctx.db.insert('programTemplates', {
        ...program,
        isGlobal: true,
      })
      inserted++
    }

    return { inserted, skipped, total: programs.length }
  },
})

import { getAuthUserId } from '@convex-dev/auth/server'
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) return []
    const photos = await ctx.db
      .query('photos')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()

    return Promise.all(
      photos.map(async (photo) => ({
        ...photo,
        url: await ctx.storage.getUrl(photo.storageId),
      }))
    )
  },
})

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')
    return ctx.storage.generateUploadUrl()
  },
})

export const save = mutation({
  args: {
    storageId: v.id('_storage'),
    week: v.number(),
    dayIndex: v.optional(v.number()),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    return ctx.db.insert('photos', {
      userId,
      storageId: args.storageId,
      week: args.week,
      dayIndex: args.dayIndex,
      timestamp: args.timestamp,
    })
  },
})

export const remove = mutation({
  args: { photoId: v.id('photos') },
  handler: async (ctx, { photoId }) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error('Not authenticated')

    const photo = await ctx.db.get(photoId)
    if (!photo || photo.userId !== userId) throw new Error('Not found')

    await ctx.storage.delete(photo.storageId)
    await ctx.db.delete(photoId)
  },
})

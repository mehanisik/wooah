import { authTables } from '@convex-dev/auth/server'
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  ...authTables,

  userPreferences: defineTable({
    userId: v.id('users'),
    locale: v.string(),
    activeProgramId: v.string(),
    trainingDays: v.array(v.number()),
    startDate: v.optional(v.string()),
    plateSettings: v.object({
      barWeight: v.number(),
      unit: v.union(v.literal('kg'), v.literal('lbs')),
      plates: v.optional(v.array(v.number())),
    }),
    mesocycleConfig: v.object({
      length: v.number(),
      deloadLength: v.number(),
      startWeek: v.optional(v.union(v.number(), v.null())),
      rampRate: v.number(),
    }),
    exerciseSwaps: v.optional(v.any()),
    swapFrequency: v.optional(v.any()),
    programOverrides: v.optional(v.any()),
    deloadDismissed: v.optional(v.union(v.number(), v.null())),
  }).index('by_user', ['userId']),

  sessions: defineTable({
    userId: v.id('users'),
    week: v.number(),
    dayIndex: v.number(),
    sessionType: v.optional(
      v.union(v.literal('program'), v.literal('freestyle'))
    ),
    startedAt: v.optional(v.string()),
    finishedAt: v.optional(v.string()),
    durationSec: v.optional(v.number()),
    pausedDurationSec: v.optional(v.number()),
    notes: v.optional(
      v.object({
        energy: v.optional(v.string()),
        sleep: v.optional(v.string()),
        mood: v.optional(v.string()),
        soreness: v.optional(v.string()),
        rating: v.optional(v.number()),
        text: v.optional(v.string()),
      })
    ),
  })
    .index('by_user', ['userId'])
    .index('by_user_week', ['userId', 'week'])
    .index('by_user_week_day', ['userId', 'week', 'dayIndex']),

  freestyleExercises: defineTable({
    userId: v.id('users'),
    sessionId: v.id('sessions'),
    exerciseIndex: v.number(),
    name: v.string(),
    equipment: v.optional(v.string()),
    targetSets: v.number(),
    targetReps: v.optional(v.string()),
    rest: v.optional(v.number()),
  })
    .index('by_session', ['sessionId'])
    .index('by_user', ['userId']),

  sets: defineTable({
    userId: v.id('users'),
    sessionId: v.optional(v.id('sessions')),
    week: v.number(),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    setIndex: v.number(),
    weight: v.string(),
    reps: v.string(),
    done: v.boolean(),
    isExtra: v.optional(v.boolean()),
  })
    .index('by_session', ['sessionId'])
    .index('by_user', ['userId'])
    .index('by_user_week_day', ['userId', 'week', 'dayIndex'])
    .index('by_user_day_exercise', ['userId', 'dayIndex', 'exerciseIndex']),

  personalRecords: defineTable({
    userId: v.id('users'),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    exerciseName: v.string(),
    bestWeight: v.optional(v.number()),
    bestReps: v.optional(v.number()),
    bestVolume: v.number(),
    achievedAt: v.string(),
  }).index('by_user_exercise', ['userId', 'dayIndex', 'exerciseIndex']),

  history: defineTable({
    userId: v.id('users'),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    week: v.number(),
    weight: v.number(),
    reps: v.number(),
    date: v.string(),
    detailedSets: v.optional(
      v.array(v.object({ weight: v.number(), reps: v.number() }))
    ),
  })
    .index('by_user_day_exercise', ['userId', 'dayIndex', 'exerciseIndex'])
    .index('by_user', ['userId']),

  cardioLogs: defineTable({
    userId: v.id('users'),
    week: v.number(),
    dayIndex: v.number(),
    itemIndex: v.number(),
    done: v.boolean(),
  }).index('by_user_week_day', ['userId', 'week', 'dayIndex']),

  exerciseNotes: defineTable({
    userId: v.id('users'),
    week: v.number(),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    note: v.string(),
  }).index('by_user_week_day_ex', [
    'userId',
    'week',
    'dayIndex',
    'exerciseIndex',
  ]),

  pinnedNotes: defineTable({
    userId: v.id('users'),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    note: v.string(),
  }).index('by_user_day_ex', ['userId', 'dayIndex', 'exerciseIndex']),

  bodyweightEntries: defineTable({
    userId: v.id('users'),
    date: v.string(),
    weight: v.number(),
  }).index('by_user', ['userId']),

  photos: defineTable({
    userId: v.id('users'),
    storageId: v.id('_storage'),
    week: v.number(),
    dayIndex: v.optional(v.number()),
    timestamp: v.number(),
  }).index('by_user', ['userId']),

  oneRmHistory: defineTable({
    userId: v.id('users'),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    date: v.string(),
    value: v.number(),
    week: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_day_exercise', ['userId', 'dayIndex', 'exerciseIndex']),

  programTemplates: defineTable({
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
    isGlobal: v.boolean(),
    createdBy: v.optional(v.id('users')),
    forkedFrom: v.optional(v.string()),
  })
    .index('by_programId', ['programId'])
    .index('by_global', ['isGlobal'])
    .index('by_user', ['createdBy']),

  extraSets: defineTable({
    userId: v.id('users'),
    week: v.number(),
    dayIndex: v.number(),
    exerciseIndex: v.number(),
    count: v.number(),
  }).index('by_user_week_day_ex', [
    'userId',
    'week',
    'dayIndex',
    'exerciseIndex',
  ]),
})

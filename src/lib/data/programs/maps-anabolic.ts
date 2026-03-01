import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Workout A',
    type: 'full',
    focus:
      'Quad-dominant squat, horizontal press, back thickness, shoulders, and arms',
    warmup:
      '5 min light cardio, then 1-2 warm-up sets of DB squat with light weight. Focus on slow, controlled tempo throughout',
    exercises: [
      {
        name: 'DB Squat',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Hold dumbbells at sides or racked at shoulders. Full depth, control the eccentric',
        alternatives: [
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Leg Press', equipment: 'machine' },
          { name: 'Smith Machine Squat', equipment: 'smith' },
        ],
      },
      {
        name: 'Incline DB Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes: '30-45 deg incline. Stretch at bottom, squeeze at top',
        alternatives: [
          { name: 'Flat DB Press', equipment: 'dumbbell' },
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
        ],
      },
      {
        name: 'DB Row',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'One arm at a time on bench. Pull to hip, squeeze shoulder blade back',
        alternatives: [
          { name: 'Chest-Supported DB Row', equipment: 'dumbbell' },
          { name: 'Barbell Bent-over Row', equipment: 'barbell' },
          { name: 'Machine Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Standing DB Shrug',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes: 'Shrug straight up, hold at top for 1 sec. No rolling',
        alternatives: [
          { name: 'Barbell Shrug', equipment: 'barbell' },
          { name: 'Trap Bar Shrug', equipment: 'barbell' },
          { name: 'Machine Shrug', equipment: 'machine' },
        ],
      },
      {
        name: 'DB Rear Delt Fly',
        equipment: 'dumbbell',
        sets: 2,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        notes:
          'Bent over or chest-supported. Lead with elbows, pinch shoulder blades',
        alternatives: [
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Face Pulls', equipment: 'cable' },
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'DB Lateral Raise',
        equipment: 'dumbbell',
        sets: 2,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        notes:
          'Slight forward lean. Raise to shoulder height, control the negative',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'DB Supinating Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Start neutral grip, supinate (rotate palm up) as you curl. Squeeze at top',
        alternatives: [
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'EZ Bar Curl', equipment: 'ez_bar' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'Weighted Dips',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Add weight via belt or DB between legs. Slight forward lean for chest bias',
        alternatives: [
          { name: 'Close-Grip DB Press', equipment: 'dumbbell' },
          { name: 'Tricep Pushdown', equipment: 'cable' },
          { name: 'Machine Dips', equipment: 'machine' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        notes: 'Full stretch at bottom, pause at top. Slow eccentric',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'DB Calf Raise', equipment: 'dumbbell' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Hanging Leg Raise',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-20',
        rest: 60,
        rir: '1-2',
        notes: 'Dead hang, raise legs to parallel or higher. Avoid swinging',
        alternatives: [
          { name: 'Captain Chair Leg Raise', equipment: 'bodyweight' },
          { name: 'Lying Leg Raise', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Workout B',
    type: 'full',
    focus:
      'Hip-dominant pull, horizontal press, vertical pull, shoulders, and arms',
    warmup:
      '5 min light cardio, then 1-2 warm-up sets of DB sumo deadlift with light weight. Brace core, hinge at hips',
    exercises: [
      {
        name: 'DB Sumo Deadlift',
        equipment: 'dumbbell',
        sets: 3,
        reps: '4-8',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Wide stance, toes out. Hold one heavy DB between legs. Drive through heels',
        alternatives: [
          { name: 'Sumo Barbell Deadlift', equipment: 'barbell' },
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'DB Romanian Deadlift', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Physio Ball Leg Curl',
        equipment: 'bodyweight',
        sets: 1,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        notes:
          'Hips up in bridge, curl ball toward glutes. Slow eccentric back out',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'Lying Leg Curl', equipment: 'machine' },
          { name: 'Slider Leg Curl', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'DB Shrug',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Elevate shoulders straight up, 1 sec hold at top. Heavy weight OK',
        alternatives: [
          { name: 'Barbell Shrug', equipment: 'barbell' },
          { name: 'Trap Bar Shrug', equipment: 'barbell' },
          { name: 'Machine Shrug', equipment: 'machine' },
        ],
      },
      {
        name: 'Flat DB Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Retract scapulae, slight arch. Full stretch at bottom, press to lockout',
        alternatives: [
          { name: 'Flat Barbell Bench Press', equipment: 'barbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor DB Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'DB Pullover',
        equipment: 'dumbbell',
        sets: 1,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Lie across bench, deep stretch overhead. Feel lats and chest expand',
        alternatives: [
          { name: 'Cable Pullover', equipment: 'cable' },
          { name: 'Straight-Arm Pulldown', equipment: 'cable' },
          { name: 'Machine Pullover', equipment: 'machine' },
        ],
      },
      {
        name: 'Chin-Up',
        equipment: 'bodyweight',
        sets: 2,
        reps: '6-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Supinated (underhand) grip. Full dead hang at bottom, chin over bar at top',
        alternatives: [
          { name: 'Lat Pulldown', equipment: 'cable' },
          { name: 'Assisted Chin-Up', equipment: 'machine' },
          { name: 'Band-Assisted Chin-Up', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'DB Shoulder Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Seated or standing. Press overhead to lockout, lower to ear level',
        alternatives: [
          { name: 'Arnold Press', equipment: 'dumbbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Barbell OHP', equipment: 'barbell' },
        ],
      },
      {
        name: 'DB Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Standing, alternating or simultaneous. Full extension at bottom, squeeze at top',
        alternatives: [
          { name: 'EZ Bar Curl', equipment: 'ez_bar' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Hammer Curl', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Close-Grip Push-Up',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Hands narrow, elbows tucked. Add weight plate on back for progression',
        alternatives: [
          { name: 'Diamond Push-Up', equipment: 'bodyweight' },
          { name: 'Tricep Pushdown', equipment: 'cable' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        notes: 'Full stretch at bottom, pause at top. Slow eccentric',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'DB Calf Raise', equipment: 'dumbbell' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Decline Sit-Up',
        equipment: 'bodyweight',
        sets: 3,
        reps: '30-100',
        rest: 60,
        rir: '1-2',
        notes:
          'Decline bench, feet hooked. High rep endurance work, controlled pace',
        alternatives: [
          { name: 'Crunch', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
          { name: 'Ab Wheel Rollout', equipment: 'bodyweight' },
        ],
      },
    ],
  },
]

export const mapsAnabolic: ProgramTemplate = {
  meta: {
    id: 'maps-anabolic',
    name: 'MAPS Anabolic (Phase II)',
    author: 'Mind Pump',
    gender: 'unisex',
    difficulty: 'beginner',
    daysPerWeek: 2,
    description:
      "Phase II of Mind Pump's MAPS Anabolic program. Dumbbell-based 2-day alternating full body split focused on hypertrophy with controlled tempo and progressive overload.",
    tags: ['hypertrophy', 'full body', 'dumbbell'],
  },
  days,
  defaultRestDays: [1, 2, 4, 5, 6],
}

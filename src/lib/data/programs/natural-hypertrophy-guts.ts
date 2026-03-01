import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Upper 1 — Push',
    type: 'upper',
    focus:
      'Heavy pressing with superset pairings for efficiency and metabolic stress',
    warmup:
      'Ramp-up sets of bench press (bar x10, 50% x6, 75% x3), band pull-aparts x15',
    exercises: [
      {
        name: 'Barbell Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '3-5',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Heavy strength work. Full arch, retract scapulae, leg drive. No superset — full rest between sets',
        alternatives: [
          { name: 'Incline Barbell Bench Press', equipment: 'barbell' },
          { name: 'Floor Press', equipment: 'barbell' },
          { name: 'DB Bench Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Dumbbell Pullover',
        equipment: 'dumbbell',
        sets: 3,
        reps: '6-10',
        rest: 60,
        rir: '1-2',
        superset: 3,
        notes:
          'Deep stretch at the bottom, pull with lats and chest. SS with Cable Crunch',
        alternatives: [
          { name: 'Cable Pullover', equipment: 'cable' },
          { name: 'Machine Pullover', equipment: 'machine' },
          { name: 'Straight-Arm Pulldown', equipment: 'cable' },
        ],
      },
      {
        name: 'Cable Crunch',
        equipment: 'cable',
        sets: 3,
        reps: '6-10',
        rest: 90,
        rir: '1-2',
        superset: 2,
        notes:
          'Curl ribcage toward pelvis, squeeze abs hard. SS with DB Pullover',
        alternatives: [
          { name: 'Ab Wheel Rollout', equipment: 'bodyweight' },
          { name: 'Decline Crunch', equipment: 'bodyweight' },
          { name: 'Kneeling Cable Crunch', equipment: 'cable' },
        ],
      },
      {
        name: 'Seated Dumbbell OHP',
        equipment: 'dumbbell',
        sets: 3,
        reps: '6-10',
        rest: 60,
        rir: '1-2',
        compound: true,
        superset: 5,
        notes:
          'Full lockout overhead, controlled descent to ear level. SS with Chin-Up w/ Knee Raise',
        alternatives: [
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Chin-Up w/ Knee Raise',
        equipment: 'bodyweight',
        sets: 3,
        reps: '6-10',
        rest: 90,
        rir: '1-2',
        compound: true,
        superset: 4,
        notes:
          'Supinated grip chin-up, raise knees at the top for core activation. SS with Seated DB OHP',
        alternatives: [
          { name: 'Lat Pulldown', equipment: 'cable' },
          { name: 'Assisted Chin-Up', equipment: 'machine' },
          { name: 'Neutral-Grip Pull-Up', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Close-Hand Push-Up',
        equipment: 'bodyweight',
        sets: 3,
        reps: '25',
        rest: 30,
        rir: '1-2',
        superset: 7,
        notes:
          'High-rep pump finisher. Hands close together, elbows tight. SS with Cable Overhead Tricep Extension',
        alternatives: [
          { name: 'Diamond Push-Up', equipment: 'bodyweight' },
          { name: 'Bench Dips', equipment: 'bodyweight' },
          { name: 'Dip Machine', equipment: 'machine' },
        ],
      },
      {
        name: 'Cable Overhead Tricep Extension',
        equipment: 'cable',
        sets: 3,
        reps: '12',
        rest: 90,
        rir: '1-2',
        superset: 6,
        notes:
          'Long head emphasis. Full stretch overhead, lock out at the bottom. SS with Close-Hand Push-Up',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'DB Overhead Extension', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Neck Extension',
        equipment: 'bodyweight',
        sets: 3,
        reps: '15',
        rest: 60,
        rir: '2-3',
        notes:
          'Use a plate or neck harness. Slow controlled reps, no jerking. Builds posterior neck thickness',
        alternatives: [
          { name: 'Neck Harness Extension', equipment: 'bodyweight' },
          { name: 'Band Neck Extension', equipment: 'bodyweight' },
          { name: '4-Way Neck Machine', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Lower 1',
    type: 'lower',
    focus:
      'Squat-focused lower day with weighted chin-ups and superset pairings for density',
    warmup:
      'Ramp-up sets of squat (bar x10, 50% x6, 75% x3), leg swing x10 each side',
    exercises: [
      {
        name: 'Weighted Chin-Up',
        equipment: 'bodyweight',
        sets: 3,
        reps: '3-5',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Heavy strength work. Add weight via belt. Full dead hang, chin over bar. No superset — full rest',
        alternatives: [
          { name: 'Weighted Pull-Up', equipment: 'bodyweight' },
          { name: 'Lat Pulldown (heavy)', equipment: 'cable' },
          { name: 'Assisted Chin-Up', equipment: 'machine' },
        ],
      },
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '6-10',
        rest: 60,
        rir: '1-2',
        compound: true,
        superset: 3,
        notes:
          'Full depth, brace core, controlled eccentric. SS with Upright Row',
        alternatives: [
          { name: 'Front Squat', equipment: 'barbell' },
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Upright Row',
        equipment: 'barbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        superset: 2,
        notes:
          'Wide grip to target side delts, pull to chest height. SS with BB Squat',
        alternatives: [
          { name: 'Cable Upright Row', equipment: 'cable' },
          { name: 'DB Upright Row', equipment: 'dumbbell' },
          { name: 'DB Lateral Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Leg Press',
        equipment: 'machine',
        sets: 3,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        superset: 5,
        notes:
          'Mid foot placement, full depth without butt wink. SS with Calf Raise',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '15',
        rest: 90,
        rir: '1-2',
        superset: 4,
        notes: 'Full stretch at the bottom, 2s hold at top. SS with Leg Press',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
      {
        name: 'Landmine Oblique Twist',
        equipment: 'barbell',
        sets: 3,
        reps: '12',
        rest: 60,
        rir: '1-2',
        notes:
          'Rotate from the hips, arms extended. Controlled side to side — no momentum',
        alternatives: [
          { name: 'Cable Woodchop', equipment: 'cable' },
          { name: 'Russian Twist', equipment: 'bodyweight' },
          { name: 'Pallof Press', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Upper 2 — Pull',
    type: 'upper',
    focus:
      'Row-focused pulling day with pressing accessories and superset pairings',
    warmup:
      'Light lat pulldown x12, band pull-aparts x15, light DB lateral raise x12',
    exercises: [
      {
        name: 'Kroc Row',
        equipment: 'dumbbell',
        sets: 3,
        reps: '6-10',
        rest: 120,
        rir: '0-1',
        compound: true,
        notes:
          'Heavy single-arm DB row with slight body English allowed. Grip hard, full stretch at bottom. No superset',
        alternatives: [
          { name: 'Barbell Bent-over Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
        ],
      },
      {
        name: 'JM Press',
        equipment: 'barbell',
        sets: 3,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        superset: 3,
        notes:
          'Hybrid between close-grip bench and skull crusher. Lower to chin/neck area. SS with DB Lateral Raise',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'French Press', equipment: 'ez_bar' },
        ],
      },
      {
        name: 'Dumbbell Lateral Raise',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12',
        rest: 90,
        rir: '0-1',
        superset: 2,
        notes:
          'Slight forward lean, lead with elbows, light and strict. SS with JM Press',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Close-Grip Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        compound: true,
        superset: 5,
        notes:
          'Shoulder-width grip, elbows tight. Tricep and inner chest builder. SS with Face Pull',
        alternatives: [
          { name: 'Dip Machine', equipment: 'machine' },
          { name: 'Smith Machine Close-Grip Bench', equipment: 'smith' },
          { name: 'Rope Pushdown', equipment: 'cable' },
        ],
      },
      {
        name: 'Face Pull',
        equipment: 'cable',
        sets: 3,
        reps: '15',
        rest: 90,
        rir: '0-1',
        superset: 4,
        notes:
          'Pull rope to forehead, externally rotate at peak. Shoulder health staple. SS with Close-Grip Bench',
        alternatives: [
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Band Pull-Apart', equipment: 'bodyweight' },
          { name: 'DB Reverse Fly', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Neck Curl',
        equipment: 'bodyweight',
        sets: 3,
        reps: '15',
        rest: 60,
        rir: '2-3',
        notes:
          'Lie face up on bench, curl plate on forehead. Slow controlled reps for anterior neck',
        alternatives: [
          { name: 'Plate Neck Curl', equipment: 'bodyweight' },
          { name: 'Band Neck Flexion', equipment: 'bodyweight' },
          { name: '4-Way Neck Machine', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Lower 2',
    type: 'lower',
    focus:
      'Deadlift-focused lower day with machine work and superset pairings for volume',
    warmup:
      'Ramp-up sets of deadlift (bar x8, 50% x5, 75% x3), hip circles x10 each side',
    exercises: [
      {
        name: 'Barbell Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '3',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Heavy triples. Conventional or sumo — be consistent. Brace hard, hinge at hips. No superset — full rest',
        alternatives: [
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Rack Pull', equipment: 'barbell' },
        ],
      },
      {
        name: 'Smith Machine Squat',
        equipment: 'smith',
        sets: 3,
        reps: '8-12',
        rest: 60,
        rir: '1-2',
        compound: true,
        superset: 3,
        notes:
          'Feet slightly forward for quad emphasis, full depth. SS with Preacher Curl',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Leg Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Preacher Curl',
        equipment: 'ez_bar',
        sets: 4,
        reps: '6-12',
        rest: 90,
        rir: '1-2',
        superset: 2,
        notes:
          'Full stretch at the bottom, squeeze at the top. No momentum. SS with Smith Machine Squat',
        alternatives: [
          { name: 'Machine Preacher Curl', equipment: 'machine' },
          { name: 'Spider Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'Leg Curl',
        equipment: 'machine',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        superset: 5,
        notes:
          'Slow 3s eccentric, full ROM. Curl toes toward shins for stronger contraction. SS with Calf Raise',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'Seated Leg Curl', equipment: 'machine' },
          { name: 'DB Leg Curl', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '15',
        rest: 90,
        rir: '1-2',
        superset: 4,
        notes: 'Full stretch at the bottom, 2s hold at top. SS with Leg Curl',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
      {
        name: 'Hanging Leg Raise',
        equipment: 'bodyweight',
        sets: 3,
        reps: '12',
        rest: 60,
        rir: '1-2',
        notes:
          'Control the swing, curl pelvis up at top. Slow eccentric for maximum lower ab activation',
        alternatives: [
          { name: 'Captain Chair Leg Raise', equipment: 'machine' },
          { name: 'Lying Leg Raise', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
        ],
      },
    ],
  },
]

export const naturalHypertrophyGuts: ProgramTemplate = {
  meta: {
    id: 'natural-hypertrophy-guts',
    name: 'Natural Hypertrophy GUTS',
    author: 'Natural Hypertrophy',
    gender: 'male',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    description:
      'Superset-based 4-day upper/lower program from the GUTS methodology. Pairs heavy compound lifts with antagonist or unrelated movements for training density, time efficiency, and metabolic stress. Includes dedicated neck work.',
    tags: ['hypertrophy', 'strength', 'supersets'],
  },
  days,
  defaultRestDays: [2, 5, 6],
}

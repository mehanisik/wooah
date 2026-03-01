import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Bench / OHP',
    type: 'upper',
    focus: 'T1 Bench Press 9 sets + T2 OHP 8 sets + accessories',
    warmup: '2-3 ramp-up sets of bench press (bar x10, 50% x5, 70% x3)',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 9,
        reps: '1-5',
        rest: 180,
        rir: '0-1',
        amrap: true,
        compound: true,
        notes:
          'T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP',
        alternatives: [
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'DB Bench Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 8,
        reps: '3-8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation',
        alternatives: [
          { name: 'Seated Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes: 'Suggested accessory. Back width balance for pressing volume',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Machine Pulldown', equipment: 'machine' },
        ],
      },
      {
        name: 'Face Pulls',
        equipment: 'cable',
        sets: 3,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes: 'Suggested accessory. Rear delt & shoulder health',
        alternatives: [
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'Reverse Pec Deck', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Squat / Sumo DL',
    type: 'lower',
    focus: 'T1 Squat 9 sets + T2 Sumo Deadlift 8 sets + accessories',
    warmup: '2-3 ramp-up sets of squat (bar x10, 50% x5, 70% x3)',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 9,
        reps: '1-5',
        rest: 180,
        rir: '0-1',
        amrap: true,
        compound: true,
        notes:
          'T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Front Squat', equipment: 'barbell' },
        ],
      },
      {
        name: 'Sumo Deadlift',
        equipment: 'barbell',
        sets: 8,
        reps: '3-8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation',
        alternatives: [
          { name: 'Conventional Deadlift', equipment: 'barbell' },
          { name: 'Romanian Deadlift', equipment: 'barbell' },
        ],
      },
      {
        name: 'Leg Curl (lying/seated)',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes: 'Suggested accessory. Hamstring isolation',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Ab Wheel Rollout',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        notes: 'Suggested accessory. Core stability for squats',
        alternatives: [
          { name: 'Hanging Leg Raise', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'OHP / Incline Bench',
    type: 'upper',
    focus: 'T1 OHP 9 sets + T2 Incline Bench 8 sets + accessories',
    warmup: '2-3 ramp-up sets of OHP (bar x10, 50% x5, 70% x3)',
    exercises: [
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 9,
        reps: '1-5',
        rest: 180,
        rir: '0-1',
        amrap: true,
        compound: true,
        notes:
          'T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP',
        alternatives: [
          { name: 'Seated Barbell OHP', equipment: 'barbell' },
          { name: 'Push Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Incline Barbell Press',
        equipment: 'barbell',
        sets: 8,
        reps: '3-8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation',
        alternatives: [
          { name: 'Incline Dumbbell Press', equipment: 'dumbbell' },
          { name: 'Machine Incline Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes: 'Suggested accessory. Back work to balance pressing',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Machine Pulldown', equipment: 'machine' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes: 'Suggested accessory. Side delt volume',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Deadlift / Front Squat',
    type: 'lower',
    focus: 'T1 Deadlift 9 sets + T2 Front Squat 8 sets + accessories',
    warmup: '2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)',
    exercises: [
      {
        name: 'Conventional Deadlift',
        equipment: 'barbell',
        sets: 9,
        reps: '1-5',
        rest: 180,
        rir: '0-1',
        amrap: true,
        compound: true,
        notes:
          'T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP',
        alternatives: [
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
        ],
      },
      {
        name: 'Front Squat',
        equipment: 'barbell',
        sets: 8,
        reps: '3-8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'T2 supplemental. Sets follow % TM scheme. Focus on volume accumulation',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Chin-ups',
        equipment: 'bodyweight',
        sets: 3,
        reps: '6-10',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes: 'Suggested accessory. Add weight when bodyweight is easy',
        alternatives: [
          { name: 'Lat Pulldown', equipment: 'cable' },
          { name: 'Pull-ups', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Hanging Leg Raise',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        notes: 'Suggested accessory. Core strength for deadlift bracing',
        alternatives: [
          { name: 'Ab Wheel Rollout', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'SAT',
    name: 'Bench / CGBP',
    type: 'upper',
    focus: 'T1 Bench Press 9 sets + T2 Close-Grip Bench 8 sets + accessories',
    warmup: '2-3 ramp-up sets of bench press (bar x10, 50% x5, 70% x3)',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 9,
        reps: '1-5',
        rest: 180,
        rir: '0-1',
        amrap: true,
        compound: true,
        notes:
          'T1 main lift. Sets follow % TM scheme: 75/85/95/90/85/80/75/70/65. Last set is 1+ AMRAP',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Close-Grip Bench Press',
        equipment: 'barbell',
        sets: 8,
        reps: '3-8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'T2 supplemental. Sets follow % TM scheme. Tricep emphasis, hands shoulder-width',
        alternatives: [
          { name: 'DB Floor Press', equipment: 'dumbbell' },
          { name: 'Dip Machine', equipment: 'machine' },
        ],
      },
      {
        name: 'DB Row',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes: 'Suggested accessory. Back balance for bench volume',
        alternatives: [
          { name: 'Seated Cable Row', equipment: 'cable' },
          { name: 'Machine Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Hammer Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 60,
        rir: '0-1',
        notes: 'Suggested accessory. Brachialis & forearm work',
        alternatives: [
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
    ],
  },
]

export const nsuns5Day: ProgramTemplate = {
  meta: {
    id: 'nsuns-5day',
    name: 'nSuns 5/3/1',
    gender: 'male',
    difficulty: 'intermediate',
    daysPerWeek: 5,
    description:
      'High-volume 5/3/1 linear progression variant. Each day has a T1 main lift (9 sets at % TM) and a T2 supplemental lift (8 sets) plus 2-3 optional accessories. Add weight weekly based on AMRAP performance.',
    tags: ['strength', 'powerlifting', 'linear progression'],
  },
  days,
  defaultRestDays: [2, 6],
}

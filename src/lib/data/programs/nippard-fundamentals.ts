import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Full Body A',
    type: 'full',
    focus: 'Squat & bench strength + back, posterior chain, calves & biceps',
    warmup:
      '5 min bike or walk, 2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '6',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Brace core, sit between hips, knees over toes. AMRAP on last set',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Leg Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Barbell Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes: 'Retract scapulae, slight arch, feet flat. AMRAP on last set',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Wide-Grip Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes: 'Wide overhand grip, drive elbows down, squeeze lats at bottom',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Assisted Pull-ups', equipment: 'machine' },
        ],
      },
      {
        name: 'Romanian Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Hinge at hips, bar close to legs, deep hamstring stretch at bottom',
        alternatives: [
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
        ],
      },
      {
        name: 'Assisted Dip',
        equipment: 'machine',
        sets: 3,
        reps: '8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Slight forward lean for chest emphasis. Progress to weighted dips',
        alternatives: [
          { name: 'Weighted Dip', equipment: 'bodyweight' },
          { name: 'Tricep Pushdown', equipment: 'cable' },
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '10',
        rest: 90,
        rir: '1-2',
        notes: 'Full stretch at bottom, pause at top. Controlled tempo',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
      {
        name: 'Dumbbell Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10',
        rest: 90,
        rir: '1-2',
        notes: 'Strict form, no swinging. Controlled negative',
        alternatives: [
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'EZ Bar Curl', equipment: 'ez_bar' },
          { name: 'Hammer Curl', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'WED',
    name: 'Full Body B',
    type: 'full',
    focus: 'Deadlift strength + OHP, rows, quads, chest & triceps',
    warmup:
      '5 min bike or walk, 2-3 ramp-up sets of deadlift (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Barbell Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Brace hard, push floor away, lock out with glutes. AMRAP on last set',
        alternatives: [
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'Sumo Deadlift', equipment: 'barbell' },
        ],
      },
      {
        name: 'Machine Overhead Press',
        equipment: 'machine',
        sets: 3,
        reps: '8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Controlled press overhead, full lockout. Machine keeps stable path for beginners',
        alternatives: [
          { name: 'Seated DB OHP', equipment: 'dumbbell' },
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
          { name: 'Smith Machine OHP', equipment: 'smith' },
        ],
      },
      {
        name: 'Chest-Supported Row',
        equipment: 'machine',
        sets: 3,
        reps: '12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Chest on pad removes lower back stress. Squeeze scapulae at top',
        alternatives: [
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'Seated Cable Row', equipment: 'cable' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Leg Extension',
        equipment: 'machine',
        sets: 3,
        reps: '12',
        rest: 90,
        rir: '1-2',
        notes: 'Quad isolation. Full lockout at top, slow eccentric',
        alternatives: [
          { name: 'Sissy Squat', equipment: 'bodyweight' },
          { name: 'Hack Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Pec Deck',
        equipment: 'machine',
        sets: 3,
        reps: '12',
        rest: 90,
        rir: '1-2',
        notes: 'Squeeze at midline, slow eccentric. Keep slight bend in elbows',
        alternatives: [
          { name: 'Cable Fly', equipment: 'cable' },
          { name: 'DB Fly', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Crunch',
        equipment: 'bodyweight',
        sets: 3,
        reps: '12',
        rest: 60,
        rir: '1-2',
        notes: 'Curl ribcage toward pelvis. No pulling on neck',
        alternatives: [
          { name: 'Cable Crunch', equipment: 'cable' },
          { name: 'Hanging Leg Raise', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Skull Crusher',
        equipment: 'ez_bar',
        sets: 3,
        reps: '12',
        rest: 90,
        rir: '1-2',
        notes: 'Lower to forehead, elbows pointed up. Controlled eccentric',
        alternatives: [
          { name: 'Overhead Tricep Extension', equipment: 'cable' },
          { name: 'Tricep Pushdown', equipment: 'cable' },
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Full Body C',
    type: 'full',
    focus:
      'Lunges, incline press, pulldown, hip thrust, rear delts & hamstrings',
    warmup:
      '5 min bike or walk, light lunges x10 each leg, 1-2 ramp-up sets of incline press',
    exercises: [
      {
        name: 'DB Walking Lunge',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          '10 reps per leg. Long stride, upright torso, drive through front heel',
        alternatives: [
          { name: 'Bulgarian Split Squat', equipment: 'dumbbell' },
          { name: 'Reverse Lunge', equipment: 'dumbbell' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Incline DB Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes: '30-45 deg incline, full ROM. Upper chest emphasis',
        alternatives: [
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Incline Machine Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Underhand Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Supinated grip, shoulder-width. Emphasizes lower lats and biceps',
        alternatives: [
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
        ],
      },
      {
        name: 'Barbell Hip Thrust',
        equipment: 'barbell',
        sets: 3,
        reps: '10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Upper back on bench, drive through heels, full hip extension at top',
        alternatives: [
          { name: 'Glute Bridge', equipment: 'barbell' },
          { name: 'Hip Thrust Machine', equipment: 'machine' },
          { name: 'Cable Pull-Through', equipment: 'cable' },
        ],
      },
      {
        name: 'Reverse Pec Deck',
        equipment: 'machine',
        sets: 3,
        reps: '12',
        rest: 90,
        rir: '1-2',
        notes: 'Rear delt focus. Lead with elbows, squeeze at full contraction',
        alternatives: [
          { name: 'Face Pulls', equipment: 'cable' },
          { name: 'DB Reverse Fly', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'DB Lateral Raise',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10',
        rest: 90,
        rir: '1-2',
        notes:
          'Slight forward lean, lead with elbows, raise to shoulder height',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Lying Leg Curl',
        equipment: 'machine',
        sets: 3,
        reps: '10',
        rest: 90,
        rir: '1-2',
        notes: 'Hamstring isolation. Slow eccentric, full ROM, squeeze at peak',
        alternatives: [
          { name: 'Seated Leg Curl', equipment: 'machine' },
          { name: 'Nordic Curl', equipment: 'bodyweight' },
        ],
      },
    ],
  },
]

export const nippardFundamentals: ProgramTemplate = {
  meta: {
    id: 'nippard-fundamentals',
    name: 'Nippard Fundamentals',
    author: 'Jeff Nippard',
    gender: 'unisex',
    difficulty: 'beginner',
    daysPerWeek: 3,
    description:
      "Jeff Nippard's beginner-friendly 3-day full body program. Science-based exercise selection with clear progression for building a muscle & strength foundation.",
    tags: ['hypertrophy', 'beginner', 'full body', 'science-based'],
  },
  days,
  defaultRestDays: [1, 3, 5, 6],
}

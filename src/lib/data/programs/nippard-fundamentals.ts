import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Full Body A',
    type: 'full',
    focus: 'Bench & Squat strength + posterior chain & side delts',
    warmup:
      '5 min bike or walk, 2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary horizontal press. Retract scapulae, arch slightly, feet flat. Add 2.5kg when you hit 8+ on AMRAP set',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Smith Machine Bench Press', equipment: 'smith' },
        ],
      },
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Overhand grip, torso ~45 deg. Pull to lower chest, squeeze scapulae. Keep core braced to protect lower back',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary quad builder. Brace core, sit between hips, knees over toes. Add 2.5kg when you hit 8+ on AMRAP set',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Smith Machine Squat', equipment: 'smith' },
        ],
      },
      {
        name: 'Romanian Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Hamstring & glute builder. Hinge at hips, keep bar close to legs, feel the stretch at bottom before driving hips forward',
        alternatives: [
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Good Morning', equipment: 'barbell' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Side delt isolation. Slight forward lean, lead with elbows, raise to shoulder height. Light weight, strict form',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Tricep Pushdown',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Rope or V-bar attachment. Elbows pinned to sides, full lockout at bottom, controlled eccentric',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Overhead Tricep Extension', equipment: 'cable' },
          { name: 'Rope Pushdown', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'WED',
    name: 'Full Body B',
    type: 'full',
    focus: 'OHP strength + vertical pull, leg press & chest isolation',
    warmup:
      '5 min bike or walk, 2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 3,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary overhead press. Brace core, press in a slight arc around face, lock out overhead. Add 1-2kg when you hit 8+ on AMRAP',
        alternatives: [
          { name: 'Seated Dumbbell OHP', equipment: 'dumbbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Lat Pulldown (wide)',
        equipment: 'cable',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Wide overhand grip. Full stretch at top, drive elbows down and back, squeeze lats at bottom. Sub pull-ups when you can do 8+ reps',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Assisted Pull-ups', equipment: 'machine' },
        ],
      },
      {
        name: 'Leg Press',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Mid-high foot placement. Full ROM without lower back rounding. Do not lock out knees at top',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Leg Curl (lying/seated)',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Hamstring isolation. Slow eccentric (3 sec), full ROM, squeeze at peak contraction',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'Lying Leg Curl', equipment: 'machine' },
          { name: 'Seated Leg Curl', equipment: 'machine' },
        ],
      },
      {
        name: 'Cable Chest Fly',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Pec isolation. Set pulleys at shoulder height, slight elbow bend throughout, squeeze at midline. Control the eccentric (3 sec)',
        alternatives: [
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'DB Fly', equipment: 'dumbbell' },
          { name: 'Machine Fly', equipment: 'machine' },
        ],
      },
      {
        name: 'Barbell Curl (EZ/straight)',
        equipment: 'ez_bar',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Bicep builder. EZ bar reduces wrist strain. Strict form, no swinging, controlled negative',
        alternatives: [
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Preacher Curl', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Full Body C',
    type: 'full',
    focus: 'Incline press + cable row, front squat & rear delts',
    warmup:
      '5 min bike or walk, 2-3 ramp-up sets of front squat or hack squat (light x10, 50% x8)',
    exercises: [
      {
        name: 'Incline Dumbbell Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Upper chest focus. 30-45 deg incline, full ROM, control at bottom stretch. Rotate pinkies slightly inward at top for better pec contraction',
        alternatives: [
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Incline Machine Press', equipment: 'machine' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Seated Cable Row',
        equipment: 'cable',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'V-grip or neutral handle. Pull to lower chest, retract scapulae, 1 sec hold at contraction. Full stretch forward on eccentric',
        alternatives: [
          { name: 'Machine Row', equipment: 'machine' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Front Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Quad emphasis with upright torso. Clean grip or cross-arm grip. If mobility is limited, use hack squat machine instead',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Smith Machine Front Squat', equipment: 'smith' },
        ],
      },
      {
        name: 'DB Romanian Deadlift',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'DB variation for unilateral balance. Keep dumbbells close to legs, hinge at hips, deep hamstring stretch at bottom',
        alternatives: [
          { name: 'Romanian Deadlift', equipment: 'barbell' },
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'Single-Leg RDL', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Face Pulls',
        equipment: 'cable',
        sets: 3,
        reps: '15-20',
        rest: 90,
        rir: '0-1',
        notes:
          'Rear delt & rotator cuff health. Set cable at face height, pull to forehead, externally rotate at end. Prioritize shoulder health over weight',
        alternatives: [
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'DB Reverse Fly', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Hammer Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Brachialis & brachioradialis builder. Neutral grip throughout, controlled tempo, no swinging',
        alternatives: [
          { name: 'Cross-Body Curl', equipment: 'dumbbell' },
          { name: 'Rope Curl', equipment: 'cable' },
          { name: 'Zottman Curl', equipment: 'dumbbell' },
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

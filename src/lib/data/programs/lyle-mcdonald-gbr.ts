import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Upper A',
    type: 'upper',
    focus:
      'Heavy horizontal press & row + moderate accessories + light isolation',
    warmup: '2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'GBR primary lift. Heavy 6-8 range — when you can get 4x8, add 2.5kg next session',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Smith Machine Bench Press', equipment: 'smith' },
        ],
      },
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Overhand grip, pull to lower chest. Match bench press progression',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'Chest-Supported Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Incline DB Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Moderate range. 30-45 deg incline, control the eccentric. Can substitute machine fly',
        alternatives: [
          { name: 'Machine Fly', equipment: 'machine' },
          { name: 'Incline Machine Press', equipment: 'machine' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Cable Row',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Pull to lower chest, retract scapulae. Can substitute lat pulldown',
        alternatives: [
          { name: 'Lat Pulldown (wide)', equipment: 'cable' },
          { name: 'Machine Row', equipment: 'machine' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Side delt isolation. Light weight, strict form. Can substitute upright row',
        alternatives: [
          { name: 'Cable Upright Row', equipment: 'cable' },
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Tricep Pushdown',
        equipment: 'cable',
        sets: 2,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Light isolation. Rope or V-bar. Keep elbows pinned, squeeze at bottom',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Overhead Tricep Extension', equipment: 'cable' },
          { name: 'Tricep Kickback', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Barbell Curl',
        equipment: 'ez_bar',
        sets: 2,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes: 'Light isolation. Strict form, no swinging. EZ or straight bar',
        alternatives: [
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Preacher Curl', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Lower A',
    type: 'lower',
    focus: 'Heavy squat & SLDL + moderate quad/hamstring work + calves',
    warmup: '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'GBR primary lift. Heavy 6-8 range — when you can get 4x8, add 2.5kg next session',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Smith Machine Squat', equipment: 'smith' },
        ],
      },
      {
        name: 'Stiff-Leg Deadlift',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Slight knee bend, hinge at hips. Deep hamstring stretch at bottom. Straight back throughout',
        alternatives: [
          { name: 'Romanian Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
          { name: 'DB Stiff-Leg Deadlift', equipment: 'dumbbell' },
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
          'Moderate range. Mid-high foot placement for full ROM. Secondary quad volume',
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
        rir: '1-2',
        notes: 'Slow eccentric (3 sec). Secondary hamstring volume',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
          { name: 'Seated Leg Curl', equipment: 'machine' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 4,
        reps: '6-8',
        rest: 120,
        rir: '1-2',
        notes:
          'Heavy calf work. Full stretch at bottom, 2 sec pause at top. Gastrocnemius focus',
        alternatives: [
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Seated Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes: 'Moderate range. Soleus emphasis. Full ROM, pause at stretch',
        alternatives: [
          { name: 'Standing Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Upper B',
    type: 'upper',
    focus:
      'Heavy press & row variation + moderate shoulders & back + light isolation',
    warmup: '1-2 light sets of bench press variation + band pull-aparts x15',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Same as Upper A, or use a variation (close-grip, incline). Keep progression consistent',
        alternatives: [
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'DB Bench Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Same as Upper A, or use a variation (underhand, DB row). Match pressing volume',
        alternatives: [
          { name: 'Underhand Barbell Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
        ],
      },
      {
        name: 'Seated DB Overhead Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Moderate range. Controlled eccentric, drive through delts. Anterior & medial delt focus',
        alternatives: [
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
        ],
      },
      {
        name: 'Chin-ups',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Underhand grip, full dead hang at bottom. Add weight when bodyweight is easy. Can substitute pulldowns',
        alternatives: [
          { name: 'Lat Pulldown (close-grip)', equipment: 'cable' },
          { name: 'Lat Pulldown (wide)', equipment: 'cable' },
          { name: 'Machine Pulldown', equipment: 'machine' },
        ],
      },
      {
        name: 'Cable Fly',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Chest stretch focus. Can substitute lateral raises for more shoulder work',
        alternatives: [
          { name: 'Lateral Raises', equipment: 'dumbbell' },
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Pec Deck', equipment: 'machine' },
        ],
      },
      {
        name: 'Overhead Tricep Extension',
        equipment: 'cable',
        sets: 2,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Light isolation. Long head emphasis. Full stretch overhead, squeeze at lockout',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Tricep Pushdown', equipment: 'cable' },
        ],
      },
      {
        name: 'Hammer Curl',
        equipment: 'dumbbell',
        sets: 2,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Light isolation. Brachialis & forearm development. Strict form, no swinging',
        alternatives: [
          { name: 'Rope Cable Curl', equipment: 'cable' },
          { name: 'Cross-Body Curl', equipment: 'dumbbell' },
          { name: 'Incline DB Curl', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Lower B',
    type: 'lower',
    focus:
      'Heavy squat variation & RDL + moderate quad/hamstring work + calves',
    warmup:
      '2-3 ramp-up sets of front squat or leg press (light x10, 60% x8, 80% x5)',
    exercises: [
      {
        name: 'Front Squat',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'GBR primary lift. Quad-dominant squat variation. Can substitute leg press if mobility limited',
        alternatives: [
          { name: 'Leg Press', equipment: 'machine' },
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Safety Bar Squat', equipment: 'barbell' },
        ],
      },
      {
        name: 'Romanian Deadlift',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Slightly more knee bend than SLDL. Deep hamstring stretch, hip hinge. Pairs with front squat',
        alternatives: [
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
          { name: 'DB Romanian Deadlift', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Hack Squat',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Moderate range. Quad-focused, keep feet low on platform. Can substitute lunges',
        alternatives: [
          { name: 'Walking Lunge', equipment: 'dumbbell' },
          { name: 'Bulgarian Split Squat', equipment: 'dumbbell' },
          { name: 'Leg Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Leg Curl (lying/seated)',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes: 'Slow eccentric (3 sec). Secondary hamstring volume',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
          { name: 'Seated Leg Curl', equipment: 'machine' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 4,
        reps: '6-8',
        rest: 120,
        rir: '1-2',
        notes:
          'Heavy calf work. Full stretch at bottom, 2 sec pause at top. Gastrocnemius focus',
        alternatives: [
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Seated Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes: 'Moderate range. Soleus emphasis. Full ROM, pause at stretch',
        alternatives: [
          { name: 'Standing Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
    ],
  },
]

export const lyleMcdonaldGbr: ProgramTemplate = {
  meta: {
    id: 'lyle-mcdonald-gbr',
    name: 'Lyle McDonald GBR',
    author: 'Lyle McDonald',
    gender: 'unisex',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    description:
      'The "gold standard" Upper/Lower bulking routine. Simple, effective, and proven. Heavy compounds first, moderate accessories second, light isolation last.',
    tags: ['hypertrophy', 'bulking', 'upper/lower'],
  },
  days,
  defaultRestDays: [2, 5, 6],
}

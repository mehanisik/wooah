import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Chest & Delts',
    type: 'chest',
    focus: 'Upper body pressing with emphasis on chest shape and capped delts',
    warmup:
      '2-3 ramp-up sets of incline bench (bar x10, 50% x8, 75% x5), band pull-aparts x15',
    exercises: [
      {
        name: 'Incline Barbell Bench Press',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary upper chest builder. 30-45 deg incline, retract scapulae, controlled 3s eccentric for maximum tension',
        alternatives: [
          { name: 'Incline DB Press', equipment: 'dumbbell' },
          { name: 'Incline Smith Press', equipment: 'smith' },
          { name: 'Incline Machine Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Flat Dumbbell Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Full ROM, squeeze at top. Slight arc path for chest stretch at bottom. Mind-muscle connection on the pecs',
        alternatives: [
          { name: 'Flat Barbell Bench Press', equipment: 'barbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Cable Fly',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Constant tension throughout. Slight forward lean, cross hands at midline for peak contraction. 3s eccentric',
        alternatives: [
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'DB Fly', equipment: 'dumbbell' },
          { name: 'Machine Fly', equipment: 'machine' },
        ],
      },
      {
        name: 'Seated Dumbbell OHP',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Full lockout at top, controlled descent to ear level. Focus on medial delt activation through the press',
        alternatives: [
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 4,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Key aesthetic exercise for V-taper. Slight forward lean, lead with elbows, pinky up at top. Light weight, strict form',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Rear Delt Fly',
        equipment: 'dumbbell',
        sets: 3,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Bent-over position, slight bend in elbows. Squeeze scapulae at contraction. Builds 3D shoulder look',
        alternatives: [
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Face Pulls', equipment: 'cable' },
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Back & Arms',
    type: 'back',
    focus:
      'Back width and thickness with dedicated arm work for aesthetic proportion',
    warmup:
      '1-2 sets of lat pulldown (light x12), band pull-aparts x15, light curls x12',
    exercises: [
      {
        name: 'Weighted Pull-ups',
        equipment: 'bodyweight',
        sets: 4,
        reps: '6-10',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'V-taper builder. Add weight via belt when bodyweight is easy. Full dead hang, chin over bar, 2s pause at bottom',
        alternatives: [
          { name: 'Lat Pulldown (wide)', equipment: 'cable' },
          { name: 'Assisted Pull-ups', equipment: 'machine' },
          { name: 'Chin-ups', equipment: 'bodyweight' },
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
          'Overhand grip, pull to lower chest. Keep torso ~45 deg, squeeze scapulae at top. Builds back thickness',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Cable Pullover',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Lat isolation. Arms slightly bent, stretch overhead, pull through with lats. Constant tension for aesthetics',
        alternatives: [
          { name: 'DB Pullover', equipment: 'dumbbell' },
          { name: 'Straight-Arm Pulldown', equipment: 'cable' },
          { name: 'Machine Pullover', equipment: 'machine' },
        ],
      },
      {
        name: 'Face Pulls',
        equipment: 'cable',
        sets: 3,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Rear delt and external rotation. Pull rope to forehead, spread at peak. Shoulder health and posture correction',
        alternatives: [
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'DB Reverse Fly', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Barbell Curl',
        equipment: 'ez_bar',
        sets: 3,
        reps: '8-10',
        rest: 90,
        rir: '1-2',
        notes:
          'Primary bicep mass builder. EZ bar for wrist comfort. Strict form, no swinging, squeeze at top',
        alternatives: [
          { name: 'Straight Barbell Curl', equipment: 'barbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'DB Curl', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Incline Dumbbell Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Long head stretch for bicep peak. Let arms hang back on incline bench, no swinging. Key exercise for arm aesthetics',
        alternatives: [
          { name: 'Spider Curl', equipment: 'dumbbell' },
          { name: 'Preacher Curl', equipment: 'machine' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'Overhead Tricep Extension',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Long head emphasis for tricep horseshoe shape. Full stretch overhead, controlled lockout at top',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'DB Overhead Extension', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Dips',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Upright torso for tricep emphasis. Add weight via belt when bodyweight is easy. Full lockout at top',
        alternatives: [
          { name: 'Dip Machine', equipment: 'machine' },
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'Rope Pushdown', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Legs',
    type: 'legs',
    focus:
      'Balanced quad and hamstring development with calf work for proportional lower body',
    warmup:
      '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5), leg extension x12 light',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary quad builder. Break at hips and knees together, full depth. Brace core, controlled eccentric',
        alternatives: [
          { name: 'Front Squat', equipment: 'barbell' },
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Smith Machine Squat', equipment: 'smith' },
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
          'Mid foot placement for balanced quad/glute activation. Full depth without butt wink. Do not lock out knees',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Leg Extension',
        equipment: 'machine',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Quad isolation for sweep and teardrop. Squeeze at top with 1s hold, slow 3s eccentric',
        alternatives: [
          { name: 'Sissy Squat', equipment: 'bodyweight' },
          { name: 'Spanish Squat', equipment: 'bodyweight' },
          { name: 'Reverse Nordic', equipment: 'bodyweight' },
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
          'Hinge at hips, deep hamstring stretch at bottom. Keep bar close to legs, slight knee bend. Builds posterior chain',
        alternatives: [
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Good Morning', equipment: 'barbell' },
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
          'Hamstring isolation. Slow 3s eccentric, full ROM. Curl toes toward shins for stronger contraction',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'Lying Leg Curl', equipment: 'machine' },
          { name: 'Seated Leg Curl', equipment: 'machine' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 4,
        reps: '10-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Full stretch at bottom, 2s pause at top. Gastrocnemius focus. Complete proportional lower body look',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Upper (Aesthetic Pump)',
    type: 'upper',
    focus:
      'High-rep pump session targeting chest, lats, delts, arms, and abs for the aesthetic look',
    warmup:
      'Light cable flys x15, band pull-aparts x15, light lateral raises x12',
    exercises: [
      {
        name: 'Incline Dumbbell Fly',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Upper chest isolation for definition. Deep stretch at bottom, squeeze at top. 3s eccentric, mind-muscle connection',
        alternatives: [
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'Incline Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Machine Chest Press',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Controlled pump work. Squeeze at peak contraction, slow 2s eccentric. Focus on chest activation over weight',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Smith Machine Bench Press', equipment: 'smith' },
          { name: 'Push-ups (weighted)', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Wide overhand grip. Lean back slightly, pull to upper chest. Focus on lat width and V-taper development',
        alternatives: [
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Machine Pulldown', equipment: 'machine' },
          { name: 'Pull-ups', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Machine Row',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Mid-back thickness. Squeeze scapulae at contraction, 2s hold at peak. Controlled throughout for pump',
        alternatives: [
          { name: 'Seated Cable Row', equipment: 'cable' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Cable Lateral Raise',
        equipment: 'cable',
        sets: 4,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Constant cable tension for medial delt pump. Behind-the-back or cross-body setup. Light and strict, feel every rep',
        alternatives: [
          { name: 'DB Lateral Raise', equipment: 'dumbbell' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'Cable Y-Raise', equipment: 'cable' },
        ],
      },
      {
        name: 'Hammer Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 60,
        rir: '0-1',
        notes:
          'Brachialis and forearm development. Neutral grip, no momentum. Builds arm width from the front',
        alternatives: [
          { name: 'Cross-Body Curl', equipment: 'dumbbell' },
          { name: 'Rope Curl', equipment: 'cable' },
          { name: 'Reverse Curl', equipment: 'ez_bar' },
        ],
      },
      {
        name: 'Rope Pushdown',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Spread rope at bottom for full lateral head contraction. Elbows pinned to sides. Tricep definition work',
        alternatives: [
          { name: 'Tricep Pushdown (V-bar)', equipment: 'cable' },
          { name: 'Diamond Push-ups', equipment: 'bodyweight' },
          { name: 'Dip Machine', equipment: 'machine' },
        ],
      },
      {
        name: 'Hanging Leg Raise',
        equipment: 'bodyweight',
        sets: 3,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Core aesthetics finisher. Control the swing, curl pelvis up at top. Slow eccentric for maximum ab activation',
        alternatives: [
          { name: 'Cable Crunch', equipment: 'cable' },
          { name: 'Ab Wheel Rollout', equipment: 'bodyweight' },
          { name: 'Decline Crunch', equipment: 'bodyweight' },
        ],
      },
    ],
  },
]

export const naturalHypertrophyGuts: ProgramTemplate = {
  meta: {
    id: 'natural-hypertrophy-guts',
    name: 'Natural Hypertrophy Guts',
    author: 'Natural Hypertrophy',
    gender: 'male',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    description:
      'Aesthetic-focused program emphasizing chest, deltoids, arms, and abs. Controlled tempo with mind-muscle connection. Builds the classic V-taper physique.',
    tags: ['hypertrophy', 'aesthetic', 'bodybuilding'],
  },
  days,
  defaultRestDays: [2, 5, 6],
}

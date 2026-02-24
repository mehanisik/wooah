import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Upper A',
    type: 'upper',
    focus: 'Bench press strength + back thickness + shoulders & arms',
    warmup:
      '2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5) + band pull-aparts',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary horizontal press. Wave-load: add 2.5kg when you hit 8+ on AMRAP. Use leg drive, retract scapulae, arch moderately',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Overhand grip, ~45 deg torso angle, pull to navel. Match bench press progression. Brace core to protect lower back',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Seated Dumbbell OHP',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Secondary vertical press. Full ROM from ear level to lockout. Control the eccentric for shoulder health',
        alternatives: [
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
        ],
      },
      {
        name: 'Cable Lateral Raise',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Behind-the-body cable path for lengthened partial emphasis. Lean slightly away from cable to maximize stretch on side delts',
        alternatives: [
          { name: 'DB Lateral Raise', equipment: 'dumbbell' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
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
          'Long head bicep emphasis via stretch position. 45 deg incline, let arms hang straight, slow eccentric (3 sec)',
        alternatives: [
          { name: 'Barbell Curl', equipment: 'ez_bar' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Spider Curl', equipment: 'dumbbell' },
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
          'Long head tricep emphasis. Full stretch overhead, lock out at top. Rope attachment preferred for wrist-friendly position',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Overhead DB Extension', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Lower A',
    type: 'lower',
    focus: 'Squat strength + posterior chain + quad isolation + calves',
    warmup: '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5) + leg swings',
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
          'Primary quad & glute builder. Wave-load: add 2.5kg when you hit 8+ on AMRAP. Hit depth (hip crease below knee), brace core hard',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Front Squat', equipment: 'barbell' },
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
        notes:
          'Hamstring & glute lengthened position. Hinge at hips, keep bar close to legs. Feel a deep stretch in hamstrings before reversing',
        alternatives: [
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
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
          'Quad-focused secondary compound. Feet mid-low on platform, full depth without lumbar rounding. Do not lock out knees',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Lying Leg Curl',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Hamstring isolation. Slow eccentric (3 sec) for lengthened partial overload. Dorsiflex ankles to bias hamstrings over calves',
        alternatives: [
          { name: 'Seated Leg Curl', equipment: 'machine' },
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
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
          'Gastrocnemius focus (straight knee). Full stretch at bottom (2 sec), hard squeeze at top (1 sec). Research supports slower tempos for calves',
        alternatives: [
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Upper B',
    type: 'upper',
    focus: 'OHP strength + back width + incline press + rear delts & arms',
    warmup:
      '2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5) + band pull-aparts',
    exercises: [
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary vertical press. Strict form — no leg drive. Wave-load: add 2.5kg when you hit 8+ on AMRAP. Squeeze glutes for stability',
        alternatives: [
          { name: 'Seated DB OHP', equipment: 'dumbbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Push Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Pull-ups (weighted if possible)',
        equipment: 'bodyweight',
        sets: 4,
        reps: '6-10',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Back width builder. Full dead hang at bottom, chin over bar at top. Add weight via belt when you can do 10+ reps',
        alternatives: [
          { name: 'Lat Pulldown (wide)', equipment: 'cable' },
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Assisted Pull-ups', equipment: 'machine' },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Upper chest focus. 30 deg incline for optimal upper pec activation per EMG data. Full stretch at bottom',
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
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Back thickness. Neutral V-grip, pull to lower chest, retract scapulae and hold 1 sec. Allow full protraction on eccentric for stretch',
        alternatives: [
          { name: 'Machine Row', equipment: 'machine' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Reverse Pec Deck',
        equipment: 'machine',
        sets: 3,
        reps: '15-20',
        rest: 90,
        rir: '0-1',
        notes:
          'Rear delt isolation. Squeeze at peak contraction (1 sec), control negative. Important for shoulder balance and posture',
        alternatives: [
          { name: 'Face Pulls', equipment: 'cable' },
          { name: 'DB Reverse Fly', equipment: 'dumbbell' },
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Barbell Curl (EZ)',
        equipment: 'ez_bar',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Short head bicep emphasis. Strict form — no swinging. EZ bar reduces wrist strain vs straight bar',
        alternatives: [
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Preacher Curl', equipment: 'machine' },
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
          'Lateral head emphasis. Elbows pinned to sides, full extension and squeeze. Rope or V-bar attachment',
        alternatives: [
          { name: 'Rope Pushdown', equipment: 'cable' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Dip Machine', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Lower B',
    type: 'lower',
    focus: 'Deadlift strength + quad accessories + hamstring curl + calves',
    warmup:
      '2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3) + hip circles',
    exercises: [
      {
        name: 'Conventional Deadlift',
        equipment: 'barbell',
        sets: 4,
        reps: '5-6',
        rest: 210,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary posterior chain builder. Brace hard, push the floor away. Wave-load: add 2.5kg when you hit 6+ on AMRAP. Reset each rep',
        alternatives: [
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'Rack Pull', equipment: 'barbell' },
        ],
      },
      {
        name: 'Hack Squat',
        equipment: 'machine',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Quad-dominant press after deadlift. Feet low on platform, full depth. Lengthened partials in bottom half if desired for extra stimulus',
        alternatives: [
          { name: 'Front Squat', equipment: 'barbell' },
          { name: 'Leg Press', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
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
          'Quad isolation. Squeeze at top for 1 sec, control eccentric. Lengthened partials in bottom range per Nippard recommendation',
        alternatives: [
          { name: 'Sissy Squat', equipment: 'bodyweight' },
          { name: 'Spanish Squat', equipment: 'bodyweight' },
          { name: 'Reverse Nordic', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Seated Leg Curl',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes:
          'Hamstring isolation. Seated > lying per research for greater stretch under load. Slow eccentric (3 sec)',
        alternatives: [
          { name: 'Lying Leg Curl', equipment: 'machine' },
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Bulgarian Split Squat',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-10 /leg',
        rest: 120,
        rir: '1-2',
        notes:
          'Unilateral quad & glute work. Rear foot elevated, torso upright. Addresses strength imbalances between sides',
        alternatives: [
          { name: 'Reverse Lunge', equipment: 'dumbbell' },
          { name: 'Walking Lunge', equipment: 'dumbbell' },
          { name: 'Step-up', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Seated Calf Raise',
        equipment: 'machine',
        sets: 4,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Soleus emphasis (bent knee). Full ROM with 2 sec stretch at bottom, 1 sec squeeze at top. Pairs with standing calf from Lower A',
        alternatives: [
          { name: 'Standing Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
    ],
  },
]

export const nippardUl: ProgramTemplate = {
  meta: {
    id: 'nippard-ul',
    name: 'Nippard Upper/Lower',
    author: 'Jeff Nippard',
    gender: 'unisex',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    description:
      "Jeff Nippard's science-based Upper/Lower split. Wave-loaded progression with emphasis on lengthened partials and training close to failure.",
    tags: ['hypertrophy', 'science-based', 'upper/lower'],
  },
  days,
  defaultRestDays: [2, 5, 6],
}

export type Equipment =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'ez_bar'
  | 'smith'

export interface Alternative {
  name: string
  equipment: Equipment
}

export interface CardioItem {
  name: string
  duration: string
}

export interface Exercise {
  name: string
  equipment: Equipment
  sets: number
  reps: string
  rest: number
  rir: string
  amrap?: boolean
  compound?: boolean
  superset?: number
  notes?: string
  alternatives?: Alternative[]
}

export interface Day {
  day: string
  name: string
  type: 'push' | 'pull' | 'legs' | 'rest'
  focus: string
  warmup?: string
  cardio?: CardioItem[]
  exercises: Exercise[]
}

export const PROGRAM: Day[] = [
  {
    day: 'MON',
    name: 'Push A',
    type: 'push',
    focus: 'Chest-dominant + Shoulders + Triceps',
    warmup: '2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 4,
        reps: '5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP set',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes: 'Upper chest focus. 30-45 deg incline',
        alternatives: [
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Incline Machine Press', equipment: 'machine' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Cable Chest Fly',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes: 'Squeeze & control eccentric (3 sec)',
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
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes: 'Secondary shoulder work',
        alternatives: [
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Landmine Press', equipment: 'barbell' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Tricep Pushdown',
        equipment: 'cable',
        sets: 3,
        reps: '10-15',
        rest: 90,
        rir: '0-1',
        notes: 'Rope or V-bar',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Dip Machine', equipment: 'machine' },
          { name: 'Diamond Push-ups', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 4,
        reps: '15-20',
        rest: 60,
        rir: '0',
        superset: 7,
        notes: 'Light weight, strict form. Superset w/ #7',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Rope Pushdown',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 60,
        rir: '0',
        superset: 6,
        notes: 'Tricep isolation. Superset w/ #6',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Dip Machine', equipment: 'machine' },
          { name: 'Diamond Push-ups', equipment: 'bodyweight' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Pull A',
    type: 'pull',
    focus: 'Back-dominant (Deadlift) + Biceps',
    warmup: '2-3 ramp-up sets of deadlift (40% x8, 60% x5, 80% x3)',
    cardio: [
      { name: 'Hanging Leg Raises', duration: '3 x 12-15' },
      { name: 'Cable Crunches', duration: '3 x 15-20' },
      { name: 'Dead Bugs', duration: '3 x 10 /side' },
      { name: 'LISS Cardio (walk/bike)', duration: '10-15 min' },
    ],
    exercises: [
      {
        name: 'Conventional Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '5',
        rest: 240,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP',
        alternatives: [
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Rack Pull', equipment: 'barbell' },
        ],
      },
      {
        name: 'Lat Pulldown (wide)',
        equipment: 'cable',
        sets: 3,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes: 'Full stretch at top, squeeze lats at bottom',
        alternatives: [
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Machine Pulldown', equipment: 'machine' },
        ],
      },
      {
        name: 'Seated Cable Row',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 120,
        rir: '1-2',
        notes: 'Pull to lower chest, retract scapulae',
        alternatives: [
          { name: 'Machine Row', equipment: 'machine' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Face Pulls',
        equipment: 'cable',
        sets: 5,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes: 'Rear delt & rotator cuff. Pull to forehead, externally rotate',
        alternatives: [
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'Reverse Fly', equipment: 'dumbbell' },
          { name: 'Rear Delt Cable', equipment: 'cable' },
        ],
      },
      {
        name: 'Barbell Curl (EZ/straight)',
        equipment: 'ez_bar',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes: 'Strict form, no swinging',
        alternatives: [
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Preacher Curl', equipment: 'machine' },
        ],
      },
      {
        name: 'Hammer Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        superset: 7,
        notes: 'Brachialis & forearm development. Superset w/ #7',
        alternatives: [
          { name: 'Cross-Body Curl', equipment: 'dumbbell' },
          { name: 'Rope Curl', equipment: 'cable' },
          { name: 'Reverse Curl', equipment: 'ez_bar' },
        ],
      },
      {
        name: 'DB Lateral Raise',
        equipment: 'dumbbell',
        sets: 3,
        reps: '15-20',
        rest: 60,
        rir: '0',
        superset: 6,
        notes: 'Side delt volume on pull day. Superset w/ #6',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'WED',
    name: 'Legs A',
    type: 'legs',
    focus: 'Quad-dominant (Squat)',
    warmup: '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5)',
    cardio: [
      { name: 'Hanging Leg Raises', duration: '3 x 45s' },
      { name: 'Cable Crunches', duration: '3 x 45s' },
      { name: 'Ab Wheel Rollouts', duration: '3 x 45s' },
      { name: 'Dead Bugs', duration: '3 x 45s' },
      { name: 'LISS Cardio (walk/bike)', duration: '10-15 min' },
    ],
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 4,
        reps: '5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes: 'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP',
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
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes: 'Hamstring stretch at bottom, hinge at hips',
        alternatives: [
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
          { name: 'DB RDL', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Leg Press',
        equipment: 'machine',
        sets: 3,
        reps: '10-15',
        rest: 120,
        rir: '1-2',
        notes: 'Mid-high foot placement for full ROM',
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
        reps: '10-15',
        rest: 90,
        rir: '0-1',
        notes: 'Slow eccentric (3 sec)',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
          { name: 'Slider Curl', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Leg Extension',
        equipment: 'machine',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes: 'Squeeze quad at top, 1 sec hold',
        alternatives: [
          { name: 'Sissy Squat', equipment: 'bodyweight' },
          { name: 'Spanish Squat', equipment: 'bodyweight' },
          { name: 'Reverse Nordic', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 5,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes: 'Full stretch at bottom, 2 sec pause at top',
        alternatives: [
          { name: 'Seated Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
      {
        name: 'Cable Pull-Through',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes: 'Glute isolation. Squeeze at top, hinge at hips',
        alternatives: [
          { name: 'Glute Bridge', equipment: 'bodyweight' },
          { name: 'Hip Thrust', equipment: 'barbell' },
          { name: 'Romanian Deadlift', equipment: 'barbell' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Push B',
    type: 'push',
    focus: 'Shoulder-dominant + Chest + Triceps',
    warmup: '2-3 ramp-up sets of OHP (bar x10, 50% x8, 75% x5)',
    exercises: [
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 4,
        reps: '5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Main strength lift. Add 2.5kg when you hit 5+ on AMRAP. Brace core',
        alternatives: [
          { name: 'Seated Barbell OHP', equipment: 'barbell' },
          { name: 'DB OHP', equipment: 'dumbbell' },
          { name: 'Machine OHP', equipment: 'machine' },
        ],
      },
      {
        name: 'Close-Grip Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes: 'Tricep-focused compound. Grip just inside shoulder width',
        alternatives: [
          { name: 'Dips (weighted)', equipment: 'bodyweight' },
          { name: 'Dip Machine', equipment: 'machine' },
          { name: 'Push-ups (weighted)', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Incline Cable/DB Fly',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes: 'Upper chest isolation',
        alternatives: [
          { name: 'Incline DB Press', equipment: 'dumbbell' },
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'Low Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Overhead Tricep Extension',
        equipment: 'cable',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        superset: 5,
        notes: 'Long head emphasis. Superset w/ #5',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Cable Overhead Extension', equipment: 'cable' },
          { name: 'Skull Crusher', equipment: 'ez_bar' },
        ],
      },
      {
        name: 'Cable Lateral Raise (1-arm)',
        equipment: 'cable',
        sets: 5,
        reps: '15-20',
        rest: 60,
        rir: '0',
        superset: 4,
        notes: 'Lean away for better stretch. Superset w/ #4',
        alternatives: [
          { name: 'DB Lateral Raise', equipment: 'dumbbell' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'Plate Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Reverse Pec Deck',
        equipment: 'machine',
        sets: 3,
        reps: '15-20',
        rest: 60,
        rir: '0',
        notes: 'Rear delt balance',
        alternatives: [
          { name: 'Face Pulls', equipment: 'cable' },
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'DB Reverse Fly', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Pull B',
    type: 'pull',
    focus: 'Row/Pull-up Focus + Biceps',
    warmup: '1-2 light sets of pull-ups (bodyweight) + light row warm-up',
    cardio: [
      { name: 'Weighted Planks', duration: '3 x 45s' },
      { name: 'Pallof Press', duration: '3 x 12 /side' },
      { name: 'Cable Woodchops', duration: '3 x 12 /side' },
      { name: 'LISS Cardio (walk/bike)', duration: '10-15 min' },
    ],
    exercises: [
      {
        name: 'Pull-ups (weighted if possible)',
        equipment: 'bodyweight',
        sets: 4,
        reps: 'AMRAP (6-12)',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes: 'Use band assist if needed. Full dead hang, chin over bar',
        alternatives: [
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Lat Pulldown', equipment: 'cable' },
          { name: 'Assisted Pull-ups', equipment: 'machine' },
        ],
      },
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 4,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes: 'Overhand grip, pull to lower chest',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Cable Pullover',
        equipment: 'cable',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes: 'Lat isolation, keep arms slightly bent',
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
        notes: 'Rear delt & external rotation',
        alternatives: [
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Rear Delt Cable', equipment: 'cable' },
        ],
      },
      {
        name: 'Incline Dumbbell Curl',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 60,
        rir: '0-1',
        superset: 7,
        notes: 'Long head stretch. Let arms hang back. Superset w/ #7',
        alternatives: [
          { name: 'Spider Curl', equipment: 'dumbbell' },
          { name: 'Preacher Curl', equipment: 'machine' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'Preacher Curl',
        equipment: 'machine',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '0-1',
        notes: 'Peak contraction bicep isolation',
        alternatives: [
          { name: 'Spider Curl', equipment: 'dumbbell' },
          { name: 'Reverse Curl', equipment: 'ez_bar' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'DB Lateral Raise',
        equipment: 'dumbbell',
        sets: 3,
        reps: '15-20',
        rest: 60,
        rir: '0',
        superset: 5,
        notes: 'Side delt volume on pull day. Superset w/ #5',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'SAT',
    name: 'Legs B',
    type: 'legs',
    focus: 'Posterior Chain (Deadlift/RDL) + Quads',
    warmup: '2-3 ramp-up sets of front squat (bar x10, 50% x8, 70% x5)',
    cardio: [
      { name: 'Weighted Planks', duration: '3 x 45s' },
      { name: 'Pallof Press', duration: '3 x 45s' },
      { name: 'Decline Sit-ups', duration: '3 x 45s' },
      { name: 'Reverse Crunches', duration: '3 x 45s' },
      { name: 'Stairclimber / Cycling', duration: '10 min' },
    ],
    exercises: [
      {
        name: 'Front Squat / Hack Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 180,
        rir: '1-2',
        notes: 'Quad dominant variation, upright torso',
        alternatives: [
          { name: 'Hack Squat Machine', equipment: 'machine' },
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Zercher Squat', equipment: 'barbell' },
        ],
      },
      {
        name: 'Sumo/Conv. Deadlift (lighter)',
        equipment: 'barbell',
        sets: 3,
        reps: '6-8',
        rest: 180,
        rir: '2',
        notes: 'Variation from Day 2. Submaximal -- technique focus',
        alternatives: [
          { name: 'Deficit Deadlift', equipment: 'barbell' },
          { name: 'Block Pull', equipment: 'barbell' },
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
        ],
      },
      {
        name: 'Bulgarian Split Squat',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12 /leg',
        rest: 90,
        rir: '1-2',
        notes: 'Single leg strength & stability',
        alternatives: [
          { name: 'Reverse Lunge', equipment: 'dumbbell' },
          { name: 'Step-up', equipment: 'dumbbell' },
          { name: 'Walking Lunge', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Nordic Ham Curl / GHR',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '0-1',
        notes: 'Eccentric hamstring strength. Use negatives if needed',
        alternatives: [
          { name: 'Lying Leg Curl', equipment: 'machine' },
          { name: 'Seated Leg Curl', equipment: 'machine' },
          { name: 'Slider Curl', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Barbell Hip Thrust',
        equipment: 'barbell',
        sets: 3,
        reps: '10-15',
        rest: 90,
        rir: '0-1',
        notes: 'Glute focus. Pause 2 sec at top',
        alternatives: [
          { name: 'Machine Hip Thrust', equipment: 'machine' },
          { name: 'Glute Bridge', equipment: 'bodyweight' },
          { name: 'Cable Pull-Through', equipment: 'cable' },
        ],
      },
      {
        name: 'Seated Calf Raise',
        equipment: 'machine',
        sets: 5,
        reps: '15-20',
        rest: 60,
        rir: '0',
        notes: 'Soleus emphasis. Full ROM, pause at stretch',
        alternatives: [
          { name: 'Standing Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
    ],
  },
  {
    day: 'SUN',
    name: 'REST',
    type: 'rest',
    focus: 'Full Recovery',
    exercises: [],
  },
]

export function getAltName(alt: Alternative | string): string {
  return typeof alt === 'string' ? alt : alt.name
}

export function getAltEquipment(alt: Alternative | string): Equipment | null {
  return typeof alt === 'string' ? null : alt.equipment
}

const EQUIP_LABELS: Record<Equipment, string> = {
  barbell: 'BB',
  dumbbell: 'DB',
  machine: 'MACH',
  cable: 'CABLE',
  bodyweight: 'BW',
  ez_bar: 'EZ',
  smith: 'SMITH',
}

export function getEquipLabel(eq: Equipment | string | undefined): string {
  if (!eq) return ''
  return EQUIP_LABELS[eq as Equipment] || eq.toUpperCase()
}

export const MOTIVATIONAL = [
  "The iron never lies. You either lift it or you don't.",
  'Discipline is choosing between what you want now and what you want most.',
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  'Suffer the pain of discipline or suffer the pain of regret.',
  "You don't have to be extreme, just consistent.",
  'The hard days are what make you stronger.',
  "Success isn't always about greatness. It's about consistency.",
  'Fall in love with the process and the results will come.',
  'The resistance that you fight physically in the gym strengthens you elsewhere.',
  "Today's pain is tomorrow's power.",
  'The difference between try and triumph is a little umph.',
  'Push yourself because no one else is going to do it for you.',
  'Strength does not come from winning. It comes from struggles.',
  'The body achieves what the mind believes.',
]

export const REST_QUOTES = [
  "Muscles grow during rest, not during training. You've earned this.",
  "Recovery is not laziness. It's where adaptation happens.",
  'The strongest athletes know when to push and when to rest.',
  'Sleep is the most anabolic thing you can do today.',
  'Trust the process. Your muscles are rebuilding right now.',
]

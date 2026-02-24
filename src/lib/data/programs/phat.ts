import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Power Upper',
    type: 'power_upper',
    focus: 'Heavy compound pressing & rowing for maximal upper-body strength',
    warmup:
      '2-3 ramp-up sets of barbell row (bar x10, 50% x8, 75% x5) then 2-3 ramp-up sets of bench press',
    exercises: [
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 3,
        reps: '3-5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary power pull. Overhand grip, torso ~45 deg, pull to lower chest. Add 2.5kg when you hit 5 reps on all sets',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'Seal Row', equipment: 'barbell' },
        ],
      },
      {
        name: 'Weighted Pull-ups',
        equipment: 'bodyweight',
        sets: 2,
        reps: '6-10',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Add weight via belt or DB between feet. Full dead hang to chin over bar. Width builder',
        alternatives: [
          { name: 'Lat Pulldown (wide)', equipment: 'cable' },
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Machine Pulldown', equipment: 'machine' },
        ],
      },
      {
        name: 'Rack Chins',
        equipment: 'bodyweight',
        sets: 2,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Supinated grip chin-up from rack pins. Squeeze lats hard at top. Great for back thickness',
        alternatives: [
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Neutral-Grip Pulldown', equipment: 'cable' },
        ],
      },
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '3-5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary power press. Arch back, retract scapulae, leg drive. Add 2.5kg when you hit 5 reps on all sets',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Weighted Dips',
        equipment: 'bodyweight',
        sets: 2,
        reps: '6-10',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Add weight via belt or DB between feet. Slight forward lean for chest emphasis. Full lockout',
        alternatives: [
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'Machine Dip', equipment: 'machine' },
          { name: 'Decline Barbell Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Seated Dumbbell OHP',
        equipment: 'dumbbell',
        sets: 3,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Secondary press. Controlled eccentric, drive through delts. Full lockout overhead',
        alternatives: [
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Barbell Curl',
        equipment: 'barbell',
        sets: 2,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        notes:
          'Strict form, no swinging. Heavier than hypertrophy day curls. Full ROM',
        alternatives: [
          { name: 'EZ-Bar Curl', equipment: 'ez_bar' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'DB Curl', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Skull Crushers',
        equipment: 'ez_bar',
        sets: 2,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        notes:
          'Lower to forehead, extend fully. Keep elbows tucked. Go heavier than hypertrophy day',
        alternatives: [
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Overhead Tricep Extension', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Power Lower',
    type: 'power_lower',
    focus: 'Heavy squat & deadlift for maximal lower-body strength',
    warmup:
      '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5) + leg swings & hip circles',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '3-5',
        rest: 180,
        rir: '1-2',
        amrap: true,
        compound: true,
        notes:
          'Primary power lift. Low bar preferred. Brace hard, sit back. Add 2.5kg when you hit 5 reps on all sets',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Front Squat', equipment: 'barbell' },
          { name: 'Smith Machine Squat', equipment: 'smith' },
        ],
      },
      {
        name: 'Hack Squat',
        equipment: 'machine',
        sets: 2,
        reps: '6-10',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Secondary quad builder. Deep ROM, feet mid-platform. Complements squat pattern',
        alternatives: [
          { name: 'Leg Press', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Leg Press',
        equipment: 'machine',
        sets: 2,
        reps: '6-10',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Additional quad volume. Mid-high foot placement, full depth without butt wink',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Stiff-Leg Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '5-8',
        rest: 180,
        rir: '1-2',
        compound: true,
        notes:
          'Primary posterior chain lift. Slight knee bend, hinge deep. Feel hamstring stretch at bottom',
        alternatives: [
          { name: 'Romanian Deadlift', equipment: 'barbell' },
          { name: 'Conventional Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
        ],
      },
      {
        name: 'Lying Leg Curl',
        equipment: 'machine',
        sets: 2,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        notes:
          'Hamstring isolation. Slow eccentric (3 sec), squeeze at top. Heavier than hypertrophy day',
        alternatives: [
          { name: 'Seated Leg Curl', equipment: 'machine' },
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 3,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        notes:
          'Gastrocnemius emphasis. Full stretch at bottom, 2 sec pause at top. Go heavy',
        alternatives: [
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
      {
        name: 'Seated Calf Raise',
        equipment: 'machine',
        sets: 2,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        notes:
          'Soleus emphasis. Bent-knee position targets deeper calf muscle. Full ROM',
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
    name: 'Hypertrophy Back & Shoulders',
    type: 'back',
    focus:
      'Speed work + high-volume back & shoulder training for muscle growth',
    warmup:
      '1-2 light sets of bent-over row + band pull-aparts + shoulder dislocates',
    exercises: [
      {
        name: 'Barbell Bent-over Row (speed)',
        equipment: 'barbell',
        sets: 6,
        reps: '3',
        rest: 90,
        rir: '3-4',
        compound: true,
        notes:
          'Speed work — use 65-70% of power day weight. Explosive concentric, controlled eccentric. Focus on bar speed',
        alternatives: [
          { name: 'Pendlay Row (speed)', equipment: 'barbell' },
          { name: 'T-Bar Row (speed)', equipment: 'barbell' },
          { name: 'Seal Row (speed)', equipment: 'barbell' },
        ],
      },
      {
        name: 'Rack Chins',
        equipment: 'bodyweight',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes:
          'Supinated grip. Squeeze lats at top, full stretch at bottom. Higher reps than power day',
        alternatives: [
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Neutral-Grip Pulldown', equipment: 'cable' },
        ],
      },
      {
        name: 'Seated Cable Row',
        equipment: 'cable',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'V-handle or wide grip. Pull to lower chest, retract scapulae. Full stretch forward',
        alternatives: [
          { name: 'Machine Row', equipment: 'machine' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
          { name: 'T-Bar Row', equipment: 'barbell' },
        ],
      },
      {
        name: 'Dumbbell Row',
        equipment: 'dumbbell',
        sets: 2,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'One arm at a time, knee on bench. Pull to hip, squeeze lat. Higher rep back finisher',
        alternatives: [
          { name: 'Meadows Row', equipment: 'barbell' },
          { name: 'Cable Row (single arm)', equipment: 'cable' },
          { name: 'Machine Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Close-Grip Pulldown',
        equipment: 'cable',
        sets: 2,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'V-handle or neutral grip. Pump set for lats — constant tension, no momentum',
        alternatives: [
          { name: 'Straight-Arm Pulldown', equipment: 'cable' },
          { name: 'Machine Pulldown', equipment: 'machine' },
          { name: 'Lat Pulldown (wide)', equipment: 'cable' },
        ],
      },
      {
        name: 'Seated Dumbbell OHP',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes:
          'Lighter than power day. Control the eccentric, drive through delts. Full lockout',
        alternatives: [
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
        ],
      },
      {
        name: 'Upright Row',
        equipment: 'barbell',
        sets: 2,
        reps: '12-15',
        rest: 90,
        rir: '1-2',
        notes:
          'Wide grip to reduce impingement risk. Pull to mid-chest level, elbows lead. Traps & side delts',
        alternatives: [
          { name: 'Cable Upright Row', equipment: 'cable' },
          { name: 'DB Upright Row', equipment: 'dumbbell' },
          { name: 'Face Pulls', equipment: 'cable' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Light weight, strict form. Slight forward lean, lead with elbows. Pump out side delts',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Hypertrophy Lower',
    type: 'legs',
    focus: 'Speed squats + high-volume quad, hamstring & calf work for growth',
    warmup:
      '5 min bike or light leg press x15 + bodyweight squats + leg swings',
    exercises: [
      {
        name: 'Barbell Back Squat (speed)',
        equipment: 'barbell',
        sets: 6,
        reps: '3',
        rest: 90,
        rir: '3-4',
        compound: true,
        notes:
          'Speed work — use 65-70% of power day weight. Explosive out of the hole, controlled descent. Focus on bar speed',
        alternatives: [
          { name: 'Front Squat (speed)', equipment: 'barbell' },
          { name: 'Safety Bar Squat (speed)', equipment: 'barbell' },
          { name: 'Box Squat (speed)', equipment: 'barbell' },
        ],
      },
      {
        name: 'Hack Squat',
        equipment: 'machine',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes:
          'Deep ROM, feet mid-platform. Primary hypertrophy quad builder after speed work',
        alternatives: [
          { name: 'Leg Press', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Leg Press',
        equipment: 'machine',
        sets: 2,
        reps: '12-15',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes:
          'Higher rep quad volume. Mid foot placement, full depth. Focus on mind-muscle connection',
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
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Quad isolation pump set. Squeeze at top for 1 sec, controlled eccentric. Blood flow finisher',
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
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Hamstring & glute hypertrophy. Deep stretch at bottom, hinge at hips. Lighter than power day stiff-leg',
        alternatives: [
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Good Morning', equipment: 'barbell' },
        ],
      },
      {
        name: 'Lying Leg Curl',
        equipment: 'machine',
        sets: 2,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Hamstring isolation. Slow eccentric (3 sec), squeeze at top. Higher reps than power day',
        alternatives: [
          { name: 'Seated Leg Curl', equipment: 'machine' },
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Seated Leg Curl',
        equipment: 'machine',
        sets: 2,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Hamstring pump set. Constant tension, no swinging. Complement lying curl angle',
        alternatives: [
          { name: 'Lying Leg Curl', equipment: 'machine' },
          { name: 'Cable Leg Curl', equipment: 'cable' },
          { name: 'Nordic Curl', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Standing Calf Raise',
        equipment: 'machine',
        sets: 4,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Gastrocnemius focus. Full stretch at bottom, pause at top. Higher reps than power day',
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
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Soleus pump set. Full ROM, 2 sec pause at stretch. High reps for time under tension',
        alternatives: [
          { name: 'Standing Calf Raise', equipment: 'machine' },
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Smith Machine Calf Raise', equipment: 'smith' },
        ],
      },
    ],
  },
  {
    day: 'SAT',
    name: 'Hypertrophy Chest & Arms',
    type: 'chest',
    focus:
      'Speed bench + high-volume chest, bicep & tricep work for upper-body growth',
    warmup:
      '1-2 light sets of DB press + band pull-aparts + tricep pushdowns x15',
    exercises: [
      {
        name: 'Flat Dumbbell Press (speed)',
        equipment: 'dumbbell',
        sets: 6,
        reps: '3',
        rest: 90,
        rir: '3-4',
        compound: true,
        notes:
          'Speed work — use 65-70% of power day DB equivalent. Explosive press, controlled eccentric. Focus on speed & power',
        alternatives: [
          { name: 'Flat Barbell Bench (speed)', equipment: 'barbell' },
          { name: 'Machine Chest Press (speed)', equipment: 'machine' },
          { name: 'Floor Press (speed)', equipment: 'barbell' },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes:
          '30-45 deg incline. Upper chest emphasis. Control the eccentric, stretch at bottom',
        alternatives: [
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Incline Machine Press', equipment: 'machine' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Hammer Strength Chest Press',
        equipment: 'machine',
        sets: 3,
        reps: '12-15',
        rest: 90,
        rir: '0-1',
        notes:
          'Chest volume on machine for safety at higher reps. Full ROM, squeeze at lockout',
        alternatives: [
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Smith Machine Bench', equipment: 'smith' },
        ],
      },
      {
        name: 'Cable Fly',
        equipment: 'cable',
        sets: 2,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Chest isolation pump set. Slight bend in elbows, squeeze at peak. Constant cable tension',
        alternatives: [
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'DB Fly', equipment: 'dumbbell' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Preacher Curl',
        equipment: 'ez_bar',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Primary bicep builder. Full stretch at bottom, squeeze at top. No swinging possible — strict form',
        alternatives: [
          { name: 'Machine Preacher Curl', equipment: 'machine' },
          { name: 'DB Preacher Curl', equipment: 'dumbbell' },
          { name: 'Cable Preacher Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'DB Concentration Curl',
        equipment: 'dumbbell',
        sets: 2,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Seated, elbow on inner thigh. Peak contraction focus. Supinate fully at top',
        alternatives: [
          { name: 'Incline Dumbbell Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Hammer Curl', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Spider Curl',
        equipment: 'ez_bar',
        sets: 2,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Chest on incline bench, arms hanging. Bicep pump finisher. Constant tension throughout ROM',
        alternatives: [
          { name: 'Cable Curl (high rep)', equipment: 'cable' },
          { name: 'Machine Curl', equipment: 'machine' },
          { name: 'Bayesian Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'Skull Crushers',
        equipment: 'ez_bar',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Primary tricep builder. Lower to forehead, keep elbows tucked. Lighter than power day, more reps',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Close-Grip Bench Press', equipment: 'barbell' },
          { name: 'Overhead Tricep Extension', equipment: 'cable' },
        ],
      },
      {
        name: 'Cable Pushdown',
        equipment: 'cable',
        sets: 2,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Rope or V-bar attachment. Spread at bottom for full contraction. Lateral head emphasis',
        alternatives: [
          { name: 'Tricep Pushdown (V-bar)', equipment: 'cable' },
          { name: 'Machine Dip', equipment: 'machine' },
          { name: 'Diamond Push-ups', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Overhead Cable Extension',
        equipment: 'cable',
        sets: 2,
        reps: '15-20',
        rest: 60,
        rir: '0-1',
        notes:
          'Long head tricep pump finisher. Full stretch overhead, squeeze at lockout. Constant cable tension',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'DB Overhead Extension', equipment: 'dumbbell' },
          { name: 'Skull Crusher', equipment: 'ez_bar' },
        ],
      },
    ],
  },
]

export const phat: ProgramTemplate = {
  meta: {
    id: 'phat',
    name: 'PHAT',
    author: 'Layne Norton',
    gender: 'unisex',
    difficulty: 'advanced',
    daysPerWeek: 5,
    description:
      "Layne Norton's Power Hypertrophy Adaptive Training. Combines power days (heavy compound lifts) with hypertrophy days (volume work + speed sets). 5 days/week for advanced lifters.",
    tags: ['powerbuilding', 'hypertrophy', 'strength', 'advanced'],
  },
  days,
  defaultRestDays: [2, 6],
}

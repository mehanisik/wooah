import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Upper A',
    type: 'upper',
    focus: 'Torso emphasis — horizontal press & row with shoulder isolation',
    warmup:
      '2-3 ramp-up sets of bench press (bar x10, 50% x8, 75% x5) + band pull-aparts x15',
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
          'Primary horizontal press. Control the eccentric (2-3 sec), drive through chest. Add 2.5kg when top of rep range is hit across all sets',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Smith Machine Bench Press', equipment: 'smith' },
        ],
      },
      {
        name: 'Seated Cable Row',
        equipment: 'cable',
        sets: 4,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Pull to lower chest, retract scapulae fully. Full stretch forward on eccentric. Match volume to pressing',
        alternatives: [
          { name: 'Machine Row', equipment: 'machine' },
          { name: 'Chest-Supported Row', equipment: 'dumbbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
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
          'Upper chest focus. 30-45 deg incline, full stretch at bottom. Secondary pressing volume for torso day',
        alternatives: [
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Incline Machine Press', equipment: 'machine' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Lat Pulldown (wide)',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Full stretch at top, squeeze lats at bottom. Lean back slightly, drive elbows down',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Machine Pulldown', equipment: 'machine' },
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
        ],
      },
      {
        name: 'Lateral Raises',
        equipment: 'dumbbell',
        sets: 3,
        reps: '12-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Side delt isolation. Light weight, strict form — no momentum. Slight forward lean targets medial head. Weak-point: add a 4th set if delts lag',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
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
          'Rear delt & external rotation health. High anchor, pull to forehead, externally rotate at end. Prehab essential — never skip',
        alternatives: [
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Band Pull-Apart', equipment: 'bodyweight' },
          { name: 'Rear Delt Fly', equipment: 'dumbbell' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Lower A',
    type: 'lower',
    focus: 'Quad emphasis — squat pattern with pressing accessories',
    warmup:
      '2-3 ramp-up sets of squat (bar x10, 50% x8, 75% x5) + leg swings + glute activation',
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
          'Primary quad builder. High bar position, full depth (hip crease below knee). Add 2.5kg when top of rep range is hit across all sets',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Front Squat', equipment: 'barbell' },
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
          'Feet mid-low on platform for quad bias. Full ROM — do not cut depth. Secondary quad volume after squats',
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
          'Quad isolation finisher. Squeeze at top, 1 sec hold. Slow eccentric (3 sec). Weak-point: add drop set on last set if quads lag',
        alternatives: [
          { name: 'Sissy Squat', equipment: 'bodyweight' },
          { name: 'Reverse Nordic', equipment: 'bodyweight' },
          { name: 'Spanish Squat', equipment: 'bodyweight' },
        ],
      },
      {
        name: 'Walking Lunges',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12 /leg',
        rest: 90,
        rir: '1-2',
        notes:
          'Unilateral quad & glute work. Upright torso, controlled step. Shorter stride = more quad, longer stride = more glute',
        alternatives: [
          { name: 'Reverse Lunge', equipment: 'dumbbell' },
          { name: 'Step-up', equipment: 'dumbbell' },
          { name: 'Front Foot Elevated Split Squat', equipment: 'dumbbell' },
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
          'Gastrocnemius emphasis. Full stretch at bottom (2 sec), squeeze at top (1 sec). Straight knees throughout',
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
    focus: 'Arms emphasis — compound pulls & presses with direct arm work',
    warmup: '1-2 light sets of cable row + band dislocates + light curls x10',
    exercises: [
      {
        name: 'Barbell Bent-over Row',
        equipment: 'barbell',
        sets: 4,
        reps: '6-8',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Primary pull. Overhand grip, 45-deg torso angle, pull to lower chest. Controls the eccentric — no bouncing. Add 2.5kg when top of rep range is hit',
        alternatives: [
          { name: 'Pendlay Row', equipment: 'barbell' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'Machine Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Dumbbell Overhead Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Seated or standing. Full lockout overhead, controlled descent to ear level. Primary pressing on arm day — keeps shoulder volume balanced',
        alternatives: [
          { name: 'Standing Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
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
          'Chest isolation. Mid-height pulleys, slight forward lean. Squeeze & hold 1 sec at peak contraction, slow eccentric (3 sec)',
        alternatives: [
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'DB Fly', equipment: 'dumbbell' },
          { name: 'Machine Fly', equipment: 'machine' },
        ],
      },
      {
        name: 'Chin-ups',
        equipment: 'bodyweight',
        sets: 3,
        reps: '6-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'Supinated grip — lat & bicep emphasis. Full dead hang at bottom, chin over bar. Add weight belt when 10 reps is easy. Sub lat pulldown if needed',
        alternatives: [
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Machine Pulldown', equipment: 'machine' },
          { name: 'Assisted Chin-ups', equipment: 'machine' },
        ],
      },
      {
        name: 'Barbell Curl',
        equipment: 'ez_bar',
        sets: 3,
        reps: '8-12',
        rest: 90,
        rir: '0-1',
        notes:
          'EZ bar preferred for wrist comfort. Strict form — pin elbows to sides, no swinging. Full extension at bottom, squeeze at top',
        alternatives: [
          { name: 'Straight Bar Curl', equipment: 'barbell' },
          { name: 'Cable Curl', equipment: 'cable' },
          { name: 'Preacher Curl', equipment: 'ez_bar' },
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
          'Long head emphasis — rope or straight bar, full stretch overhead. Keep elbows pointed forward, extend fully. Weak-point: swap to French press for more stretch',
        alternatives: [
          { name: 'French Press', equipment: 'ez_bar' },
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Cable Overhead Extension', equipment: 'cable' },
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
          'Brachialis & brachioradialis development. Neutral grip, strict form. Alternating or simultaneous. Builds arm thickness',
        alternatives: [
          { name: 'Cross-Body Curl', equipment: 'dumbbell' },
          { name: 'Rope Curl', equipment: 'cable' },
          { name: 'Reverse Curl', equipment: 'ez_bar' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Lower B',
    type: 'lower',
    focus: 'Glute-ham emphasis — hip hinge pattern with posterior accessories',
    warmup:
      '2-3 ramp-up sets of RDL (40% x10, 60% x8, 80% x5) + hip circles + glute bridges x15',
    exercises: [
      {
        name: 'Romanian Deadlift',
        equipment: 'barbell',
        sets: 4,
        reps: '8-10',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'Primary hip hinge. Soft knee bend, hinge until deep hamstring stretch. Keep bar close to body. Add 2.5kg when top of rep range is hit across all sets',
        alternatives: [
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Good Morning', equipment: 'barbell' },
        ],
      },
      {
        name: 'Barbell Hip Thrust',
        equipment: 'barbell',
        sets: 4,
        reps: '8-12',
        rest: 120,
        rir: '1-2',
        notes:
          'Primary glute builder. Pad the bar, drive through heels, squeeze glutes 2 sec at top. Posterior pelvic tilt at lockout. Weak-point: add band around knees for abduction cue',
        alternatives: [
          { name: 'Machine Hip Thrust', equipment: 'machine' },
          { name: 'Glute Bridge', equipment: 'bodyweight' },
          { name: 'Cable Pull-Through', equipment: 'cable' },
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
          'Hamstring isolation. Slow eccentric (3 sec), full ROM. Seated variation provides greater stretch. Weak-point: add partial reps at end of last set',
        alternatives: [
          { name: 'Nordic Curl', equipment: 'bodyweight' },
          { name: 'GHR', equipment: 'bodyweight' },
          { name: 'Lying Leg Curl', equipment: 'machine' },
        ],
      },
      {
        name: 'Bulgarian Split Squat',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-10 /leg',
        rest: 90,
        rir: '1-2',
        notes:
          'Rear foot elevated on bench. Upright torso for quad, forward lean for glute. Unilateral work addresses imbalances. Control the descent',
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
        rest: 60,
        rir: '0-1',
        notes:
          'Soleus emphasis (bent knee). Full stretch at bottom (2 sec), squeeze at top. Pairs with standing calf raise on Lower A for complete calf development',
        alternatives: [
          { name: 'Leg Press Calf Raise', equipment: 'machine' },
          { name: 'Standing Calf Raise', equipment: 'machine' },
          { name: 'Donkey Calf Raise', equipment: 'machine' },
        ],
      },
    ],
  },
]

export const albertoNunezUl: ProgramTemplate = {
  meta: {
    id: 'alberto-nunez-ul',
    name: 'Alberto Nunez Upper/Lower',
    author: 'Alberto Nunez',
    gender: 'unisex',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    description:
      "Alberto Nunez's Upper/Lower split from 3DMJ. Clean hypertrophy programming with weak-point customization. Alternates torso/arm upper days and quad/glute-ham lower days.",
    tags: ['hypertrophy', 'bodybuilding', 'upper/lower'],
  },
  days,
  defaultRestDays: [2, 5, 6],
}

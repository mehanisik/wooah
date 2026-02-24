import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Full Body A',
    type: 'full',
    focus: 'Squat & bench foundation + back thickness and arm work',
    warmup:
      '5 min light cardio, then 2 ramp-up sets of squat (bar x10, 60% x8). Use MAPS tempo: 3 sec down, 1 sec pause, 2 sec up',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec pause at bottom, 2 sec concentric. Full depth, control the weight',
        alternatives: [
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Smith Machine Squat', equipment: 'smith' },
          { name: 'Leg Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec pause at chest, 2 sec concentric. Retract scapulae, arch slightly',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor Press', equipment: 'barbell' },
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
          'MAPS tempo: 3 sec eccentric, 1 sec squeeze at top, 2 sec concentric. Overhand grip, pull to lower chest',
        alternatives: [
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
          { name: 'Machine Row', equipment: 'machine' },
        ],
      },
      {
        name: 'Dumbbell Lateral Raise',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec hold at top, 2 sec concentric. Slight lean forward, lead with elbows',
        alternatives: [
          { name: 'Cable Lateral Raise', equipment: 'cable' },
          { name: 'Machine Lateral Raise', equipment: 'machine' },
          { name: 'DB Y-Raise', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Barbell Curl',
        equipment: 'barbell',
        sets: 2,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec squeeze at top, 2 sec concentric. Strict form, no swinging',
        alternatives: [
          { name: 'EZ Bar Curl', equipment: 'ez_bar' },
          { name: 'DB Curl', equipment: 'dumbbell' },
          { name: 'Cable Curl', equipment: 'cable' },
        ],
      },
      {
        name: 'Tricep Pushdown',
        equipment: 'cable',
        sets: 2,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec squeeze at bottom, 2 sec concentric. Rope or straight bar attachment',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Overhead Tricep Extension', equipment: 'cable' },
          { name: 'Diamond Push-ups', equipment: 'bodyweight' },
        ],
      },
    ],
  },
  {
    day: 'WED',
    name: 'Full Body B',
    type: 'full',
    focus: 'Deadlift & OHP foundation + lat width and leg volume',
    warmup:
      '5 min light cardio, then 2 ramp-up sets of deadlift (40% x8, 65% x5). Use MAPS tempo: 3 sec down, 1 sec pause, 2 sec up',
    exercises: [
      {
        name: 'Conventional Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '6-8',
        rest: 150,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric (controlled lower), 1 sec pause at floor, 2 sec concentric. Brace hard, hinge at hips',
        alternatives: [
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Rack Pull', equipment: 'barbell' },
        ],
      },
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec pause at shoulders, 2 sec concentric. Squeeze glutes, brace core throughout',
        alternatives: [
          { name: 'Seated Dumbbell OHP', equipment: 'dumbbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Arnold Press', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec stretch at top, 2 sec concentric. Wide grip, pull to upper chest, squeeze lats',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Close-Grip Pulldown', equipment: 'cable' },
          { name: 'Machine Pulldown', equipment: 'machine' },
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
          'MAPS tempo: 3 sec eccentric, 1 sec pause at bottom, 2 sec concentric. Mid-high foot placement, full ROM',
        alternatives: [
          { name: 'Hack Squat', equipment: 'machine' },
          { name: 'Pendulum Squat', equipment: 'machine' },
          { name: 'Belt Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Cable Fly',
        equipment: 'cable',
        sets: 2,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric (stretch), 1 sec squeeze at center, 2 sec concentric. Slight elbow bend, feel the stretch',
        alternatives: [
          { name: 'Pec Deck', equipment: 'machine' },
          { name: 'DB Fly', equipment: 'dumbbell' },
          { name: 'Low-to-High Cable Fly', equipment: 'cable' },
        ],
      },
      {
        name: 'Hammer Curl',
        equipment: 'dumbbell',
        sets: 2,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec squeeze at top, 2 sec concentric. Neutral grip, targets brachialis and forearms',
        alternatives: [
          { name: 'Rope Cable Curl', equipment: 'cable' },
          { name: 'Cross-Body Hammer Curl', equipment: 'dumbbell' },
          { name: 'Reverse Curl', equipment: 'ez_bar' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Full Body C',
    type: 'full',
    focus: 'Front squat & incline press + posterior chain and rear delts',
    warmup:
      '5 min light cardio, then 2 ramp-up sets of front squat (bar x10, 60% x8). Use MAPS tempo: 3 sec down, 1 sec pause, 2 sec up',
    exercises: [
      {
        name: 'Front Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec pause at bottom, 2 sec concentric. Clean grip or cross-arm, stay upright',
        alternatives: [
          { name: 'Goblet Squat', equipment: 'dumbbell' },
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Hack Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        equipment: 'dumbbell',
        sets: 3,
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec stretch at bottom, 2 sec concentric. 30-45 deg incline, upper chest focus',
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
        reps: '8-10',
        rest: 120,
        rir: '1-2',
        compound: true,
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec squeeze at chest, 2 sec concentric. V-handle or wide grip, retract scapulae',
        alternatives: [
          { name: 'Chest-Supported Row', equipment: 'machine' },
          { name: 'T-Bar Row', equipment: 'barbell' },
          { name: 'DB Row', equipment: 'dumbbell' },
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
          'MAPS tempo: 3 sec eccentric, 1 sec stretch at bottom, 2 sec concentric. Hinge at hips, feel hamstring stretch',
        alternatives: [
          { name: 'DB RDL', equipment: 'dumbbell' },
          { name: 'Stiff-Leg Deadlift', equipment: 'barbell' },
          { name: 'Good Morning', equipment: 'barbell' },
        ],
      },
      {
        name: 'Face Pulls',
        equipment: 'cable',
        sets: 2,
        reps: '12-15',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric, 1 sec hold with external rotation, 2 sec concentric. Pull to forehead, rotate hands outward',
        alternatives: [
          { name: 'Band Pull-Aparts', equipment: 'bodyweight' },
          { name: 'Reverse Pec Deck', equipment: 'machine' },
          { name: 'Reverse Fly', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Overhead Tricep Extension',
        equipment: 'cable',
        sets: 2,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'MAPS tempo: 3 sec eccentric (deep stretch), 1 sec stretch at bottom, 2 sec concentric. Rope attachment, stretch long head',
        alternatives: [
          { name: 'Skull Crushers', equipment: 'ez_bar' },
          { name: 'Tricep Pushdown', equipment: 'cable' },
          { name: 'Overhead DB Extension', equipment: 'dumbbell' },
        ],
      },
    ],
  },
]

export const mapsAnabolic: ProgramTemplate = {
  meta: {
    id: 'maps-anabolic',
    name: 'MAPS Anabolic',
    author: 'Mind Pump',
    gender: 'unisex',
    difficulty: 'beginner',
    daysPerWeek: 3,
    description:
      "Mind Pump's foundational hypertrophy program. 3-day full body with slow tempo lifting and progressive overload. Phased approach maximizes muscle growth signals.",
    tags: ['hypertrophy', 'full body', 'beginner'],
  },
  days,
  defaultRestDays: [1, 3, 5, 6],
}

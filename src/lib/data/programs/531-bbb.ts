import type { Day } from '@/lib/data/program'
import type { ProgramTemplate } from './types'

const days: Day[] = [
  {
    day: 'MON',
    name: 'Squat',
    type: 'lower',
    focus: 'Heavy squat 5/3/1 + Boring But Big 5x10 squat volume & accessories',
    warmup:
      '3 ramp-up sets of squat (bar x10, 40% x5, 60% x3) then 1-2 jumps or box jumps',
    exercises: [
      {
        name: 'Barbell Back Squat',
        equipment: 'barbell',
        sets: 3,
        reps: '5/3/1+',
        rest: 180,
        rir: '0',
        amrap: true,
        compound: true,
        notes:
          '5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP',
        alternatives: [
          { name: 'Safety Bar Squat', equipment: 'barbell' },
          { name: 'Front Squat', equipment: 'barbell' },
          { name: 'Hack Squat', equipment: 'machine' },
        ],
      },
      {
        name: 'Barbell Back Squat (BBB)',
        equipment: 'barbell',
        sets: 5,
        reps: '10',
        rest: 120,
        rir: '2-3',
        compound: true,
        notes:
          'Boring But Big supplemental. 50-60% of training max. Focus on controlled reps, not grinding. Superset with abs if needed',
        alternatives: [
          { name: 'Front Squat', equipment: 'barbell' },
          { name: 'Leg Press', equipment: 'machine' },
          { name: 'Safety Bar Squat', equipment: 'barbell' },
        ],
      },
      {
        name: 'Hanging Leg Raise',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Core work. Control the movement, no swinging. Bend knees to regress',
        alternatives: [
          { name: 'Ab Wheel Rollout', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
          { name: 'Weighted Plank', equipment: 'bodyweight' },
        ],
      },
    ],
  },
  {
    day: 'TUE',
    name: 'Bench Press',
    type: 'upper',
    focus:
      'Heavy bench press 5/3/1 + Boring But Big 5x10 bench volume & upper accessories',
    warmup:
      '3 ramp-up sets of bench press (bar x10, 40% x5, 60% x3) + band pull-aparts',
    exercises: [
      {
        name: 'Flat Barbell Bench Press',
        equipment: 'barbell',
        sets: 3,
        reps: '5/3/1+',
        rest: 180,
        rir: '0',
        amrap: true,
        compound: true,
        notes:
          '5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
          { name: 'Floor Press', equipment: 'barbell' },
        ],
      },
      {
        name: 'Flat Barbell Bench Press (BBB)',
        equipment: 'barbell',
        sets: 5,
        reps: '10',
        rest: 120,
        rir: '2-3',
        compound: true,
        notes:
          'Boring But Big supplemental. 50-60% of training max. Keep arch and leg drive, accumulate volume',
        alternatives: [
          { name: 'DB Bench Press', equipment: 'dumbbell' },
          { name: 'Incline Barbell Press', equipment: 'barbell' },
          { name: 'Machine Chest Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Dumbbell Row',
        equipment: 'dumbbell',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        compound: true,
        notes:
          'Upper back balance for pressing. Pull to hip, squeeze lat at top',
        alternatives: [
          { name: 'Barbell Bent-over Row', equipment: 'barbell' },
          { name: 'Chest-Supported Row', equipment: 'machine' },
          { name: 'Seated Cable Row', equipment: 'cable' },
        ],
      },
    ],
  },
  {
    day: 'THU',
    name: 'Deadlift',
    type: 'lower',
    focus:
      'Heavy deadlift 5/3/1 + Boring But Big 5x10 deadlift volume & accessories',
    warmup:
      '3 ramp-up sets of deadlift (bar x5, 40% x5, 60% x3) then 1-2 broad jumps',
    exercises: [
      {
        name: 'Conventional Deadlift',
        equipment: 'barbell',
        sets: 3,
        reps: '5/3/1+',
        rest: 180,
        rir: '0',
        amrap: true,
        compound: true,
        notes:
          '5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP. Reset each rep',
        alternatives: [
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
          { name: 'Rack Pull', equipment: 'barbell' },
        ],
      },
      {
        name: 'Conventional Deadlift (BBB)',
        equipment: 'barbell',
        sets: 5,
        reps: '10',
        rest: 120,
        rir: '2-3',
        compound: true,
        notes:
          'Boring But Big supplemental. 50-60% of training max. Maintain form, reset between reps if needed. Can sub RDL if back fatigue is high',
        alternatives: [
          { name: 'Romanian Deadlift', equipment: 'barbell' },
          { name: 'Sumo Deadlift', equipment: 'barbell' },
          { name: 'Trap Bar Deadlift', equipment: 'barbell' },
        ],
      },
      {
        name: 'Ab Wheel Rollout',
        equipment: 'bodyweight',
        sets: 3,
        reps: '10-15',
        rest: 60,
        rir: '0-1',
        notes:
          'Core stability. From knees to start, progress to standing. Brace hard, slow eccentric',
        alternatives: [
          { name: 'Hanging Leg Raise', equipment: 'bodyweight' },
          { name: 'Cable Crunch', equipment: 'cable' },
          { name: 'Decline Sit-ups', equipment: 'bodyweight' },
        ],
      },
    ],
  },
  {
    day: 'FRI',
    name: 'Overhead Press',
    type: 'upper',
    focus:
      'Heavy OHP 5/3/1 + Boring But Big 5x10 press volume & upper accessories',
    warmup:
      '3 ramp-up sets of OHP (bar x10, 40% x5, 60% x3) + shoulder dislocates',
    exercises: [
      {
        name: 'Standing Barbell OHP',
        equipment: 'barbell',
        sets: 3,
        reps: '5/3/1+',
        rest: 180,
        rir: '0',
        amrap: true,
        compound: true,
        notes:
          '5/3/1 main lift. Week 1: 65/75/85% x5+. Week 2: 70/80/90% x3+. Week 3: 75/85/95% x1+. Last set is AMRAP. Strict press, no leg drive',
        alternatives: [
          { name: 'Seated Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
          { name: 'Seated Dumbbell OHP', equipment: 'dumbbell' },
        ],
      },
      {
        name: 'Standing Barbell OHP (BBB)',
        equipment: 'barbell',
        sets: 5,
        reps: '10',
        rest: 120,
        rir: '2-3',
        compound: true,
        notes:
          'Boring But Big supplemental. 50-60% of training max. Maintain strict form, brace core each rep',
        alternatives: [
          { name: 'Seated Dumbbell OHP', equipment: 'dumbbell' },
          { name: 'Seated Barbell OHP', equipment: 'barbell' },
          { name: 'Machine Shoulder Press', equipment: 'machine' },
        ],
      },
      {
        name: 'Lat Pulldown',
        equipment: 'cable',
        sets: 3,
        reps: '10-12',
        rest: 90,
        rir: '1-2',
        notes:
          'Back width. Full stretch at top, squeeze lats at bottom. Shoulder-width or wide grip',
        alternatives: [
          { name: 'Pull-ups', equipment: 'bodyweight' },
          { name: 'Chin-ups', equipment: 'bodyweight' },
          { name: 'Machine Pulldown', equipment: 'machine' },
        ],
      },
    ],
  },
]

export const fiveThreeOneBbb: ProgramTemplate = {
  meta: {
    id: '531-bbb',
    name: '5/3/1 Boring But Big',
    author: 'Jim Wendler',
    gender: 'unisex',
    difficulty: 'intermediate',
    daysPerWeek: 4,
    description:
      "Jim Wendler's classic 5/3/1 with Boring But Big supplemental. 4 days/week with 5x10 volume work after main lifts. Simple, effective strength + size.",
    tags: ['strength', 'powerlifting', 'periodization'],
  },
  days,
  defaultRestDays: [2, 5, 6],
}

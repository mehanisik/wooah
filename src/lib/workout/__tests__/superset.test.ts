import { describe, expect, it } from 'vitest'
import type { Day } from '@/lib/data/program'
import {
  getSupersetPartner,
  isSupersetExercise,
  SUPERSET_REST_SEC,
  SUPERSET_TRANSITION_SEC,
} from '../superset'

describe('superset constants', () => {
  it('has transition time', () => {
    expect(SUPERSET_TRANSITION_SEC).toBe(15)
  })

  it('has rest time', () => {
    expect(SUPERSET_REST_SEC).toBe(90)
  })
})

const mockDay: Day = {
  day: 'Monday',
  name: 'Push',
  type: 'push',
  focus: 'Chest & Triceps',
  exercises: [
    {
      name: 'Bench Press',
      equipment: 'barbell',
      sets: 4,
      reps: '6-8',
      rest: 180,
      rir: '1-2',
      compound: true,
    },
    {
      name: 'Lateral Raise',
      equipment: 'dumbbell',
      sets: 3,
      reps: '12-15',
      rest: 60,
      rir: '1',
      superset: 3,
    },
    {
      name: 'Overhead Extension',
      equipment: 'cable',
      sets: 3,
      reps: '12-15',
      rest: 90,
      rir: '1',
      superset: 2,
    },
  ],
}

describe('isSupersetExercise', () => {
  it('returns false for non-superset exercise', () => {
    expect(isSupersetExercise(mockDay, 0)).toBe(false)
  })

  it('returns true for superset exercise', () => {
    expect(isSupersetExercise(mockDay, 1)).toBe(true)
    expect(isSupersetExercise(mockDay, 2)).toBe(true)
  })
})

describe('getSupersetPartner', () => {
  it('returns null for non-superset exercise', () => {
    expect(getSupersetPartner(mockDay, 0)).toBeNull()
  })

  it('returns partner index for first in pair', () => {
    expect(getSupersetPartner(mockDay, 1)).toBe(2)
  })

  it('returns partner index for second in pair', () => {
    expect(getSupersetPartner(mockDay, 2)).toBe(1)
  })
})

import { describe, expect, it } from 'vitest'
import { PROGRAM } from '@/lib/data/program'
import { SUPERSET_REST_SEC, SUPERSET_TRANSITION_SEC } from '../superset'

describe('superset constants', () => {
  it('has transition time', () => {
    expect(SUPERSET_TRANSITION_SEC).toBe(15)
  })

  it('has rest time', () => {
    expect(SUPERSET_REST_SEC).toBe(90)
  })
})

describe('PROGRAM superset data', () => {
  it('has superset exercises', () => {
    let found = false
    for (const day of PROGRAM) {
      for (const ex of day.exercises) {
        if (ex.superset != null) {
          found = true
          expect(typeof ex.superset).toBe('number')
        }
      }
    }
    expect(found).toBe(true)
  })

  it('superset pairs exist', () => {
    for (const day of PROGRAM) {
      const supersets = new Map<number, number>()
      day.exercises.forEach((ex, i) => {
        if (ex.superset != null) {
          const prev = supersets.get(ex.superset)
          if (prev != null) {
            expect(prev).not.toBe(i)
          }
          supersets.set(ex.superset, i)
        }
      })
    }
  })
})

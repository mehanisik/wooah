import { describe, expect, it } from 'vitest'
import { PROGRAM } from '../program'

describe('PROGRAM', () => {
  it('has 7 days', () => {
    expect(PROGRAM).toHaveLength(7)
  })

  it('day 6 is rest', () => {
    expect(PROGRAM[6].type).toBe('rest')
    expect(PROGRAM[6].exercises).toHaveLength(0)
  })

  it('workout days have exercises', () => {
    for (let i = 0; i < 6; i++) {
      expect(PROGRAM[i].exercises.length).toBeGreaterThan(0)
    }
  })

  it('all exercises have required fields', () => {
    for (const day of PROGRAM) {
      for (const ex of day.exercises) {
        expect(ex.name).toBeTruthy()
        expect(ex.equipment).toBeTruthy()
        expect(ex.sets).toBeGreaterThan(0)
        expect(ex.reps).toBeTruthy()
        expect(ex.rest).toBeGreaterThan(0)
        expect(ex.rir).toBeTruthy()
      }
    }
  })

  it('has Push/Pull/Legs types', () => {
    const types = new Set(PROGRAM.map((d) => d.type))
    expect(types.has('push')).toBe(true)
    expect(types.has('pull')).toBe(true)
    expect(types.has('legs')).toBe(true)
  })

  it('PPL order is correct', () => {
    expect(PROGRAM[0].type).toBe('push')
    expect(PROGRAM[1].type).toBe('pull')
    expect(PROGRAM[2].type).toBe('legs')
  })
})

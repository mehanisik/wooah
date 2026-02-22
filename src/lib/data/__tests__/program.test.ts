import { describe, expect, it } from 'vitest'
import { PROGRAM } from '../program'
import { getTemplate, getTemplateOrDefault } from '../programs/registry'
import { wooahPpl } from '../programs/wooah-ppl'

describe('PROGRAM', () => {
  it('has 6 training days', () => {
    expect(PROGRAM).toHaveLength(6)
  })

  it('all training days have exercises', () => {
    for (const day of PROGRAM) {
      expect(day.exercises.length).toBeGreaterThan(0)
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

describe('ProgramTemplate', () => {
  it('wooah-ppl has correct meta', () => {
    expect(wooahPpl.meta.id).toBe('wooah-ppl')
    expect(wooahPpl.meta.daysPerWeek).toBe(6)
    expect(wooahPpl.days).toHaveLength(6)
    expect(wooahPpl.defaultRestDays).toEqual([6])
  })

  it('registry returns wooah-ppl by id', () => {
    const template = getTemplate('wooah-ppl')
    expect(template).toBeDefined()
    expect(template?.meta.id).toBe('wooah-ppl')
  })

  it('registry returns default for unknown id', () => {
    const template = getTemplateOrDefault('nonexistent')
    expect(template.meta.id).toBe('wooah-ppl')
  })
})

import { describe, expect, it } from 'vitest'
import { generateWarmupSets } from '../warmup-calc'

describe('generateWarmupSets', () => {
  it('returns empty for 0 weight', () => {
    expect(generateWarmupSets(0, 'Bench')).toEqual([])
  })

  it('generates warmup for light weight', () => {
    const sets = generateWarmupSets(50, 'Bench Press')
    expect(sets.length).toBeGreaterThan(0)
    expect(sets[0].weight).toBeLessThan(50)
  })

  it('generates more sets for heavy weight', () => {
    const light = generateWarmupSets(40, 'Bench')
    const heavy = generateWarmupSets(150, 'Squat')
    expect(heavy.length).toBeGreaterThanOrEqual(light.length)
  })

  it('all warmup weights are below working weight', () => {
    const sets = generateWarmupSets(100, 'Squat')
    for (const set of sets) {
      expect(set.weight).toBeLessThan(100)
    }
  })

  it('rounds to 2.5kg increments', () => {
    const sets = generateWarmupSets(80, 'Bench')
    for (const set of sets) {
      expect(set.weight % 2.5).toBe(0)
    }
  })
})

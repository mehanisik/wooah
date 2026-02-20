import { describe, expect, it } from 'vitest'
import { getReadinessZone } from '../readiness'

describe('getReadinessZone', () => {
  it('returns rest zone for low scores', () => {
    const result = getReadinessZone(25)
    expect(result.zone).toBe('rest')
  })

  it('returns light zone for moderate-low scores', () => {
    const result = getReadinessZone(45)
    expect(result.zone).toBe('light')
  })

  it('returns normal zone for moderate scores', () => {
    const result = getReadinessZone(65)
    expect(result.zone).toBe('normal')
  })

  it('returns push zone for high scores', () => {
    const result = getReadinessZone(85)
    expect(result.zone).toBe('push')
  })

  it('has a label for each zone', () => {
    for (const score of [20, 45, 65, 85]) {
      const result = getReadinessZone(score)
      expect(result.label).toBeTruthy()
    }
  })
})

import { describe, expect, it } from 'vitest'
import { MUSCLE_GROUPS, MUSCLE_MAP, VOLUME_LANDMARKS } from '../muscles'

describe('MUSCLE_MAP', () => {
  it('has entries', () => {
    expect(Object.keys(MUSCLE_MAP).length).toBeGreaterThan(50)
  })

  it('all primary muscles are valid groups', () => {
    for (const [_name, mapping] of Object.entries(MUSCLE_MAP)) {
      for (const m of mapping.primary) {
        expect(MUSCLE_GROUPS).toContain(m)
      }
    }
  })

  it('all secondary muscles are valid groups', () => {
    for (const [_name, mapping] of Object.entries(MUSCLE_MAP)) {
      for (const m of mapping.secondary) {
        expect(MUSCLE_GROUPS).toContain(m)
      }
    }
  })
})

describe('VOLUME_LANDMARKS', () => {
  it('has landmarks for all muscle groups', () => {
    for (const g of MUSCLE_GROUPS) {
      expect(VOLUME_LANDMARKS[g]).toBeDefined()
      expect(VOLUME_LANDMARKS[g].mev).toBeLessThanOrEqual(
        VOLUME_LANDMARKS[g].mav
      )
      expect(VOLUME_LANDMARKS[g].mav).toBeLessThanOrEqual(
        VOLUME_LANDMARKS[g].mrv
      )
    }
  })
})

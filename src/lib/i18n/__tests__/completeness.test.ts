import { describe, expect, it } from 'vitest'
import en from '../en'
import pl from '../pl'

describe('i18n completeness', () => {
  const enKeys = Object.keys(en) as (keyof typeof en)[]
  const plKeys = Object.keys(pl)

  it('PL has no missing keys that exist in EN', () => {
    const missing = enKeys.filter((k) => !(k in pl))
    expect(missing).toEqual([])
  })

  it('PL has no extra keys that do not exist in EN', () => {
    const extra = plKeys.filter((k) => !(k in en))
    expect(extra).toEqual([])
  })

  it('no EN values are empty strings', () => {
    const empty = enKeys.filter((k) => (en[k] as string) === '')
    expect(empty).toEqual([])
  })

  it('no PL values are empty strings', () => {
    const empty = plKeys.filter(
      (k) => (pl[k as keyof typeof pl] as string) === ''
    )
    expect(empty).toEqual([])
  })

  it('freestyle keys exist in EN', () => {
    const freestyleKeys = [
      'chooseWorkout',
      'scheduledToday',
      'switchDay',
      'trainAnyway',
      'startFreestyle',
      'freestyleDesc',
      'freestyleTitle',
      'addFirstExercise',
      'noExercisesYet',
      'removeExercise',
      'freestyleComplete',
    ] as const

    for (const key of freestyleKeys) {
      expect(en).toHaveProperty(key)
      expect(en[key]).not.toBe('')
    }
  })

  it('freestyle keys exist in PL', () => {
    const freestyleKeys = [
      'chooseWorkout',
      'scheduledToday',
      'switchDay',
      'trainAnyway',
      'startFreestyle',
      'freestyleDesc',
      'freestyleTitle',
      'addFirstExercise',
      'noExercisesYet',
      'removeExercise',
      'freestyleComplete',
    ] as const

    for (const key of freestyleKeys) {
      expect(pl).toHaveProperty(key)
      expect(pl[key]).not.toBe('')
    }
  })
})

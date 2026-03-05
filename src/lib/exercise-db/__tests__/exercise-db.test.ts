import { describe, expect, it } from 'vitest'
import {
  DAY_TYPE_MUSCLES,
  filterByMuscle,
  mapApiEquipment,
  mapApiMuscle,
  searchExercises,
} from '../../exercise-db'
import type { ExerciseDbEntry } from '../../exercise-db'

// Helper to create a minimal ExerciseDbEntry
function makeEntry(
  overrides: Partial<ExerciseDbEntry> & { name: string }
): ExerciseDbEntry {
  return {
    exerciseId: overrides.name.toLowerCase().replace(/\s/g, '-'),
    gifUrl: '',
    targetMuscles: [],
    bodyParts: [],
    equipments: [],
    secondaryMuscles: [],
    ...overrides,
  }
}

// ============================================================
// FAILURE / EDGE CASE TESTS
// ============================================================

describe('mapApiMuscle', () => {
  describe('failure / edge cases', () => {
    it('returns null for unknown muscle string', () => {
      expect(mapApiMuscle('supinator')).toBeNull()
      expect(mapApiMuscle('')).toBeNull()
      expect(mapApiMuscle('   ')).toBeNull()
    })

    it('is case-insensitive', () => {
      expect(mapApiMuscle('PECTORALIS MAJOR')).toBe('Chest')
      expect(mapApiMuscle('Latissimus Dorsi')).toBe('Back')
    })

    it('trims whitespace', () => {
      expect(mapApiMuscle('  chest  ')).toBe('Chest')
      expect(mapApiMuscle('\tquadriceps\n')).toBe('Quads')
    })

    it('returns null for partial matches', () => {
      // "pector" is not a valid key
      expect(mapApiMuscle('pector')).toBeNull()
    })
  })

  describe('happy path', () => {
    it('maps common muscles correctly', () => {
      expect(mapApiMuscle('chest')).toBe('Chest')
      expect(mapApiMuscle('quadriceps')).toBe('Quads')
      expect(mapApiMuscle('hamstrings')).toBe('Hamstrings')
      expect(mapApiMuscle('gluteus maximus')).toBe('Glutes')
      expect(mapApiMuscle('biceps brachii')).toBe('Biceps')
      expect(mapApiMuscle('triceps brachii')).toBe('Triceps')
    })
  })
})

describe('mapApiEquipment', () => {
  describe('failure / edge cases', () => {
    it('returns "machine" as default for unknown equipment', () => {
      expect(mapApiEquipment('unknown_thing')).toBe('machine')
      expect(mapApiEquipment('')).toBe('machine')
      expect(mapApiEquipment('foam roller')).toBe('machine')
    })

    it('is case-insensitive', () => {
      expect(mapApiEquipment('BARBELL')).toBe('barbell')
      expect(mapApiEquipment('Dumbbell')).toBe('dumbbell')
    })

    it('trims whitespace', () => {
      expect(mapApiEquipment('  cable  ')).toBe('cable')
    })
  })

  describe('happy path', () => {
    it('maps common equipment correctly', () => {
      expect(mapApiEquipment('barbell')).toBe('barbell')
      expect(mapApiEquipment('dumbbell')).toBe('dumbbell')
      expect(mapApiEquipment('cable')).toBe('cable')
      expect(mapApiEquipment('body weight')).toBe('bodyweight')
      expect(mapApiEquipment('e-z curl bar')).toBe('ez_bar')
      expect(mapApiEquipment('smith machine')).toBe('smith')
    })
  })
})

describe('DAY_TYPE_MUSCLES', () => {
  describe('failure / edge cases', () => {
    it('returns undefined for unknown day type', () => {
      expect(DAY_TYPE_MUSCLES['nonexistent']).toBeUndefined()
      expect(DAY_TYPE_MUSCLES['']).toBeUndefined()
    })

    it('freestyle has no day type mapping (empty/undefined)', () => {
      // Freestyle doesn't use a day type — any unknown key should be undefined
      expect(DAY_TYPE_MUSCLES['freestyle']).toBeUndefined()
    })
  })

  describe('coverage', () => {
    it('all defined day types have non-empty muscle arrays', () => {
      for (const [type, muscles] of Object.entries(DAY_TYPE_MUSCLES)) {
        expect(muscles.length, `${type} should have muscles`).toBeGreaterThan(0)
      }
    })

    it('push includes Chest and Triceps', () => {
      expect(DAY_TYPE_MUSCLES['push']).toContain('Chest')
      expect(DAY_TYPE_MUSCLES['push']).toContain('Triceps')
    })

    it('pull includes Back and Biceps', () => {
      expect(DAY_TYPE_MUSCLES['pull']).toContain('Back')
      expect(DAY_TYPE_MUSCLES['pull']).toContain('Biceps')
    })

    it('legs includes Quads and Glutes', () => {
      expect(DAY_TYPE_MUSCLES['legs']).toContain('Quads')
      expect(DAY_TYPE_MUSCLES['legs']).toContain('Glutes')
    })
  })
})

describe('searchExercises', () => {
  const entries: ExerciseDbEntry[] = [
    makeEntry({ name: 'Bench Press', targetMuscles: ['chest'] }),
    makeEntry({ name: 'Incline Bench Press', targetMuscles: ['chest'] }),
    makeEntry({ name: 'Deadlift', targetMuscles: ['hamstrings'] }),
    makeEntry({ name: 'Squat', targetMuscles: ['quadriceps'] }),
  ]

  describe('failure / edge cases', () => {
    it('returns all entries for empty query', () => {
      expect(searchExercises('', entries)).toEqual(entries)
    })

    it('returns all entries for whitespace-only query', () => {
      expect(searchExercises('   ', entries)).toEqual(entries)
    })

    it('returns empty for query that matches nothing', () => {
      expect(searchExercises('zzzzzz', entries)).toEqual([])
    })

    it('returns empty when entries list is empty', () => {
      expect(searchExercises('bench', [])).toEqual([])
    })
  })

  describe('happy path', () => {
    it('filters by name substring (case-insensitive)', () => {
      const result = searchExercises('bench', entries)
      expect(result).toHaveLength(2)
      expect(result.map((e) => e.name)).toEqual([
        'Bench Press',
        'Incline Bench Press',
      ])
    })

    it('finds exact name match', () => {
      const result = searchExercises('Deadlift', entries)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Deadlift')
    })
  })
})

describe('filterByMuscle', () => {
  const entries: ExerciseDbEntry[] = [
    makeEntry({
      name: 'Bench Press',
      targetMuscles: ['pectoralis major sternal head'],
      secondaryMuscles: ['triceps brachii'],
    }),
    makeEntry({
      name: 'Lat Pulldown',
      targetMuscles: ['latissimus dorsi'],
      secondaryMuscles: ['biceps brachii'],
    }),
    makeEntry({
      name: 'Squat',
      targetMuscles: ['quadriceps'],
      secondaryMuscles: ['gluteus maximus'],
    }),
  ]

  describe('failure / edge cases', () => {
    it('returns empty when no exercises match the muscle group', () => {
      expect(filterByMuscle('Calves', entries)).toEqual([])
    })

    it('returns empty when entries list is empty', () => {
      expect(filterByMuscle('Chest', [])).toEqual([])
    })

    it('includes exercises where muscle is only a secondary target', () => {
      // Triceps is secondary for Bench Press
      const result = filterByMuscle('Triceps', entries)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Bench Press')
    })
  })

  describe('happy path', () => {
    it('finds exercises by primary target muscle', () => {
      const result = filterByMuscle('Chest', entries)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Bench Press')
    })

    it('finds exercises by secondary muscle', () => {
      const result = filterByMuscle('Biceps', entries)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Lat Pulldown')
    })
  })
})

describe('freestyle muscle filtering bypass', () => {
  it('when isFreestyle=true, relevantMuscles is empty — all exercises shown', () => {
    // This tests the exact logic from ExerciseAddModal:
    // const isFreestyle = dayIdx < 0
    // const relevantMuscles = isFreestyle ? [] : (DAY_TYPE_MUSCLES[dayType] ?? [])
    const dayIdx = -1
    const dayType = 'push' // would normally filter
    const isFreestyleMode = dayIdx < 0
    const relevantMuscles = isFreestyleMode
      ? []
      : (DAY_TYPE_MUSCLES[dayType] ?? [])

    expect(relevantMuscles).toEqual([])

    // With empty relevantMuscles, ALL exercises are shown (no filtering)
    const allExercises = [
      makeEntry({ name: 'Bench Press', targetMuscles: ['chest'] }),
      makeEntry({ name: 'Squat', targetMuscles: ['quadriceps'] }),
      makeEntry({ name: 'Curl', targetMuscles: ['biceps brachii'] }),
    ]

    // Simulate the ExerciseAddModal filtering logic
    let filtered: ExerciseDbEntry[]
    if (relevantMuscles.length > 0) {
      filtered = allExercises.filter((e) => {
        const allMuscles = [...e.targetMuscles, ...e.secondaryMuscles]
        return allMuscles.some((m) => {
          const group = mapApiMuscle(m)
          return group && relevantMuscles.includes(group)
        })
      })
    } else {
      filtered = allExercises
    }

    expect(filtered).toHaveLength(3) // all exercises shown
  })

  it('when isFreestyle=false, only relevant muscles are shown', () => {
    const dayIdx = 0 // program day
    const dayType = 'push'
    const isFreestyleMode = dayIdx < 0
    const relevantMuscles = isFreestyleMode
      ? []
      : (DAY_TYPE_MUSCLES[dayType] ?? [])

    expect(relevantMuscles.length).toBeGreaterThan(0)

    const allExercises = [
      makeEntry({ name: 'Bench Press', targetMuscles: ['chest'] }),
      makeEntry({ name: 'Squat', targetMuscles: ['quadriceps'] }),
    ]

    let filtered: ExerciseDbEntry[]
    if (relevantMuscles.length > 0) {
      filtered = allExercises.filter((e) => {
        const allMuscles = [...e.targetMuscles, ...e.secondaryMuscles]
        return allMuscles.some((m) => {
          const group = mapApiMuscle(m)
          return group && relevantMuscles.includes(group)
        })
      })
    } else {
      filtered = allExercises
    }

    // Only bench press matches push muscles (chest), squat doesn't
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('Bench Press')
  })
})

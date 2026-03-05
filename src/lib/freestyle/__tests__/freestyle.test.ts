import { describe, expect, it } from 'vitest'

/**
 * Pure logic extracted from convex/freestyle.ts for testability.
 * These mirror the exact algorithms used in the Convex mutations.
 */

// --- dayIndex generation logic (mirrors createSession) ---
// Uses sessionType for classification and min(existing) - 1 to avoid gaps

function computeFreestyleDayIndex(
  existingSessions: { dayIndex: number; sessionType?: string }[]
): number {
  const freestyleIndices = existingSessions
    .filter((s) => s.sessionType === 'freestyle')
    .map((s) => s.dayIndex)
  return freestyleIndices.length > 0 ? Math.min(...freestyleIndices) - 1 : -1
}

// --- exercise reindex logic (mirrors removeExercise) ---

function reindexAfterRemoval(
  exercises: { id: string; exerciseIndex: number }[],
  removedIndex: number
): { id: string; newIndex: number }[] {
  return exercises
    .filter((e) => e.exerciseIndex > removedIndex)
    .sort((a, b) => a.exerciseIndex - b.exerciseIndex)
    .map((e) => ({ id: e.id, newIndex: e.exerciseIndex - 1 }))
}

// --- next exercise index logic (mirrors addExercise) ---

function computeNextExerciseIndex(
  existing: { exerciseIndex: number }[]
): number {
  if (existing.length === 0) return 0
  return Math.max(...existing.map((e) => e.exerciseIndex)) + 1
}

// --- isFreestyle guard (mirrors ExerciseAddModal) ---

function isFreestyle(dayIdx: number): boolean {
  return dayIdx < 0
}

// ============================================================
// FAILURE / EDGE CASE TESTS (as requested — failure tests first)
// ============================================================

describe('computeFreestyleDayIndex', () => {
  describe('failure / edge cases', () => {
    it('returns -1 when no sessions exist at all', () => {
      expect(computeFreestyleDayIndex([])).toBe(-1)
    })

    it('returns -1 when only program sessions exist', () => {
      const sessions = [
        { dayIndex: 0, sessionType: 'program' },
        { dayIndex: 1, sessionType: 'program' },
        { dayIndex: 2, sessionType: 'program' },
      ]
      expect(computeFreestyleDayIndex(sessions)).toBe(-1)
    })

    it('returns -1 when sessions have no sessionType', () => {
      const sessions = [{ dayIndex: 0 }, { dayIndex: 1 }]
      expect(computeFreestyleDayIndex(sessions)).toBe(-1)
    })

    it('ignores program sessions when computing min', () => {
      const sessions = [
        { dayIndex: 0, sessionType: 'program' },
        { dayIndex: 1, sessionType: 'program' },
        { dayIndex: -1, sessionType: 'freestyle' },
      ]
      expect(computeFreestyleDayIndex(sessions)).toBe(-2)
    })

    it('handles many freestyle sessions without collision', () => {
      const sessions = Array.from({ length: 10 }, (_, i) => ({
        dayIndex: -(i + 1),
        sessionType: 'freestyle' as const,
      }))
      // min is -10, so next is -11
      expect(computeFreestyleDayIndex(sessions)).toBe(-11)
    })

    it('handles mixed program and freestyle sessions', () => {
      const sessions = [
        { dayIndex: 0, sessionType: 'program' },
        { dayIndex: -1, sessionType: 'freestyle' },
        { dayIndex: 1, sessionType: 'program' },
        { dayIndex: -2, sessionType: 'freestyle' },
        { dayIndex: 2, sessionType: 'program' },
      ]
      // min of freestyle is -2, so next is -3
      expect(computeFreestyleDayIndex(sessions)).toBe(-3)
    })

    it('handles dayIndex = 0 correctly (not counted as freestyle without type)', () => {
      const sessions = [{ dayIndex: 0 }]
      expect(computeFreestyleDayIndex(sessions)).toBe(-1)
    })

    it('produces strictly decreasing sequence for consecutive calls', () => {
      const sessions: { dayIndex: number; sessionType: string }[] = []
      const indices: number[] = []

      for (let i = 0; i < 5; i++) {
        const idx = computeFreestyleDayIndex(sessions)
        indices.push(idx)
        sessions.push({ dayIndex: idx, sessionType: 'freestyle' })
      }

      expect(indices).toEqual([-1, -2, -3, -4, -5])
    })

    it('gaps in freestyle indices still produce correct next index (no collision)', () => {
      // If session with dayIndex -2 was deleted, we still have -1 and -3
      const sessions = [
        { dayIndex: -1, sessionType: 'freestyle' },
        { dayIndex: -3, sessionType: 'freestyle' },
      ]
      // min is -3, so next is -4 (no collision!)
      expect(computeFreestyleDayIndex(sessions)).toBe(-4)
    })
  })

  describe('happy path', () => {
    it('first freestyle session gets -1', () => {
      expect(computeFreestyleDayIndex([])).toBe(-1)
    })

    it('second freestyle session gets -2', () => {
      const sessions = [{ dayIndex: -1, sessionType: 'freestyle' }]
      expect(computeFreestyleDayIndex(sessions)).toBe(-2)
    })

    it('third freestyle session gets -3', () => {
      const sessions = [
        { dayIndex: -1, sessionType: 'freestyle' },
        { dayIndex: -2, sessionType: 'freestyle' },
      ]
      expect(computeFreestyleDayIndex(sessions)).toBe(-3)
    })
  })
})

describe('reindexAfterRemoval', () => {
  describe('failure / edge cases', () => {
    it('returns empty when no exercises remain after removal', () => {
      expect(reindexAfterRemoval([], 0)).toEqual([])
    })

    it('returns empty when all remaining exercises have lower indices', () => {
      const exercises = [
        { id: 'a', exerciseIndex: 0 },
        { id: 'b', exerciseIndex: 1 },
      ]
      // Removed index 2 — nothing above it
      expect(reindexAfterRemoval(exercises, 2)).toEqual([])
    })

    it('returns empty when removed index was the last', () => {
      const exercises = [
        { id: 'a', exerciseIndex: 0 },
        { id: 'b', exerciseIndex: 1 },
      ]
      // Removed index 2 (was 3rd exercise, already deleted)
      expect(reindexAfterRemoval(exercises, 2)).toEqual([])
    })

    it('handles removal of first exercise (index 0)', () => {
      const exercises = [
        { id: 'b', exerciseIndex: 1 },
        { id: 'c', exerciseIndex: 2 },
        { id: 'd', exerciseIndex: 3 },
      ]
      const result = reindexAfterRemoval(exercises, 0)
      expect(result).toEqual([
        { id: 'b', newIndex: 0 },
        { id: 'c', newIndex: 1 },
        { id: 'd', newIndex: 2 },
      ])
    })

    it('handles removal of middle exercise', () => {
      const exercises = [
        { id: 'a', exerciseIndex: 0 },
        { id: 'c', exerciseIndex: 2 },
        { id: 'd', exerciseIndex: 3 },
      ]
      const result = reindexAfterRemoval(exercises, 1)
      expect(result).toEqual([
        { id: 'c', newIndex: 1 },
        { id: 'd', newIndex: 2 },
      ])
    })

    it('handles removal of last exercise (nothing to reindex)', () => {
      const exercises = [
        { id: 'a', exerciseIndex: 0 },
        { id: 'b', exerciseIndex: 1 },
      ]
      const result = reindexAfterRemoval(exercises, 2)
      expect(result).toEqual([])
    })

    it('handles already-gapped indices correctly', () => {
      // Indices: 0, 3, 5 (gaps from prior removals)
      const exercises = [
        { id: 'a', exerciseIndex: 0 },
        { id: 'b', exerciseIndex: 3 },
        { id: 'c', exerciseIndex: 5 },
      ]
      // Remove the one at index 0
      const result = reindexAfterRemoval(exercises, 0)
      expect(result).toEqual([
        { id: 'b', newIndex: 2 },
        { id: 'c', newIndex: 4 },
      ])
    })

    it('preserves sort order when exercises arrive unsorted', () => {
      const exercises = [
        { id: 'c', exerciseIndex: 3 },
        { id: 'b', exerciseIndex: 2 },
        { id: 'a', exerciseIndex: 1 },
      ]
      const result = reindexAfterRemoval(exercises, 0)
      // Should sort by exerciseIndex before reindexing
      expect(result).toEqual([
        { id: 'a', newIndex: 0 },
        { id: 'b', newIndex: 1 },
        { id: 'c', newIndex: 2 },
      ])
    })

    it('single exercise remaining does not need reindex if below removed', () => {
      const exercises = [{ id: 'a', exerciseIndex: 0 }]
      expect(reindexAfterRemoval(exercises, 1)).toEqual([])
    })
  })
})

describe('computeNextExerciseIndex', () => {
  describe('failure / edge cases', () => {
    it('returns 0 when no exercises exist', () => {
      expect(computeNextExerciseIndex([])).toBe(0)
    })

    it('handles non-contiguous indices', () => {
      // After deletions, indices might be: 0, 3, 7
      const existing = [
        { exerciseIndex: 0 },
        { exerciseIndex: 3 },
        { exerciseIndex: 7 },
      ]
      expect(computeNextExerciseIndex(existing)).toBe(8)
    })

    it('handles single exercise at index 0', () => {
      expect(computeNextExerciseIndex([{ exerciseIndex: 0 }])).toBe(1)
    })

    it('handles exercises starting from non-zero index', () => {
      // Shouldn't happen normally, but defensive
      const existing = [{ exerciseIndex: 5 }, { exerciseIndex: 6 }]
      expect(computeNextExerciseIndex(existing)).toBe(7)
    })
  })

  describe('happy path', () => {
    it('increments from contiguous sequence', () => {
      const existing = [
        { exerciseIndex: 0 },
        { exerciseIndex: 1 },
        { exerciseIndex: 2 },
      ]
      expect(computeNextExerciseIndex(existing)).toBe(3)
    })
  })
})

describe('isFreestyle', () => {
  describe('failure / edge cases', () => {
    it('dayIdx = 0 is NOT freestyle', () => {
      expect(isFreestyle(0)).toBe(false)
    })

    it('positive dayIdx is NOT freestyle', () => {
      expect(isFreestyle(1)).toBe(false)
      expect(isFreestyle(5)).toBe(false)
      expect(isFreestyle(100)).toBe(false)
    })

    it('dayIdx = -1 IS freestyle', () => {
      expect(isFreestyle(-1)).toBe(true)
    })

    it('large negative dayIdx IS freestyle', () => {
      expect(isFreestyle(-100)).toBe(true)
    })
  })
})

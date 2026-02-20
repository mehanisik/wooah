'use client'

import { useEffect, useState } from 'react'
import { type ExerciseDbEntry, loadExerciseDb } from '@/lib/exercise-db'

export function useExerciseDb() {
  const [exercises, setExercises] = useState<ExerciseDbEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    // try reading localStorage cache synchronously
    try {
      const raw = localStorage.getItem('exercisedb_cache')
      if (raw) {
        const cached = JSON.parse(raw)
        if (cached?.entries?.length) {
          setExercises(cached.entries)
          setLoading(false)
        }
      }
    } catch {
      // ignore parse errors
    }

    loadExerciseDb()
      .then((entries) => {
        if (!cancelled) {
          setExercises(entries)
          setLoading(false)
          setError(null)
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load exercises'
          )
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { exercises, loading, error }
}

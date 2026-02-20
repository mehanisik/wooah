'use client'

import { useEffect, useState } from 'react'
import { getExerciseGif, normalize } from '@/lib/workout/exercise-api'

const CACHE_KEY = 'exercisedb_cache'

function findInCache(exerciseName: string): string | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    const entries = cached?.entries
    if (!Array.isArray(entries)) return null

    const lower = exerciseName.toLowerCase()
    const normalized = normalize(exerciseName)

    for (const e of entries) {
      const n = e.name?.toLowerCase()
      if (!n || !e.gifUrl) continue
      if (n === lower || n === normalized) return e.gifUrl
    }

    // partial: check if normalized name is contained in API name or vice versa
    for (const e of entries) {
      const n = e.name?.toLowerCase()
      if (!n || !e.gifUrl) continue
      if (n.includes(normalized) || normalized.includes(n)) return e.gifUrl
    }

    return null
  } catch {
    return null
  }
}

export function useExerciseGif(exerciseName: string, enabled: boolean) {
  const [gifUrl, setGifUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    const cached = findInCache(exerciseName)
    if (cached) {
      setGifUrl(cached)
      return
    }

    let cancelled = false

    // cache may still be loading from API — retry after delay
    const timer = setTimeout(() => {
      if (cancelled) return
      const retry = findInCache(exerciseName)
      if (retry) {
        setGifUrl(retry)
        return
      }
      getExerciseGif(exerciseName).then((url) => {
        if (!cancelled && url) setGifUrl(url)
      })
    }, 3000)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [exerciseName, enabled])

  return gifUrl
}

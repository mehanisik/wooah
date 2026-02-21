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
      if (!(n && e.gifUrl)) continue
      if (n === lower || n === normalized) return e.gifUrl
    }

    // partial: pick the shortest name that contains the normalized term (most specific match)
    let best: { url: string; len: number } | null = null
    for (const e of entries) {
      const n = e.name?.toLowerCase()
      if (!(n && e.gifUrl)) continue
      if (!n.includes(normalized)) continue
      if (!best || n.length < best.len) {
        best = { url: e.gifUrl, len: n.length }
      }
    }
    if (best) return best.url

    return null
  } catch {
    return null
  }
}

export function useExerciseGif(exerciseName: string) {
  const [gifUrl, setGifUrl] = useState<string | null>(() =>
    findInCache(exerciseName)
  )

  useEffect(() => {
    if (gifUrl) return

    const cached = findInCache(exerciseName)
    if (cached) {
      setGifUrl(cached)
      return
    }

    let cancelled = false

    // cache may still be loading from API — retry after short delay
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
    }, 1000)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [exerciseName, gifUrl])

  return gifUrl
}

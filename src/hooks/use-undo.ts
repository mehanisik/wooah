'use client'

import { useMutation } from 'convex/react'
import { useRef, useState } from 'react'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { api } from '../../convex/_generated/api'

interface SetLogData {
  weight: string
  reps: string
  done: boolean
}

interface UndoEntry {
  dayIdx: number
  exIdx: number
  setIdx: number
  previousData: SetLogData
}

export function useUndo() {
  const [entry, setEntry] = useState<UndoEntry | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const currentWeek = useCurrentWeek()
  const upsertSet = useMutation(api.sets.upsert)

  const push = (
    dayIdx: number,
    exIdx: number,
    setIdx: number,
    previousData: SetLogData
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setEntry({ dayIdx, exIdx, setIdx, previousData })
    timeoutRef.current = setTimeout(() => setEntry(null), 5000)
  }

  const undo = () => {
    if (!entry) return
    upsertSet({
      week: currentWeek,
      dayIndex: entry.dayIdx,
      exerciseIndex: entry.exIdx,
      setIndex: entry.setIdx,
      weight: entry.previousData.weight,
      reps: entry.previousData.reps,
      done: entry.previousData.done,
    })
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setEntry(null)
  }

  const dismiss = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setEntry(null)
  }

  return { entry, push, undo, dismiss }
}

'use client'

import { useRef, useState } from 'react'
import type { SetLog } from '@/lib/store/types'
import { useWorkoutStore } from '@/lib/store/use-workout-store'

interface UndoEntry {
  dayIdx: number
  exIdx: number
  setIdx: number
  previousData: SetLog
}

export function useUndo() {
  const [entry, setEntry] = useState<UndoEntry | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setLog = useWorkoutStore((s) => s.setLog)

  const push = (
    dayIdx: number,
    exIdx: number,
    setIdx: number,
    previousData: SetLog
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setEntry({ dayIdx, exIdx, setIdx, previousData })
    timeoutRef.current = setTimeout(() => setEntry(null), 5000)
  }

  const undo = () => {
    if (!entry) return
    setLog(entry.dayIdx, entry.exIdx, entry.setIdx, entry.previousData)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setEntry(null)
  }

  const dismiss = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setEntry(null)
  }

  return { entry, push, undo, dismiss }
}

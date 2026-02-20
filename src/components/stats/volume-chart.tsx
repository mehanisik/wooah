'use client'

import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'

export function VolumeChart() {
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const history = useWorkoutStore((s) => s.history)

  const weeks: { week: number; push: number; pull: number; legs: number }[] = []
  const startWeek = Math.max(1, currentWeek - 7)

  for (let w = startWeek; w <= currentWeek; w++) {
    const row = { week: w, push: 0, pull: 0, legs: 0 }
    for (let d = 0; d < 6; d++) {
      const prog = getEffectiveProgram(d)
      const type = prog.type as 'push' | 'pull' | 'legs'
      prog.exercises.forEach((_, eIdx) => {
        const entries = history[`d${d}-e${eIdx}`] || []
        const weekEntries = entries.filter((e) => e.week === w)
        for (const e of weekEntries) {
          const vol = e.sets
            ? e.sets.reduce((s, x) => s + x.weight * x.reps, 0)
            : e.weight * e.reps
          if (type in row) row[type] += vol
        }
      })
    }
    weeks.push(row)
  }

  const maxVol = Math.max(...weeks.map((w) => w.push + w.pull + w.legs), 1)

  const typeColors = {
    push: 'bg-[var(--push-color)]',
    pull: 'bg-[var(--pull-color)]',
    legs: 'bg-[var(--legs-color)]',
  }

  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <h3 className="mb-3 font-display text-sm tracking-wider">
        WEEKLY VOLUME
      </h3>
      {weeks.length === 0 ? (
        <p className="py-4 text-center text-muted-foreground text-xs">
          No data yet
        </p>
      ) : (
        <>
          <div className="flex h-28 items-end gap-1">
            {weeks.map((w) => {
              const total = w.push + w.pull + w.legs
              const h = (total / maxVol) * 100
              const pushH = total > 0 ? (w.push / total) * h : 0
              const pullH = total > 0 ? (w.pull / total) * h : 0
              const legsH = total > 0 ? (w.legs / total) * h : 0
              return (
                <div
                  key={w.week}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <div
                    className="flex w-full flex-col-reverse"
                    style={{ height: `${h}%` }}
                  >
                    <div
                      className={`${typeColors.push} w-full rounded-b-sm`}
                      style={{ height: `${pushH}%` }}
                    />
                    <div
                      className={`${typeColors.pull} w-full`}
                      style={{ height: `${pullH}%` }}
                    />
                    <div
                      className={`${typeColors.legs} w-full rounded-t-sm`}
                      style={{ height: `${legsH}%` }}
                    />
                  </div>
                  <span className="mt-0.5 font-mono text-[8px] text-muted-foreground">
                    W{w.week}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-2 flex justify-center gap-3 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-[var(--push-color)]" />{' '}
              Push
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-[var(--pull-color)]" />{' '}
              Pull
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-sm bg-[var(--legs-color)]" />{' '}
              Legs
            </span>
          </div>
        </>
      )}
    </div>
  )
}

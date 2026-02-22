'use client'

import { Star, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { selectWorkoutTimer } from '@/lib/store/selectors'
import {
  getEffectiveProgram,
  useWorkoutStore,
} from '@/lib/store/use-workout-store'
import { cn } from '@/lib/utils'
import { formatDuration } from '@/lib/workout/helpers'

interface CelebrationModalProps {
  dayIdx: number
  open: boolean
  onClose: () => void
}

export function CelebrationModal({
  dayIdx,
  open,
  onClose,
}: CelebrationModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rating, setRating] = useState(0)
  const timer = useWorkoutStore((s) => selectWorkoutTimer(s, dayIdx))
  const logs = useWorkoutStore((s) => s.logs)
  const currentWeek = useWorkoutStore((s) => s.currentWeek)
  const setSessionNotes = useWorkoutStore((s) => s.setSessionNotes)
  const getSessionNotes = useWorkoutStore((s) => s.getSessionNotes)

  const prog = getEffectiveProgram(dayIdx)
  let totalSets = 0
  let totalVolume = 0

  prog.exercises.forEach((ex, eIdx) => {
    for (let s = 0; s < ex.sets + 4; s++) {
      const log = logs[`w${currentWeek}-d${dayIdx}-e${eIdx}-s${s}`]
      if (log?.done) {
        totalSets++
        totalVolume +=
          (Number.parseFloat(log.weight) || 0) *
          (Number.parseInt(log.reps, 10) || 0)
      }
    }
  })

  useEffect(() => {
    if (!(open && canvasRef.current)) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      life: number
    }[] = []
    const colors = ['#ff6b35', '#8b5cf6', '#00e676', '#7c3aed', '#FFD700']

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.8) * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2,
        life: 1,
      })
    }

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of particles) {
        if (p.life <= 0) continue
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.15
        p.life -= 0.012
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
      }
      ctx.globalAlpha = 1
      if (alive) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [open])

  const handleRate = (r: number) => {
    setRating(r)
    const notes = getSessionNotes(dayIdx)
    setSessionNotes(dayIdx, { ...notes, rating: r })
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
      <div className="relative z-10 w-[85vw] max-w-sm rounded-xl border border-border bg-card px-6 py-5 text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="mb-1 font-display text-2xl tracking-wider">
          WORKOUT DONE
        </div>
        <div className="mb-4 font-body text-muted-foreground text-xs">
          {prog.day} — {prog.name}
        </div>

        <div className="mb-4 grid grid-cols-3 gap-3">
          <div>
            <div className="font-mono font-semibold text-lg">
              {timer?.duration ? formatDuration(timer.duration) : '—'}
            </div>
            <div className="text-[10px] text-muted-foreground">DURATION</div>
          </div>
          <div>
            <div className="font-mono font-semibold text-lg">{totalSets}</div>
            <div className="text-[10px] text-muted-foreground">SETS</div>
          </div>
          <div>
            <div className="font-mono font-semibold text-lg">
              {totalVolume >= 1000
                ? `${(totalVolume / 1000).toFixed(1)}t`
                : `${totalVolume}kg`}
            </div>
            <div className="text-[10px] text-muted-foreground">VOLUME</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-1 text-[10px] text-muted-foreground">
            HOW WAS IT?
          </div>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRate(r)}
                className="p-1.5"
              >
                <Star
                  className={cn(
                    'h-6 w-6 transition-colors',
                    r <= rating
                      ? 'fill-warning text-warning'
                      : 'text-muted-foreground/30'
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full text-xs" onClick={onClose}>
          CONTINUE
        </Button>
      </div>
    </div>
  )
}

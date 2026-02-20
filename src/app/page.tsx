'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function getTodayDayIdx(): number {
  const day = new Date().getDay()
  return day === 0 ? 6 : day - 1
}

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const idx = getTodayDayIdx()
    if (idx === 6) {
      router.replace('/rest')
    } else {
      router.replace(`/workout/${idx}`)
    }
  }, [router])

  return (
    <div className="flex items-center justify-center py-16">
      <p className="animate-pulse font-body text-muted-foreground text-sm">
        Redirecting…
      </p>
    </div>
  )
}

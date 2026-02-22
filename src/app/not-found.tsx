'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n'

export default function NotFound() {
  const t = useT()

  return (
    <div className="flex flex-col items-center space-y-6 py-16 text-center">
      <span className="font-display text-6xl text-primary">404</span>
      <div>
        <h2 className="font-display text-2xl tracking-wider">
          {t('pageNotFound')}
        </h2>
        <p className="mt-1 font-body text-muted-foreground text-sm">
          {t('pageDoesntExist')}
        </p>
      </div>
      <Link
        href="/"
        className="font-body text-primary text-sm underline underline-offset-4"
      >
        {t('backToWorkout')}
      </Link>
    </div>
  )
}

'use client'

import { useT } from '@/lib/i18n'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useT()

  return (
    <div className="flex flex-col items-center space-y-6 py-16 text-center">
      <span className="font-display text-6xl text-destructive">!</span>
      <div>
        <h2 className="font-display text-2xl tracking-wider">
          {t('somethingWentWrong')}
        </h2>
        <p className="mt-1 font-body text-muted-foreground text-sm">
          {t('unexpectedError')}
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="font-body text-primary text-sm underline underline-offset-4"
      >
        {t('tryAgain')}
      </button>
    </div>
  )
}

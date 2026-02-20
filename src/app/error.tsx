'use client'

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center space-y-6 py-16 text-center">
      <span className="font-display text-6xl text-destructive">!</span>
      <div>
        <h2 className="font-display text-2xl tracking-wider">
          SOMETHING WENT WRONG
        </h2>
        <p className="mt-1 font-body text-muted-foreground text-sm">
          An unexpected error occurred.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="font-body text-brand text-sm underline underline-offset-4"
      >
        Try again
      </button>
    </div>
  )
}

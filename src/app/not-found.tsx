import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center space-y-6 py-16 text-center">
      <span className="font-display text-6xl text-brand">404</span>
      <div>
        <h2 className="font-display text-2xl tracking-wider">PAGE NOT FOUND</h2>
        <p className="mt-1 font-body text-muted-foreground text-sm">
          This page doesn&apos;t exist.
        </p>
      </div>
      <Link
        href="/"
        className="font-body text-brand text-sm underline underline-offset-4"
      >
        Back to workout
      </Link>
    </div>
  )
}

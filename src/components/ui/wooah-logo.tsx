import { cn } from '@/lib/utils'

interface WooahLogoProps {
  className?: string
  showText?: boolean
}

function TorsoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 44"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="24" cy="3" r="2.8" />
      {/* Fists */}
      <circle cx="8" cy="5" r="2.2" />
      <circle cx="40" cy="5" r="2.2" />
      {/* Biceps */}
      <circle cx="12" cy="11" r="4.5" />
      <circle cx="36" cy="11" r="4.5" />
      {/* Chest */}
      <circle cx="24" cy="14" r="8.5" />
      {/* Upper abs */}
      <circle cx="24" cy="25" r="5.5" />
      {/* Lower abs */}
      <circle cx="24" cy="33.5" r="4.5" />
      {/* Legs */}
      <circle cx="20" cy="40.5" r="3" />
      <circle cx="28" cy="40.5" r="3" />
    </svg>
  )
}

export function WooahLogo({ className, showText = true }: WooahLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <TorsoIcon className="h-[1.1em] w-[1.1em] text-primary" />
      {showText && (
        <span className="font-display text-primary tracking-wide">wooah!</span>
      )}
    </span>
  )
}

import { cn } from '@/lib/utils'

interface WooahLogoProps {
  className?: string
  showText?: boolean
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.5 2L9.5 11.5H14L8.5 22"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function WooahLogo({ className, showText = true }: WooahLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <SparkIcon className="h-[1.1em] w-[1.1em] text-primary" />
      {showText && (
        <span className="font-display text-primary tracking-wide">wooah!</span>
      )}
    </span>
  )
}

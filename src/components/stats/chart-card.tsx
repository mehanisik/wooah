import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  headline?: string | number
  change?: number
  changeLabel?: string
  action?: ReactNode
  footer?: ReactNode
  children: ReactNode
  empty?: boolean
}

export function ChartCard({
  title,
  headline,
  change,
  changeLabel,
  action,
  footer,
  children,
  empty,
}: ChartCardProps) {
  return (
    <div className="chart-card">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-sm tracking-wider">{title}</h3>
        {action}
      </div>

      {headline !== undefined && (
        <div className="mb-2 flex items-baseline gap-2">
          <span className="font-mono font-semibold text-2xl">{headline}</span>
          {change !== undefined && change !== 0 && (
            <span
              className={`rounded-full px-1.5 py-0.5 font-medium text-[10px] ${
                change > 0
                  ? 'bg-success/15 text-success'
                  : 'bg-destructive/15 text-destructive'
              }`}
            >
              {change > 0 ? '+' : ''}
              {change}
              {changeLabel || ''}
            </span>
          )}
        </div>
      )}

      {empty ? (
        <p className="py-6 text-center text-muted-foreground text-xs">
          No data yet
        </p>
      ) : (
        children
      )}

      {footer && <div className="mt-2">{footer}</div>}
    </div>
  )
}

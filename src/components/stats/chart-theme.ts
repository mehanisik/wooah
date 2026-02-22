export const CHART_COLORS = {
  push: 'var(--push-color)',
  pull: 'var(--pull-color)',
  legs: 'var(--legs-color)',
  upper: 'var(--upper-color)',
  lower: 'var(--lower-color)',
  full: 'var(--full-color)',
  chest: 'var(--chest-color)',
  back: 'var(--back-color)',
  shoulders: 'var(--shoulders-color)',
  arms: 'var(--arms-color)',
  primary: 'hsl(var(--primary))',
  success: 'var(--green)',
  warning: 'var(--yellow)',
  destructive: 'hsl(var(--destructive))',
  muted: 'hsl(var(--muted-foreground))',
} as const

export const AXIS_STYLE = {
  fontSize: 10,
  fill: 'hsl(var(--muted-foreground))',
  fontFamily: 'var(--font-mono)',
} as const

export const GRID_STYLE = {
  strokeDasharray: '3 3',
  stroke: 'hsl(var(--border))',
} as const

export const TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: 'hsl(var(--card))',
    border: '1px solid hsl(var(--border))',
    borderRadius: 6,
    fontSize: 11,
    fontFamily: 'var(--font-mono)',
  },
  labelStyle: {
    color: 'hsl(var(--muted-foreground))',
    fontSize: 10,
  },
} as const

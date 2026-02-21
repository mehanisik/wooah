export function ChartLegend({
  items,
}: {
  items: { color: string; label: string }[]
}) {
  return (
    <div className="flex justify-center gap-3 text-[9px] text-muted-foreground">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1">
          <span
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  )
}

import { cn } from "@/lib/utils"

export function BreakdownBar({ segments, total }) {
  if (!total) {
    return <div className="h-2 w-full overflow-hidden rounded-full bg-muted" />
  }

  return (
    <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
      {segments.map((segment) => {
        const width = (segment.count / total) * 100
        if (width <= 0) return null
        return (
          <div
            key={segment.key}
            className={cn("h-full transition-all duration-500", segment.color)}
            style={{ width: `${width}%` }}
            title={`${segment.label}: ${segment.count}`}
          />
        )
      })}
    </div>
  )
}

export function BreakdownList({ items, total }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const percent = total > 0 ? Math.round((item.count / total) * 100) : 0
        return (
          <li key={item.key} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className={cn("size-2.5 shrink-0 rounded-full", item.color)}
                  aria-hidden
                />
                <span className="text-foreground">{item.label}</span>
              </div>
              <span className="tabular-nums text-muted-foreground">
                {item.count}{" "}
                <span className="text-xs">({percent}%)</span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  item.color,
                )}
                style={{ width: `${percent}%` }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

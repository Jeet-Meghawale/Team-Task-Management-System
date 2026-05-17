import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton({ rows = 6, columns = 5 }) {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-card p-4">
      <div
        className="mb-3 hidden gap-4 sm:grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <Skeleton key={row} className="h-10 w-full" />
      ))}
    </div>
  )
}

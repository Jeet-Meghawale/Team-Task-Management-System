import { cn } from "@/lib/utils"

export function DataTableShell({ children, className }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card/40 ring-1 ring-border/60",
        className,
      )}
    >
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  )
}

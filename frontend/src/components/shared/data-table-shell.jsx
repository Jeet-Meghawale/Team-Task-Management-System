import { cn } from "@/lib/utils"

export function DataTableShell({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  )
}

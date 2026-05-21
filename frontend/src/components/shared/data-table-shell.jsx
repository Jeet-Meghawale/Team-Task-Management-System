import { cn } from "@/lib/utils"

export function DataTableShell({ children, className }) {
  return (
    <div
      className={cn(
        "glass-card overflow-hidden",
        className,
      )}
    >
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  )
}

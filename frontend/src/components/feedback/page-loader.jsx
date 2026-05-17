import { cn } from "@/lib/utils"

export function PageLoader({ className, label = "Loading..." }) {
  return (
    <div
      role="status"
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground",
        className,
      )}
    >
      <span
        className="size-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  )
}

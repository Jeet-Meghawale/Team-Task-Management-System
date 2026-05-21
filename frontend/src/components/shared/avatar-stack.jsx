import { cn } from "@/lib/utils"

export function AvatarStack({ count = 0, max = 4, className }) {
  const shown = Math.min(count, max)
  const overflow = count > max ? count - max : 0

  return (
    <div className={cn("flex items-center", className)}>
      {Array.from({ length: shown }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "flex size-7 items-center justify-center rounded-full border-2 border-card text-[10px] font-medium",
            "bg-gradient-to-br from-brand-primary/80 to-brand-secondary/80 text-white",
            i > 0 && "-ml-2",
          )}
          aria-hidden
        >
          {String.fromCharCode(65 + (i % 26))}
        </span>
      ))}
      {overflow > 0 ? (
        <span
          className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-card bg-muted text-[10px] font-medium text-muted-foreground"
        >
          +{overflow}
        </span>
      ) : null}
      {count === 0 ? (
        <span className="text-xs text-muted-foreground">No members</span>
      ) : null}
    </div>
  )
}

import { cn } from "@/lib/utils"

export function ProgressBar({ value = 0, className, indicatorClassName }) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-muted/80",
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 ease-out",
          indicatorClassName,
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

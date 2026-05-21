import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/shared/glass-card"
import { cn } from "@/lib/utils"

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <GlassCard
      className={cn(
        "flex flex-col items-center px-6 py-12 text-center",
        className,
      )}
    >
      {Icon ? (
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/10">
          <Icon className="size-7 text-brand-primary" aria-hidden />
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-balance text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <Button type="button" className="mt-6 rounded-xl" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </GlassCard>
  )
}

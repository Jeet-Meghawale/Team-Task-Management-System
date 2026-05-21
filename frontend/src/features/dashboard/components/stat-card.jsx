import { GlassCard } from "@/components/shared/glass-card"
import { cn } from "@/lib/utils"

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  trend,
  accent = "primary",
}) {
  const accentStyles = {
    primary: "from-brand-primary/20 to-brand-primary/5 text-brand-primary",
    secondary: "from-brand-secondary/20 to-brand-secondary/5 text-brand-secondary",
    accent: "from-brand-accent/20 to-brand-accent/5 text-brand-accent",
    success: "from-brand-success/20 to-brand-success/5 text-brand-success",
    danger: "from-destructive/20 to-destructive/5 text-destructive",
  }

  return (
    <GlassCard className="group p-0 hover:glow-primary">
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {Icon ? (
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br",
                accentStyles[accent] ?? accentStyles.primary,
                iconClassName,
              )}
            >
              <Icon className="size-4" aria-hidden />
            </span>
          ) : null}
        </div>
        <div>
          <p className="text-3xl font-bold tracking-tight text-foreground tabular-nums">
            {value}
          </p>
          {description ? (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          ) : null}
          {trend ? (
            <p className="mt-2 text-xs font-medium text-brand-success">{trend}</p>
          ) : null}
        </div>
      </div>
    </GlassCard>
  )
}

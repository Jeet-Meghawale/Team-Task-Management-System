import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  trend,
}) {
  return (
    <Card className="gap-0 border-border/50 bg-card/50 py-0 shadow-none">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 px-5 pt-5 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon ? (
          <span
            className={cn(
              "flex size-8 items-center justify-center rounded-lg bg-muted/80",
              iconClassName,
            )}
          >
            <Icon className="size-4" aria-hidden />
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <p className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </p>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
        {trend ? (
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            {trend}
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}

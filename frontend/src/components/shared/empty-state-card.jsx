import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <Card className={cn("border-dashed bg-card/50", className)}>
      <CardHeader className="items-center px-6 pt-8 text-center">
        {Icon ? (
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
            <Icon className="size-6 text-muted-foreground" aria-hidden />
          </div>
        ) : null}
        <CardTitle className="text-lg">{title}</CardTitle>
        {description ? (
          <CardDescription className="max-w-md text-balance">{description}</CardDescription>
        ) : null}
      </CardHeader>
      {actionLabel && onAction ? (
        <CardContent className="flex justify-center pb-8">
          <Button type="button" onClick={onAction}>
            {actionLabel}
          </Button>
        </CardContent>
      ) : null}
    </Card>
  )
}

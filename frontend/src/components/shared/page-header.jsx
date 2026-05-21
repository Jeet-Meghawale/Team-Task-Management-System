import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  description,
  actions,
  hideTitle = false,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        {title ? (
          <h1
            className={cn(
              "text-2xl font-bold tracking-tight text-foreground md:text-3xl",
              hideTitle && "sr-only",
            )}
          >
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

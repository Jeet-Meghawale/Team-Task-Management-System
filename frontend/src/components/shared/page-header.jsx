import { cn } from "@/lib/utils"

/**
 * Page chrome. Top app bar already shows the nav label — use hideTitle on list pages.
 */
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
              "text-2xl font-semibold tracking-tight text-foreground",
              hideTitle && "sr-only",
            )}
          >
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

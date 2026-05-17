import { Button } from "@/components/ui/button"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { cn } from "@/lib/utils"

export function ErrorDisplay({
  error,
  title = "Something went wrong",
  onRetry,
  className,
}) {
  const message = getApiErrorMessage(error)

  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 text-center",
        className,
      )}
    >
      <div className="max-w-md space-y-2">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {onRetry ? (
        <Button type="button" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}

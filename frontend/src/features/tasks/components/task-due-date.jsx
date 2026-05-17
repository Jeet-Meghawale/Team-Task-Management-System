import { cn } from "@/lib/utils"
import { formatDisplayDate, formatRelativeDate } from "@/lib/format/date"

export function TaskDueDate({ dueDate, isOverdue, className }) {
  if (!dueDate) {
    return <span className={cn("text-xs text-muted-foreground", className)}>No due date</span>
  }

  return (
    <span
      className={cn(
        "text-xs",
        isOverdue ? "font-medium text-destructive" : "text-muted-foreground",
        className,
      )}
    >
      {formatDisplayDate(dueDate)}
      <span className="ml-1 opacity-80">({formatRelativeDate(dueDate)})</span>
    </span>
  )
}

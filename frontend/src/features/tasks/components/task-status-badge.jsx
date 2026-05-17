import { Badge } from "@/components/ui/badge"
import { TASK_STATUS_LABELS } from "@/lib/constants/task-status"
import { cn } from "@/lib/utils"

const STATUS_STYLES = {
  TODO: "bg-slate-500/15 text-slate-700 dark:text-slate-300",
  IN_PROGRESS: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  REVIEW: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
  COMPLETED: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
}

export function TaskStatusBadge({ status, className }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", STATUS_STYLES[status], className)}
    >
      {TASK_STATUS_LABELS[status] ?? status}
    </Badge>
  )
}

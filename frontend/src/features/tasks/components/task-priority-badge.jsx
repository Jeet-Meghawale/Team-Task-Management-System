import { Badge } from "@/components/ui/badge"
import { TASK_PRIORITY_LABELS } from "@/lib/constants/task-priority"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES = {
  LOW: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  MEDIUM: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  HIGH: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
}

export function TaskPriorityBadge({ priority, className }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", PRIORITY_STYLES[priority], className)}
    >
      {TASK_PRIORITY_LABELS[priority] ?? priority}
    </Badge>
  )
}

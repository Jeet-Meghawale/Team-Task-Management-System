import { Badge } from "@/components/ui/badge"
import { TASK_PRIORITY_LABELS } from "@/lib/constants/task-priority"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES = {
  LOW: "border-sky-500/30 bg-sky-500/15 text-sky-300",
  MEDIUM: "border-brand-primary/30 bg-brand-primary/15 text-violet-300",
  HIGH: "border-rose-500/30 bg-rose-500/15 text-rose-300",
}

export function TaskPriorityBadge({ priority, className }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2 py-0 text-[11px] font-medium",
        PRIORITY_STYLES[priority],
        className,
      )}
    >
      {TASK_PRIORITY_LABELS[priority] ?? priority}
    </Badge>
  )
}

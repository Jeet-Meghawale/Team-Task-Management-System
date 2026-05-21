import { Badge } from "@/components/ui/badge"
import { TASK_STATUS_LABELS } from "@/lib/constants/task-status"
import { cn } from "@/lib/utils"

const STATUS_STYLES = {
  TODO: "border-slate-500/30 bg-slate-500/15 text-slate-300",
  IN_PROGRESS: "border-brand-secondary/30 bg-brand-secondary/15 text-cyan-300",
  REVIEW: "border-brand-accent/30 bg-brand-accent/15 text-amber-300",
  COMPLETED: "border-brand-success/30 bg-brand-success/15 text-emerald-300",
}

export function TaskStatusBadge({ status, className }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2 py-0 text-[11px] font-medium",
        STATUS_STYLES[status],
        className,
      )}
    >
      {TASK_STATUS_LABELS[status] ?? status}
    </Badge>
  )
}

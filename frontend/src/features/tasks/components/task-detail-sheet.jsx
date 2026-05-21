import { Loader2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { TaskStatusBadge } from "@/features/tasks/components/task-status-badge"
import { TaskPriorityBadge } from "@/features/tasks/components/task-priority-badge"
import { TaskDueDate } from "@/features/tasks/components/task-due-date"
import { CommentsSection } from "@/features/comments/components/comments-section"
import { useTask } from "@/features/tasks/hooks/use-task"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { formatDisplayDate } from "@/lib/format/date"
import { nativeSelectClassName } from "@/lib/ui/select-class"
import { TASK_STATUS_LABELS, TASK_STATUS_ORDER } from "@/lib/constants/task-status"
import { canUpdateTaskStatus } from "@/features/tasks/lib/task-permissions"
import { useAuth } from "@/lib/auth/use-auth"

export function TaskDetailSheet({
  taskId,
  open,
  onOpenChange,
  onStatusChange,
  isUpdatingStatus,
}) {
  const { user } = useAuth()
  const taskQuery = useTask(taskId, open)
  const task = taskQuery.data

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-white/10 bg-card/95 backdrop-blur-xl sm:max-w-lg"
      >
        {taskQuery.isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : taskQuery.isError ? (
          <ErrorDisplay
            error={taskQuery.error}
            onRetry={() => taskQuery.refetch()}
          />
        ) : task ? (
          <>
            <SheetHeader className="text-left">
              <SheetTitle className="pr-8 text-lg">{task.title}</SheetTitle>
              <SheetDescription>{task.projectName}</SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6 px-1">
              <div className="flex flex-wrap gap-2">
                <TaskStatusBadge status={task.status} />
                <TaskPriorityBadge priority={task.priority} />
              </div>

              {canUpdateTaskStatus(task, user) ? (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    Update status
                  </label>
                  <select
                    className={nativeSelectClassName}
                    value={task.status}
                    disabled={isUpdatingStatus}
                    onChange={(e) => onStatusChange(task, e.target.value)}
                  >
                    {TASK_STATUS_ORDER.map((status) => (
                      <option key={status} value={status}>
                        {TASK_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Assignee</p>
                  <p className="font-medium">{task.assignedTo?.name ?? "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due date</p>
                  <TaskDueDate dueDate={task.dueDate} isOverdue={task.isOverdue} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium">{formatDisplayDate(task.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="font-medium">{task.createdBy?.name ?? "—"}</p>
                </div>
              </div>

              {task.description ? (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Description</p>
                  <p className="mt-1 text-sm text-foreground">{task.description}</p>
                </div>
              ) : null}

              <Separator />
              <CommentsSection taskId={task.id} />
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}

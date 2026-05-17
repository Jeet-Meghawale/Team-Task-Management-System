import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TASK_STATUS_LABELS, TASK_STATUS_ORDER } from "@/lib/constants/task-status"
import { TaskPriorityBadge } from "@/features/tasks/components/task-priority-badge"
import { TaskDueDate } from "@/features/tasks/components/task-due-date"
import { NativeSelect } from "@/components/ui/native-select"
import { cn } from "@/lib/utils"
import { canUpdateTaskStatus } from "@/features/tasks/lib/task-permissions"

const COLUMN_STYLES = {
  TODO: "border-t-slate-500",
  IN_PROGRESS: "border-t-blue-500",
  REVIEW: "border-t-amber-500",
  COMPLETED: "border-t-emerald-500",
}

export function TaskKanban({ tasks, user, onOpen, onStatusChange }) {
  const columns = TASK_STATUS_ORDER.map((status) => ({
    status,
    label: TASK_STATUS_LABELS[status],
    tasks: tasks.filter((task) => task.status === status),
  }))

  return (
    <div className="-mx-1 overflow-x-auto pb-2">
      <div className="flex min-w-max gap-4 md:grid md:min-w-0 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <Card
          key={column.status}
          className={cn(
            "w-[min(100%,18rem)] shrink-0 gap-0 border-t-4 py-0 md:w-auto",
            COLUMN_STYLES[column.status],
          )}
        >
          <CardHeader className="border-b border-border px-4 py-3">
            <CardTitle className="flex items-center justify-between text-sm">
              {column.label}
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-normal text-muted-foreground">
                {column.tasks.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-3">
            {column.tasks.length === 0 ? (
              <p className="py-6 text-center text-xs text-muted-foreground">
                No tasks
              </p>
            ) : (
              column.tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:bg-muted/40"
                  onClick={() => onOpen(task)}
                >
                  <p className="line-clamp-2 text-sm font-medium text-foreground">
                    {task.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {task.projectName}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <TaskPriorityBadge priority={task.priority} />
                    <TaskDueDate
                      dueDate={task.dueDate}
                      isOverdue={task.isOverdue}
                    />
                  </div>
                  {canUpdateTaskStatus(task, user) ? (
                    <NativeSelect
                      className="mt-3 h-7 text-xs"
                      value={task.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation()
                        onStatusChange(task, e.target.value)
                      }}
                      aria-label={`Update status for ${task.title}`}
                    >
                      {TASK_STATUS_ORDER.map((status) => (
                        <option key={status} value={status}>
                          {TASK_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </NativeSelect>
                  ) : null}
                </button>
              ))
            )}
          </CardContent>
        </Card>
      ))}
      </div>
    </div>
  )
}

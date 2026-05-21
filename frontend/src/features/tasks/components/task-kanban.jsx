import { GlassCard } from "@/components/shared/glass-card"
import { TASK_STATUS_LABELS, TASK_STATUS_ORDER } from "@/lib/constants/task-status"
import { TaskPriorityBadge } from "@/features/tasks/components/task-priority-badge"
import { TaskDueDate } from "@/features/tasks/components/task-due-date"
import { NativeSelect } from "@/components/ui/native-select"
import { cn } from "@/lib/utils"
import { canUpdateTaskStatus } from "@/features/tasks/lib/task-permissions"

const COLUMN_ACCENT = {
  TODO: "border-t-slate-400",
  IN_PROGRESS: "border-t-brand-secondary",
  REVIEW: "border-t-brand-accent",
  COMPLETED: "border-t-brand-success",
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
          <GlassCard
            key={column.status}
            className={cn(
              "w-[min(100%,19rem)] shrink-0 gap-0 border-t-4 p-0 md:w-auto",
              COLUMN_ACCENT[column.status],
            )}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
              <h3 className="text-sm font-semibold text-foreground">{column.label}</h3>
              <span className="rounded-full bg-muted/60 px-2.5 py-0.5 text-xs font-medium tabular-nums text-muted-foreground">
                {column.tasks.length}
              </span>
            </div>
            <div className="space-y-2.5 p-3">
              {column.tasks.length === 0 ? (
                <p className="py-8 text-center text-xs text-muted-foreground">
                  Drop tasks here
                </p>
              ) : (
                column.tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    className="w-full cursor-grab rounded-xl border border-white/5 bg-muted/20 p-3.5 text-left transition-all duration-200 hover:border-primary/30 hover:bg-muted/40 hover:shadow-lg hover:shadow-primary/5 active:cursor-grabbing"
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
                        className="mt-3 h-8 text-xs"
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
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

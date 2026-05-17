import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableShell } from "@/components/shared/data-table-shell"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TaskStatusBadge } from "@/features/tasks/components/task-status-badge"
import { TaskPriorityBadge } from "@/features/tasks/components/task-priority-badge"
import { TaskDueDate } from "@/features/tasks/components/task-due-date"

export function TaskTable({
  tasks,
  canManage,
  canDelete,
  onOpen,
  onEdit,
  onDelete,
}) {
  return (
    <DataTableShell>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead className="hidden md:table-cell">Project</TableHead>
            <TableHead className="hidden lg:table-cell">Assignee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell">Priority</TableHead>
            <TableHead className="hidden md:table-cell">Due</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="cursor-pointer"
              onClick={() => onOpen(task)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onOpen(task)
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Open task ${task.title}`}
            >
              <TableCell className="max-w-[220px] font-medium">
                <span className="line-clamp-1">{task.title}</span>
                <div className="mt-1 flex flex-wrap items-center gap-2 sm:hidden">
                  <TaskStatusBadge status={task.status} />
                  <TaskPriorityBadge priority={task.priority} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                  {task.projectName || "—"}
                  {task.assignedTo?.name ? ` · ${task.assignedTo.name}` : ""}
                </p>
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {task.projectName || "—"}
              </TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {task.assignedTo?.name ?? "—"}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <TaskPriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <TaskDueDate dueDate={task.dueDate} isOverdue={task.isOverdue} />
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                {(canManage || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${task.title}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canManage ? (
                        <DropdownMenuItem onClick={() => onEdit(task)}>
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                      ) : null}
                      {canDelete ? (
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(task)}
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableShell>
  )
}

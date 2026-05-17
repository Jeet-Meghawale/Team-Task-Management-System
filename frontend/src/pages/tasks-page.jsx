import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { ListPagination } from "@/components/shared/list-pagination"
import { useAuth } from "@/lib/auth/use-auth"
import { useDebouncedValue } from "@/features/teams/hooks/use-debounced-value"
import { TASK_PRIORITY_FILTER_ALL } from "@/lib/constants/task-priority"
import { TASK_STATUS_FILTER_ALL } from "@/lib/constants/task-status"
import {
  canDeleteTask,
  canManageTasks,
} from "@/features/tasks/lib/task-permissions"
import { useTasks } from "@/features/tasks/hooks/use-tasks"
import { useTaskMutations } from "@/features/tasks/hooks/use-task-mutations"
import { TaskFilters } from "@/features/tasks/components/task-filters"
import { TaskViewToggle } from "@/features/tasks/components/task-view-toggle"
import { TaskTable } from "@/features/tasks/components/task-table"
import { TaskKanban } from "@/features/tasks/components/task-kanban"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { TaskEmptyState } from "@/features/tasks/components/task-empty-state"
import { TaskFormDialog } from "@/features/tasks/components/task-form-dialog"
import { TaskDeleteDialog } from "@/features/tasks/components/task-delete-dialog"
import { TaskDetailSheet } from "@/features/tasks/components/task-detail-sheet"

const PAGE_LIMIT = 10

export function TasksPage() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(TASK_STATUS_FILTER_ALL)
  const [priority, setPriority] = useState(TASK_PRIORITY_FILTER_ALL)
  const [sort, setSort] = useState("newest")
  const [view, setView] = useState("table")

  const [createOpen, setCreateOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const debouncedSearch = useDebouncedValue(search)

  const tasksQuery = useTasks({
    page,
    limit: PAGE_LIMIT,
    search: debouncedSearch,
    status,
    priority,
    sort,
  })

  const { createMutation, updateMutation, deleteMutation, statusMutation } =
    useTaskMutations()

  const tasks = tasksQuery.data ?? []
  const canManage = canManageTasks(user?.role)
  const canDelete = canDeleteTask(user?.role)
  const hasNextPage = tasks.length >= PAGE_LIMIT

  const detailTaskId = searchParams.get("task")

  function openTask(task) {
    setSearchParams({ task: task.id })
  }

  function closeDetail() {
    setSearchParams({})
  }

  function handleStatusChange(task, nextStatus) {
    if (task.status === nextStatus) return
    statusMutation.mutate({ id: task.id, status: nextStatus })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage work across projects in table or kanban view.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TaskViewToggle view={view} onViewChange={setView} />
          {canManage ? (
            <Button type="button" onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              Create task
            </Button>
          ) : null}
        </div>
      </div>

      <TaskFilters
        search={search}
        onSearchChange={(v) => {
          setSearch(v)
          setPage(1)
        }}
        status={status}
        onStatusChange={(v) => {
          setStatus(v)
          setPage(1)
        }}
        priority={priority}
        onPriorityChange={(v) => {
          setPriority(v)
          setPage(1)
        }}
        sort={sort}
        onSortChange={setSort}
      />

      {tasksQuery.isLoading ? (
        <TaskListSkeleton view={view} />
      ) : tasksQuery.isError ? (
        <ErrorDisplay error={tasksQuery.error} onRetry={() => tasksQuery.refetch()} />
      ) : tasks.length === 0 ? (
        <TaskEmptyState canCreate={canManage} onCreate={() => setCreateOpen(true)} />
      ) : view === "table" ? (
        <>
          <TaskTable
            tasks={tasks}
            canManage={canManage}
            canDelete={canDelete}
            onOpen={openTask}
            onEdit={setEditTask}
            onDelete={setDeleteTarget}
          />
          <ListPagination
            page={page}
            onPageChange={setPage}
            hasNextPage={hasNextPage}
            isLoading={tasksQuery.isFetching}
          />
        </>
      ) : (
        <TaskKanban
          tasks={tasks}
          user={user}
          onOpen={openTask}
          onStatusChange={handleStatusChange}
        />
      )}

      <TaskFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={(body) => createMutation.mutateAsync(body)}
      />

      <TaskFormDialog
        open={Boolean(editTask)}
        onOpenChange={(open) => !open && setEditTask(null)}
        mode="edit"
        task={editTask}
        isSubmitting={updateMutation.isPending}
        onSubmit={(body) =>
          updateMutation.mutateAsync({ id: editTask.id, body })
        }
      />

      <TaskDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        task={deleteTarget}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => {
          deleteMutation.mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          })
        }}
      />

      <TaskDetailSheet
        taskId={detailTaskId}
        open={Boolean(detailTaskId)}
        onOpenChange={(open) => !open && closeDetail()}
        onStatusChange={handleStatusChange}
        isUpdatingStatus={statusMutation.isPending}
      />
    </div>
  )
}

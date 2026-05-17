import { useState } from "react"
import { ClipboardList } from "lucide-react"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { EmptyStateCard } from "@/components/shared/empty-state-card"
import { PageHeader } from "@/components/shared/page-header"
import { useAuth } from "@/lib/auth/use-auth"
import { useAssignedTasks } from "@/features/tasks/hooks/use-assigned-tasks"
import { TaskTable } from "@/features/tasks/components/task-table"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { TaskDetailSheet } from "@/features/tasks/components/task-detail-sheet"
import { useTaskMutations } from "@/features/tasks/hooks/use-task-mutations"

export function AssignmentsPage() {
  const { user } = useAuth()
  const [detailTaskId, setDetailTaskId] = useState(null)
  const assignmentsQuery = useAssignedTasks(user)
  const { statusMutation } = useTaskMutations()

  const tasks = assignmentsQuery.data ?? []

  return (
    <div className="space-y-6">
      <PageHeader
        title="My assignments"
        description="Tasks assigned to you across all projects."
        hideTitle
      />

      {assignmentsQuery.isLoading ? (
        <TaskListSkeleton />
      ) : assignmentsQuery.isError ? (
        <ErrorDisplay
          error={assignmentsQuery.error}
          onRetry={() => assignmentsQuery.refetch()}
        />
      ) : tasks.length === 0 ? (
        <EmptyStateCard
          icon={ClipboardList}
          title="No assignments yet"
          description="When tasks are assigned to you, they will appear here."
        />
      ) : (
        <TaskTable
          tasks={tasks}
          canManage={false}
          canDelete={false}
          onOpen={(task) => setDetailTaskId(task.id)}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      )}

      <TaskDetailSheet
        taskId={detailTaskId}
        open={Boolean(detailTaskId)}
        onOpenChange={(open) => !open && setDetailTaskId(null)}
        onStatusChange={(task, status) =>
          statusMutation.mutate({ id: task.id, status })
        }
        isUpdatingStatus={statusMutation.isPending}
      />
    </div>
  )
}

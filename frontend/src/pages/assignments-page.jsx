import { useState } from "react"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { useAuth } from "@/lib/auth/use-auth"
import { useAssignedTasks } from "@/features/tasks/hooks/use-assigned-tasks"
import { TaskTable } from "@/features/tasks/components/task-table"
import { TaskListSkeleton } from "@/features/tasks/components/task-list-skeleton"
import { TaskDetailSheet } from "@/features/tasks/components/task-detail-sheet"
import { useTaskMutations } from "@/features/tasks/hooks/use-task-mutations"
import { Card, CardContent } from "@/components/ui/card"

export function AssignmentsPage() {
  const { user } = useAuth()
  const [detailTaskId, setDetailTaskId] = useState(null)
  const assignmentsQuery = useAssignedTasks(user)
  const { statusMutation } = useTaskMutations()

  const tasks = assignmentsQuery.data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My assignments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tasks assigned to you across all projects.
        </p>
      </div>

      {assignmentsQuery.isLoading ? (
        <TaskListSkeleton />
      ) : assignmentsQuery.isError ? (
        <ErrorDisplay
          error={assignmentsQuery.error}
          onRetry={() => assignmentsQuery.refetch()}
        />
      ) : tasks.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            You have no assigned tasks right now.
          </CardContent>
        </Card>
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

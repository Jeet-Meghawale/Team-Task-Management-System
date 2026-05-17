import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "@/services/task.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { addNotification } from "@/features/notifications/lib/notification-center"

export function useTaskMutations() {
  const queryClient = useQueryClient()

  const invalidateTasks = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all })
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats })
  }

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (task) => {
      toast.success("Task created")
      addNotification({
        type: "task",
        title: "Task created",
        message: `"${task.title}" was added to ${task.projectName || "a project"}.`,
        href: `/app/tasks?task=${task.id}`,
      })
      invalidateTasks()
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to create task"))
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => updateTask(id, body),
    onSuccess: (task) => {
      toast.success("Task updated")
      invalidateTasks()
      queryClient.setQueryData(queryKeys.tasks.detail(task.id), task)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update task"))
    },
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateTaskStatus(id, status),
    onSuccess: (task) => {
      toast.success("Status updated")
      addNotification({
        type: "task",
        title: "Task status changed",
        message: `"${task.title}" is now ${task.status.replace(/_/g, " ").toLowerCase()}.`,
        href: `/app/tasks?task=${task.id}`,
      })
      invalidateTasks()
      queryClient.setQueryData(queryKeys.tasks.detail(task.id), task)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update status"))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted")
      invalidateTasks()
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to delete task"))
    },
  })

  return {
    createMutation,
    updateMutation,
    statusMutation,
    deleteMutation,
  }
}

import { useQuery } from "@tanstack/react-query"
import { fetchAssignedTasks, fetchTasks } from "@/services/task.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { USER_ROLES } from "@/lib/auth/roles"

export function useAssignedTasks(user) {
  const isDeveloper = user?.role === USER_ROLES.DEVELOPER

  return useQuery({
    queryKey: isDeveloper
      ? queryKeys.tasks.assigned
      : queryKeys.tasks.list({ scope: "assignments", userId: user?.id }),
    queryFn: async () => {
      if (isDeveloper) {
        return fetchAssignedTasks()
      }
      const tasks = await fetchTasks({ page: 1, limit: 100 })
      return tasks.filter((task) => task.assignedToId === user?.id)
    },
    enabled: Boolean(user?.id),
  })
}

import { useQuery } from "@tanstack/react-query"
import { fetchTasks } from "@/services/task.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { TASK_PRIORITY_FILTER_ALL } from "@/lib/constants/task-priority"
import { TASK_STATUS_FILTER_ALL } from "@/lib/constants/task-status"

const DEFAULT_LIMIT = 10

export function useTasks({
  page = 1,
  limit = DEFAULT_LIMIT,
  search = "",
  status = TASK_STATUS_FILTER_ALL,
  priority = TASK_PRIORITY_FILTER_ALL,
  sort = "newest",
}) {
  const filters = { page, limit, search, status, priority, sort }

  return useQuery({
    queryKey: queryKeys.tasks.list(filters),
    queryFn: () =>
      fetchTasks({
        page,
        limit,
        search: search || undefined,
        status: status === TASK_STATUS_FILTER_ALL ? undefined : status,
        priority: priority === TASK_PRIORITY_FILTER_ALL ? undefined : priority,
      }),
    select: (tasks) => {
      const sorted = [...tasks]
      if (sort === "dueDate") {
        sorted.sort((a, b) => {
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        })
      }
      return sorted
    },
    placeholderData: (previous) => previous,
  })
}

import { useQuery } from "@tanstack/react-query"
import { fetchTaskById } from "@/services/task.service"
import { queryKeys } from "@/lib/react-query/query-keys"

export function useTask(id, enabled = true) {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: () => fetchTaskById(id),
    enabled: Boolean(id) && enabled,
  })
}

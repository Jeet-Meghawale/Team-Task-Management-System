import { useQuery } from "@tanstack/react-query"
import { fetchTaskComments } from "@/services/comment.service"
import { queryKeys } from "@/lib/react-query/query-keys"

export function useComments(taskId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.comments.task(taskId),
    queryFn: () => fetchTaskComments(taskId),
    enabled: Boolean(taskId) && enabled,
  })
}

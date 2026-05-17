import { useQuery } from "@tanstack/react-query"
import { fetchProjectById } from "@/services/project.service"
import { queryKeys } from "@/lib/react-query/query-keys"

export function useProject(projectId) {
  return useQuery({
    queryKey: queryKeys.projects.detail(projectId),
    queryFn: () => fetchProjectById(projectId),
    enabled: Boolean(projectId),
  })
}

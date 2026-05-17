import { useQuery } from "@tanstack/react-query"
import { fetchProjects } from "@/services/project.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { PROJECT_STATUS_FILTER_ALL } from "@/features/projects/lib/project-status"

const DEFAULT_LIMIT = 10

export function useProjects({ page = 1, limit = DEFAULT_LIMIT, search = "", status = PROJECT_STATUS_FILTER_ALL }) {
  const filters = { page, limit, search, status }

  return useQuery({
    queryKey: queryKeys.projects.list(filters),
    queryFn: () =>
      fetchProjects({
        page,
        limit: status === PROJECT_STATUS_FILTER_ALL ? limit : 100,
        search: search || undefined,
      }),
    select: (projects) => {
      if (status === PROJECT_STATUS_FILTER_ALL) return projects
      return projects.filter((project) => project.status === status)
    },
    placeholderData: (previous) => previous,
  })
}

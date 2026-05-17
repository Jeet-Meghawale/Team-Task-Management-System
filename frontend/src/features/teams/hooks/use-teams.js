import { useQuery } from "@tanstack/react-query"
import { fetchTeams } from "@/services/team.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { TEAM_STATUS_FILTER_ALL } from "@/features/teams/lib/team-status"

const DEFAULT_LIMIT = 10

export function useTeams({ page = 1, limit = DEFAULT_LIMIT, search = "", status = TEAM_STATUS_FILTER_ALL }) {
  const filters = { page, limit, search, status }

  return useQuery({
    queryKey: queryKeys.teams.list(filters),
    queryFn: () =>
      fetchTeams({
        page,
        limit: status === TEAM_STATUS_FILTER_ALL ? limit : 100,
        search: search || undefined,
      }),
    select: (teams) => {
      if (status === TEAM_STATUS_FILTER_ALL) return teams
      return teams.filter((team) => team.status === status)
    },
    placeholderData: (previous) => previous,
  })
}

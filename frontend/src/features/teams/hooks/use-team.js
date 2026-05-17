import { useQuery } from "@tanstack/react-query"
import { fetchTeamById } from "@/services/team.service"
import { queryKeys } from "@/lib/react-query/query-keys"

export function useTeam(teamId) {
  return useQuery({
    queryKey: queryKeys.teams.detail(teamId),
    queryFn: () => fetchTeamById(teamId),
    enabled: Boolean(teamId),
  })
}

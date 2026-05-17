import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/services/users.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { canBrowseUsersForAssignment } from "@/features/teams/lib/team-permissions"

export function useUsersForAssignment(userRole, search = "") {
  return useQuery({
    queryKey: queryKeys.users.list({ search, limit: 50 }),
    queryFn: () =>
      fetchUsers({
        page: 1,
        limit: 50,
        search: search || undefined,
      }),
    enabled: canBrowseUsersForAssignment(userRole),
    staleTime: 2 * 60 * 1000,
  })
}

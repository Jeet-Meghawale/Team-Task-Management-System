import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "@/services/users.service"
import { queryKeys } from "@/lib/react-query/query-keys"

export function useUsers({ page = 1, limit = 10, search = "" }) {
  return useQuery({
    queryKey: queryKeys.users.list({ page, limit, search }),
    queryFn: () =>
      fetchUsers({
        page,
        limit,
        search: search || undefined,
      }),
    placeholderData: (previous) => previous,
  })
}

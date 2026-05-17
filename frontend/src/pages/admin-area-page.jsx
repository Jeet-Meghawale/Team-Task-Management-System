import { useState } from "react"
import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { ListPagination } from "@/components/shared/list-pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { ROUTES } from "@/lib/constants/routes"
import { useDebouncedValue } from "@/features/teams/hooks/use-debounced-value"
import { useUsers } from "@/features/users/hooks/use-users"
import { useUserMutations } from "@/features/users/hooks/use-user-mutations"
import { UsersTable } from "@/features/users/components/users-table"

const PAGE_LIMIT = 10

export function AdminAreaPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search)

  const usersQuery = useUsers({
    page,
    limit: PAGE_LIMIT,
    search: debouncedSearch,
  })

  const { roleMutation, statusMutation } = useUserMutations()
  const users = usersQuery.data ?? []
  const hasNextPage = users.length >= PAGE_LIMIT
  const isUpdating = roleMutation.isPending || statusMutation.isPending

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">User management</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage roles and account status for workspace members.
          </p>
          <Link
            to={ROUTES.REGISTER}
            className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
          >
            Create new user
          </Link>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search users..."
            className="pl-8"
          />
        </div>
      </div>

      {usersQuery.isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : usersQuery.isError ? (
        <ErrorDisplay error={usersQuery.error} onRetry={() => usersQuery.refetch()} />
      ) : users.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
          No users match your search.
        </p>
      ) : (
        <>
          <UsersTable
            users={users}
            isUpdating={isUpdating}
            onRoleChange={(user, role) => {
              if (user.role === role) return
              roleMutation.mutate({ id: user.id, role })
            }}
            onStatusChange={(user, isActive) =>
              statusMutation.mutate({ id: user.id, isActive })
            }
          />
          <ListPagination
            page={page}
            onPageChange={setPage}
            hasNextPage={hasNextPage}
            isLoading={usersQuery.isFetching}
          />
        </>
      )}
    </div>
  )
}

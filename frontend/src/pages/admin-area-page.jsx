import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { EmptyStateCard } from "@/components/shared/empty-state-card"
import { PageHeader } from "@/components/shared/page-header"
import { ListPagination } from "@/components/shared/list-pagination"
import { TableSkeleton } from "@/components/shared/table-skeleton"
import { ROUTES } from "@/lib/constants/routes"
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value"
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
      <PageHeader
        title="User management"
        description="Manage roles and account status for people in your organization."
        hideTitle
        actions={
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search users..."
              className="pl-8"
              aria-label="Search users"
            />
          </div>
        }
      />

      <Link
        to={ROUTES.REGISTER}
        className="inline-block text-sm font-medium text-primary hover:underline"
      >
        Create new user
      </Link>

      {usersQuery.isLoading ? (
        <TableSkeleton rows={6} columns={5} />
      ) : usersQuery.isError ? (
        <ErrorDisplay error={usersQuery.error} onRetry={() => usersQuery.refetch()} />
      ) : users.length === 0 ? (
        <EmptyStateCard
          icon={Users}
          title="No users found"
          description="Try a different search term or create a new user account."
        />
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

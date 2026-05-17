import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { PageHeader } from "@/components/shared/page-header"
import { ListPagination } from "@/components/shared/list-pagination"
import { useAuth } from "@/lib/auth/use-auth"
import { TEAM_STATUS_FILTER_ALL } from "@/features/teams/lib/team-status"
import {
  canDeleteTeam,
  canManageTeams,
} from "@/features/teams/lib/team-permissions"
import { getTeamDetailRoute } from "@/features/teams/lib/team-routes"
import { useDebouncedValue } from "@/features/teams/hooks/use-debounced-value"
import { useTeams } from "@/features/teams/hooks/use-teams"
import { useTeamMutations } from "@/features/teams/hooks/use-team-mutations"
import { TeamFilters } from "@/features/teams/components/team-filters"
import { TeamViewToggle } from "@/features/teams/components/team-view-toggle"
import { TeamTable } from "@/features/teams/components/team-table"
import { TeamCardGrid } from "@/features/teams/components/team-card-grid"
import { TeamListSkeleton } from "@/features/teams/components/team-list-skeleton"
import { TeamEmptyState } from "@/features/teams/components/team-empty-state"
import { TeamFormDialog } from "@/features/teams/components/team-form-dialog"
import { TeamDeleteDialog } from "@/features/teams/components/team-delete-dialog"

const PAGE_LIMIT = 10

const COPY = {
  teams: {
    title: "Teams",
    subtitle: "Manage project teams, members, and delivery status.",
    create: "Create team",
    entityLabel: "Team",
  },
  projects: {
    title: "Projects",
    subtitle: "Plan projects, timelines, and team assignments.",
    create: "Create project",
    entityLabel: "Project",
  },
}

export function TeamsPage({ variant = "teams" }) {
  const copy = COPY[variant] ?? COPY.teams
  const detailRoute = (id) => getTeamDetailRoute(variant, id)
  const { user } = useAuth()
  const role = user?.role

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(TEAM_STATUS_FILTER_ALL)
  const [view, setView] = useState("table")

  const [createOpen, setCreateOpen] = useState(false)
  const [editTeam, setEditTeam] = useState(null)
  const [deleteTeamTarget, setDeleteTeamTarget] = useState(null)

  const debouncedSearch = useDebouncedValue(search)

  const teamsQuery = useTeams({
    page,
    limit: PAGE_LIMIT,
    search: debouncedSearch,
    status,
  })

  const { createMutation, updateMutation, deleteMutation } = useTeamMutations({
    variant,
  })

  const teams = teamsQuery.data ?? []
  const canManage = canManageTeams(role)
  const canDelete = canDeleteTeam(role)
  const isFiltered = status !== TEAM_STATUS_FILTER_ALL
  const hasNextPage = !isFiltered && teams.length >= PAGE_LIMIT

  function handleSearchChange(value) {
    setSearch(value)
    setPage(1)
  }

  function handleStatusChange(value) {
    setStatus(value)
    setPage(1)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={copy.title}
        description={copy.subtitle}
        hideTitle
        actions={
          <>
            <TeamViewToggle view={view} onViewChange={setView} />
            {canManage ? (
              <Button type="button" onClick={() => setCreateOpen(true)}>
                <Plus className="size-4" aria-hidden />
                {copy.create}
              </Button>
            ) : null}
          </>
        }
      />

      <TeamFilters
        search={search}
        onSearchChange={handleSearchChange}
        status={status}
        onStatusChange={handleStatusChange}
      />

      {teamsQuery.isLoading ? (
        <TeamListSkeleton view={view} />
      ) : teamsQuery.isError ? (
        <ErrorDisplay
          error={teamsQuery.error}
          onRetry={() => teamsQuery.refetch()}
        />
      ) : teams.length === 0 ? (
        <TeamEmptyState
          variant={variant}
          canCreate={canManage}
          onCreate={() => setCreateOpen(true)}
        />
      ) : (
        <>
          {view === "table" ? (
            <TeamTable
              teams={teams}
              detailRoute={detailRoute}
              entityLabel={copy.entityLabel}
              canManage={canManage}
              canDelete={canDelete}
              onEdit={setEditTeam}
              onDelete={setDeleteTeamTarget}
            />
          ) : (
            <TeamCardGrid
              teams={teams}
              detailRoute={detailRoute}
              canManage={canManage}
              canDelete={canDelete}
              onEdit={setEditTeam}
              onDelete={setDeleteTeamTarget}
            />
          )}

          {!isFiltered ? (
            <ListPagination
              page={page}
              onPageChange={setPage}
              hasNextPage={hasNextPage}
              isLoading={teamsQuery.isFetching}
            />
          ) : null}
        </>
      )}

      <TeamFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={(body) => createMutation.mutateAsync(body)}
      />

      <TeamFormDialog
        open={Boolean(editTeam)}
        onOpenChange={(open) => !open && setEditTeam(null)}
        mode="edit"
        team={editTeam}
        isSubmitting={updateMutation.isPending}
        onSubmit={(body) =>
          updateMutation.mutateAsync({ id: editTeam.id, body })
        }
      />

      <TeamDeleteDialog
        open={Boolean(deleteTeamTarget)}
        onOpenChange={(open) => !open && setDeleteTeamTarget(null)}
        team={deleteTeamTarget}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(deleteTeamTarget.id)}
      />
    </div>
  )
}

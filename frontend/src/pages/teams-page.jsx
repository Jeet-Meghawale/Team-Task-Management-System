import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { useAuth } from "@/lib/auth/use-auth"
import { TEAM_STATUS_FILTER_ALL } from "@/features/teams/lib/team-status"
import {
  canDeleteTeam,
  canManageTeams,
} from "@/features/teams/lib/team-permissions"
import { useDebouncedValue } from "@/features/teams/hooks/use-debounced-value"
import { useTeams } from "@/features/teams/hooks/use-teams"
import { useTeamMutations } from "@/features/teams/hooks/use-team-mutations"
import { TeamFilters } from "@/features/teams/components/team-filters"
import { TeamViewToggle } from "@/features/teams/components/team-view-toggle"
import { TeamTable } from "@/features/teams/components/team-table"
import { TeamCardGrid } from "@/features/teams/components/team-card-grid"
import { TeamListSkeleton } from "@/features/teams/components/team-list-skeleton"
import { TeamEmptyState } from "@/features/teams/components/team-empty-state"
import { TeamPagination } from "@/features/teams/components/team-pagination"
import { TeamFormDialog } from "@/features/teams/components/team-form-dialog"
import { TeamDeleteDialog } from "@/features/teams/components/team-delete-dialog"

const PAGE_LIMIT = 10

const COPY = {
  teams: {
    title: "Teams",
    subtitle: "Manage project teams, members, and delivery status.",
    create: "Create team",
  },
  projects: {
    title: "Projects",
    subtitle: "Plan projects, timelines, and team assignments.",
    create: "Create project",
  },
}

export function TeamsPage({ variant = "teams" }) {
  const copy = COPY[variant] ?? COPY.teams
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

  const { createMutation, updateMutation, deleteMutation } = useTeamMutations()

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {copy.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{copy.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TeamViewToggle view={view} onViewChange={setView} />
          {canManage ? (
            <Button type="button" onClick={() => setCreateOpen(true)}>
              <Plus className="size-4" />
              {copy.create}
            </Button>
          ) : null}
        </div>
      </div>

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
          canCreate={canManage}
          onCreate={() => setCreateOpen(true)}
        />
      ) : (
        <>
          {view === "table" ? (
            <TeamTable
              teams={teams}
              canManage={canManage}
              canDelete={canDelete}
              onEdit={setEditTeam}
              onDelete={setDeleteTeamTarget}
            />
          ) : (
            <TeamCardGrid
              teams={teams}
              canManage={canManage}
              canDelete={canDelete}
              onEdit={setEditTeam}
              onDelete={setDeleteTeamTarget}
            />
          )}

          {!isFiltered ? (
            <TeamPagination
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

import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { ROUTES } from "@/lib/constants/routes"
import { useAuth } from "@/lib/auth/use-auth"
import { useTeam } from "@/features/teams/hooks/use-team"
import { useTeamMutations } from "@/features/teams/hooks/use-team-mutations"
import {
  canDeleteTeam,
  canManageTeams,
} from "@/features/teams/lib/team-permissions"
import { formatDisplayDate } from "@/features/teams/lib/normalize-team"
import { TeamStatusBadge } from "@/features/teams/components/team-status-badge"
import { TeamMembersSection } from "@/features/teams/components/team-members-section"
import { TeamDetailSkeleton } from "@/features/teams/components/team-detail-skeleton"
import { TeamFormDialog } from "@/features/teams/components/team-form-dialog"
import { TeamDeleteDialog } from "@/features/teams/components/team-delete-dialog"
import { useState } from "react"

export function TeamDetailsPage({ variant = "teams" }) {
  const { teamId } = useParams()
  const listRoute = variant === "projects" ? ROUTES.PROJECTS : ROUTES.TEAMS
  const entityLabel = variant === "projects" ? "Project" : "Team"
  const { user } = useAuth()
  const role = user?.role

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const teamQuery = useTeam(teamId)
  const { updateMutation, deleteMutation, assignMembersMutation } =
    useTeamMutations()

  const canManage = canManageTeams(role)
  const canDelete = canDeleteTeam(role)

  if (teamQuery.isLoading) {
    return <TeamDetailSkeleton />
  }

  if (teamQuery.isError) {
    return (
      <ErrorDisplay error={teamQuery.error} onRetry={() => teamQuery.refetch()} />
    )
  }

  const team = teamQuery.data
  if (!team) {
    return (
      <ErrorDisplay
        title={`${entityLabel} not found`}
        error={new Error(`This ${entityLabel.toLowerCase()} may have been removed.`)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
            <Link to={listRoute}>
              <ArrowLeft className="size-4" />
              Back to {variant === "projects" ? "projects" : "teams"}
            </Link>
          </Button>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{team.name}</h1>
              <TeamStatusBadge status={team.status} />
            </div>
            {team.description ? (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {team.description}
              </p>
            ) : null}
          </div>
        </div>

        {(canManage || canDelete) && (
          <div className="flex flex-wrap gap-2">
            {canManage ? (
              <Button type="button" variant="outline" onClick={() => setEditOpen(true)}>
                <Pencil className="size-4" />
                Edit
              </Button>
            ) : null}
            {canDelete ? (
              <Button
                type="button"
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            ) : null}
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>{entityLabel} timeline and workload snapshot</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OverviewItem label="Members" value={team.memberCount} />
          <OverviewItem label="Tasks" value={team.taskCount} />
          <OverviewItem label="Start date" value={formatDisplayDate(team.startDate)} />
          <OverviewItem label="End date" value={formatDisplayDate(team.endDate)} />
        </CardContent>
      </Card>

      <TeamMembersSection
        team={team}
        userRole={role}
        onAssignMembers={(userIds) =>
          assignMembersMutation.mutateAsync({ teamId: team.id, userIds })
        }
        isAssigning={assignMembersMutation.isPending}
      />

      {team.tasks.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Recent tasks</CardTitle>
            <CardDescription>Tasks linked to this team</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {team.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between gap-3 py-3 text-sm"
                >
                  <span className="font-medium text-foreground">{task.title}</span>
                  <span className="text-muted-foreground">
                    {task.status} · {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      <TeamFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        team={team}
        isSubmitting={updateMutation.isPending}
        onSubmit={(body) => updateMutation.mutateAsync({ id: team.id, body })}
      />

      <TeamDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        team={team}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(team.id)}
      />
    </div>
  )
}

function OverviewItem({ label, value }) {
  return (
    <div className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2.5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
        {value}
      </p>
    </div>
  )
}

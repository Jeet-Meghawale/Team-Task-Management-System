import { useState } from "react"
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
import { useProject } from "@/features/projects/hooks/use-project"
import { useProjectMutations } from "@/features/projects/hooks/use-project-mutations"
import {
  canDeleteProject,
  canManageProjects,
} from "@/features/projects/lib/project-permissions"
import { formatDisplayDate } from "@/features/projects/lib/normalize-project"
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge"
import { ProjectMembersSection } from "@/features/projects/components/project-members-section"
import { ProjectDetailSkeleton } from "@/features/projects/components/project-detail-skeleton"
import { ProjectFormDialog } from "@/features/projects/components/project-form-dialog"
import { ProjectDeleteDialog } from "@/features/projects/components/project-delete-dialog"

export function ProjectDetailsPage() {
  const { projectId } = useParams()
  const { user } = useAuth()
  const role = user?.role

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const projectQuery = useProject(projectId)
  const { updateMutation, deleteMutation, assignMembersMutation } =
    useProjectMutations()

  const canManage = canManageProjects(role)
  const canDelete = canDeleteProject(role)

  if (projectQuery.isLoading) {
    return <ProjectDetailSkeleton />
  }

  if (projectQuery.isError) {
    return (
      <ErrorDisplay
        error={projectQuery.error}
        onRetry={() => projectQuery.refetch()}
      />
    )
  }

  const project = projectQuery.data
  if (!project) {
    return (
      <ErrorDisplay
        title="Project not found"
        error={new Error("This project may have been removed.")}
      />
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit text-muted-foreground">
            <Link to={ROUTES.PROJECTS}>
              <ArrowLeft className="size-4" />
              Back to projects
            </Link>
          </Button>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
              <ProjectStatusBadge status={project.status} />
            </div>
            {project.description ? (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {project.description}
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OverviewItem label="Members" value={project.memberCount} />
        <OverviewItem label="Tasks" value={project.taskCount} />
        <OverviewItem label="Start date" value={formatDisplayDate(project.startDate)} />
        <OverviewItem label="End date" value={formatDisplayDate(project.endDate)} />
      </div>

      <ProjectMembersSection
        project={project}
        userRole={role}
        onAssignMembers={(userIds) =>
          assignMembersMutation.mutateAsync({ projectId: project.id, userIds })
        }
        isAssigning={assignMembersMutation.isPending}
      />

      {project.tasks.length > 0 ? (
        <Card className="border-border/60 bg-card/50 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Recent tasks</CardTitle>
            <CardDescription>Tasks linked to this project</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border/60">
              {project.tasks.map((task) => (
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

      <ProjectFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        mode="edit"
        project={project}
        isSubmitting={updateMutation.isPending}
        onSubmit={(body) => updateMutation.mutateAsync({ id: project.id, body })}
      />

      <ProjectDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        project={project}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(project.id)}
      />
    </div>
  )
}

function OverviewItem({ label, value }) {
  return (
    <div className="rounded-xl bg-muted/30 px-4 py-3 ring-1 ring-border/50">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">
        {value}
      </p>
    </div>
  )
}

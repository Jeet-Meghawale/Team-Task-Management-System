import { Link } from "react-router-dom"
import { ListTodo, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/shared/glass-card"
import { ProgressBar } from "@/components/shared/progress-bar"
import { AvatarStack } from "@/components/shared/avatar-stack"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge"
import { getProjectProgress } from "@/features/projects/lib/project-progress"
import { formatDisplayDate } from "@/lib/format/date"

export function ProjectCardGrid({
  projects,
  detailRoute,
  canManage,
  canDelete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => {
        const progress = getProjectProgress(project)

        return (
          <GlassCard
            key={project.id}
            className="group relative p-0 transition-all duration-300 hover:-translate-y-0.5 hover:glow-primary"
          >
            <div className="p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1 space-y-2">
                  <Link
                    to={detailRoute(project.id)}
                    className="block truncate text-base font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {project.name}
                  </Link>
                  <ProjectStatusBadge status={project.status} />
                </div>
                {(canManage || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label={`Actions for ${project.name}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canManage ? (
                        <DropdownMenuItem onClick={() => onEdit(project)}>
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                      ) : null}
                      {canDelete ? (
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(project)}
                        >
                          <Trash2 />
                          Delete
                        </DropdownMenuItem>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {project.description ? (
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              ) : null}

              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium tabular-nums text-foreground">
                      {progress}%
                    </span>
                  </div>
                  <ProgressBar value={progress} />
                </div>

                <div className="flex items-center justify-between">
                  <AvatarStack count={project.memberCount} />
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <ListTodo className="size-3.5" aria-hidden />
                    {project.taskCount} tasks
                  </span>
                </div>

                <p className="text-xs text-muted-foreground">
                  Starts {formatDisplayDate(project.startDate)}
                </p>
              </div>
            </div>
          </GlassCard>
        )
      })}
    </div>
  )
}

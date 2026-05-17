import { Link } from "react-router-dom"
import { Users, ListTodo, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge"
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
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="relative border-border/60 bg-card/50 shadow-none transition-colors hover:border-border hover:bg-card"
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 space-y-1.5">
                <CardTitle className="truncate text-base">
                  <Link
                    to={detailRoute(project.id)}
                    className="hover:text-primary"
                  >
                    {project.name}
                  </Link>
                </CardTitle>
                <ProjectStatusBadge status={project.status} />
              </div>
              {(canManage || canDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
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
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5" aria-hidden />
                {project.memberCount} members
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ListTodo className="size-3.5" aria-hidden />
                {project.taskCount} tasks
              </span>
            </div>
            <p>Starts {formatDisplayDate(project.startDate)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

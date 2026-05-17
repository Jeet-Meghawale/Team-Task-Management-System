import { Link } from "react-router-dom"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableShell } from "@/components/shared/data-table-shell"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge"
import { formatDisplayDate } from "@/lib/format/date"

export function ProjectTable({
  projects,
  detailRoute,
  canManage,
  canDelete,
  onEdit,
  onDelete,
}) {
  return (
    <DataTableShell>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Project</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Members</TableHead>
            <TableHead className="hidden lg:table-cell">Tasks</TableHead>
            <TableHead className="hidden md:table-cell">Start</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="group">
              <TableCell>
                <Link
                  to={detailRoute(project.id)}
                  className="font-medium text-foreground hover:text-primary"
                >
                  {project.name}
                </Link>
                {project.description ? (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {project.description}
                  </p>
                ) : null}
                <div className="mt-1 flex flex-wrap items-center gap-2 sm:hidden">
                  <ProjectStatusBadge status={project.status} />
                  <span className="text-xs text-muted-foreground">
                    {project.memberCount} members · {project.taskCount} tasks
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <ProjectStatusBadge status={project.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell tabular-nums">
                {project.memberCount}
              </TableCell>
              <TableCell className="hidden lg:table-cell tabular-nums">
                {project.taskCount}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {formatDisplayDate(project.startDate)}
              </TableCell>
              <TableCell>
                {(canManage || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="opacity-70 group-hover:opacity-100"
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableShell>
  )
}

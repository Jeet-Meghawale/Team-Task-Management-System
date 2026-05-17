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
import { TeamStatusBadge } from "@/features/teams/components/team-status-badge"
import { formatDisplayDate } from "@/lib/format/date"

export function TeamTable({
  teams,
  detailRoute,
  entityLabel = "Team",
  canManage,
  canDelete,
  onEdit,
  onDelete,
}) {
  return (
    <DataTableShell>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{entityLabel}</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Members</TableHead>
            <TableHead className="hidden lg:table-cell">Tasks</TableHead>
            <TableHead className="hidden md:table-cell">Start</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>
                <Link
                  to={detailRoute(team.id)}
                  className="font-medium text-foreground hover:underline"
                >
                  {team.name}
                </Link>
                {team.description ? (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {team.description}
                  </p>
                ) : null}
                <div className="mt-1 flex flex-wrap items-center gap-2 sm:hidden">
                  <TeamStatusBadge status={team.status} />
                  <span className="text-xs text-muted-foreground">
                    {team.memberCount} members · {team.taskCount} tasks
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <TeamStatusBadge status={team.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">{team.memberCount}</TableCell>
              <TableCell className="hidden lg:table-cell">{team.taskCount}</TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {formatDisplayDate(team.startDate)}
              </TableCell>
              <TableCell>
                {(canManage || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Actions for ${team.name}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canManage ? (
                        <DropdownMenuItem onClick={() => onEdit(team)}>
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                      ) : null}
                      {canDelete ? (
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDelete(team)}
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

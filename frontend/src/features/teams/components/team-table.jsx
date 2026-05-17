import { Link } from "react-router-dom"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { formatDisplayDate } from "@/features/teams/lib/normalize-team"
import { ROUTES } from "@/lib/constants/routes"

export function TeamTable({
  teams,
  canManage,
  canDelete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Start</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>
                <Link
                  to={ROUTES.TEAM_DETAIL(team.id)}
                  className="font-medium text-foreground hover:underline"
                >
                  {team.name}
                </Link>
                {team.description ? (
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {team.description}
                  </p>
                ) : null}
              </TableCell>
              <TableCell>
                <TeamStatusBadge status={team.status} />
              </TableCell>
              <TableCell>{team.memberCount}</TableCell>
              <TableCell>{team.taskCount}</TableCell>
              <TableCell className="text-muted-foreground">
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
    </div>
  )
}

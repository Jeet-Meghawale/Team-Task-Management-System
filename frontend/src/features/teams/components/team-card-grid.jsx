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
import { TeamStatusBadge } from "@/features/teams/components/team-status-badge"
import { formatDisplayDate } from "@/lib/format/date"

export function TeamCardGrid({
  teams,
  detailRoute,
  canManage,
  canDelete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {teams.map((team) => (
        <Card key={team.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 space-y-1">
                <CardTitle className="truncate text-base">
                  <Link
                    to={detailRoute(team.id)}
                    className="hover:underline"
                  >
                    {team.name}
                  </Link>
                </CardTitle>
                <TeamStatusBadge status={team.status} />
              </div>
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
            </div>
            {team.description ? (
              <CardDescription className="line-clamp-2">
                {team.description}
              </CardDescription>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5" />
                {team.memberCount} members
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ListTodo className="size-3.5" />
                {team.taskCount} tasks
              </span>
            </div>
            <p>Starts {formatDisplayDate(team.startDate)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

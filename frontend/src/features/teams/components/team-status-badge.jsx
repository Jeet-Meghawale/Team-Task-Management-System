import { Badge } from "@/components/ui/badge"
import {
  getTeamStatusLabel,
  TEAM_STATUS_STYLES,
} from "@/features/teams/lib/team-status"
import { cn } from "@/lib/utils"

export function TeamStatusBadge({ status, className }) {
  return (
    <Badge
      variant="outline"
      className={cn(TEAM_STATUS_STYLES[status], className)}
    >
      {getTeamStatusLabel(status)}
    </Badge>
  )
}

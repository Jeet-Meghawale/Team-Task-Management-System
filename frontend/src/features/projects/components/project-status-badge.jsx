import { Badge } from "@/components/ui/badge"
import {
  getProjectStatusLabel,
  PROJECT_STATUS_STYLES,
} from "@/features/projects/lib/project-status"
import { cn } from "@/lib/utils"

export function ProjectStatusBadge({ status, className }) {
  return (
    <Badge
      variant="outline"
      className={cn(PROJECT_STATUS_STYLES[status], className)}
    >
      {getProjectStatusLabel(status)}
    </Badge>
  )
}

import { Badge } from "@/components/ui/badge"
import { USER_ROLES } from "@/lib/auth/roles"
import { cn } from "@/lib/utils"

const ROLE_STYLES = {
  [USER_ROLES.ADMIN]: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  [USER_ROLES.MANAGER]: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  [USER_ROLES.DEVELOPER]: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
}

export function UserRoleBadge({ role, className }) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", ROLE_STYLES[role], className)}
    >
      {role}
    </Badge>
  )
}

import {
  Bell,
  CheckSquare,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Shield,
} from "lucide-react"
import { ROUTES } from "@/lib/constants/routes"
import { USER_ROLES } from "@/lib/auth/roles"

/**
 * Primary app navigation. Filter by `roles` when present.
 */
export const APP_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: ROUTES.PROJECTS,
    icon: FolderKanban,
  },
  {
    label: "Tasks",
    href: ROUTES.TASKS,
    icon: CheckSquare,
  },
  {
    label: "Assignments",
    href: ROUTES.ASSIGNMENTS,
    icon: ClipboardList,
  },
  {
    label: "Notifications",
    href: ROUTES.NOTIFICATIONS,
    icon: Bell,
  },
  {
    label: "Admin",
    href: ROUTES.ADMIN,
    icon: Shield,
    roles: [USER_ROLES.ADMIN],
  },
]

export function filterNavItemsByRole(items, userRole) {
  return items.filter((item) => {
    if (!item.roles?.length) return true
    return item.roles.includes(userRole)
  })
}

export function isNavItemActive(pathname, href) {
  if (href === ROUTES.DASHBOARD) {
    return pathname === ROUTES.DASHBOARD || pathname === ROUTES.APP_ROOT
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

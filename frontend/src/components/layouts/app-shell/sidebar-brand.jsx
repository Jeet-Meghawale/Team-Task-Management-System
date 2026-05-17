import { Link } from "react-router-dom"
import { Layers } from "lucide-react"
import { ROUTES } from "@/lib/constants/routes"
import { cn } from "@/lib/utils"

export function SidebarBrand({ collapsed }) {
  return (
    <Link
      to={ROUTES.DASHBOARD}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-sidebar-accent/60",
        collapsed && "justify-center px-0",
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Layers className="size-4" aria-hidden />
      </span>
      {!collapsed ? (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold text-sidebar-foreground">
            Taskboard
          </span>
          <span className="truncate text-xs text-sidebar-foreground/60">
            Project management
          </span>
        </span>
      ) : null}
    </Link>
  )
}

import { Link } from "react-router-dom"
import { Layers } from "lucide-react"
import { ROUTES } from "@/lib/constants/routes"
import { cn } from "@/lib/utils"

export function SidebarBrand({ collapsed }) {
  return (
    <Link
      to={ROUTES.DASHBOARD}
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-all duration-200 hover:bg-sidebar-accent/40",
        collapsed && "justify-center px-0",
      )}
    >
      <span className="gradient-primary flex size-9 shrink-0 items-center justify-center rounded-xl text-white shadow-lg shadow-brand-primary/30">
        <Layers className="size-4" aria-hidden />
      </span>
      {!collapsed ? (
        <span className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
            Taskboard
          </span>
          <span className="truncate text-[11px] text-sidebar-foreground/50">
            Work management
          </span>
        </span>
      ) : null}
    </Link>
  )
}

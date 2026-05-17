import { NavLink, useLocation } from "react-router-dom"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { isNavItemActive } from "@/lib/navigation/app-nav-config"
import { cn } from "@/lib/utils"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"

export function SidebarNavItem({ item, collapsed, onNavigate }) {
  const location = useLocation()
  const { setMobileOpen } = useAppShell()
  const isActive = isNavItemActive(location.pathname, item.href)
  const Icon = item.icon

  function handleClick() {
    onNavigate?.()
    setMobileOpen(false)
  }

  const link = (
    <NavLink
      to={item.href}
      onClick={handleClick}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2",
      )}
    >
      {isActive ? (
        <span
          className="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary"
          aria-hidden
        />
      ) : null}
      <Icon
        className={cn(
          "size-4 shrink-0 transition-colors",
          isActive
            ? "text-sidebar-primary"
            : "text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground",
        )}
        aria-hidden
      />
      {!collapsed ? (
        <span className="truncate">{item.label}</span>
      ) : (
        <span className="sr-only">{item.label}</span>
      )}
    </NavLink>
  )

  if (!collapsed) return link

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  )
}

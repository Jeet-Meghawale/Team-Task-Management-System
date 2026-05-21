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
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "nav-active-glow bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
        collapsed && "justify-center px-2",
      )}
    >
      <Icon
        className={cn(
          "size-[1.125rem] shrink-0 transition-all duration-200",
          isActive
            ? "text-brand-primary"
            : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground",
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
      <TooltipContent side="right" className="glass-panel">
        {item.label}
      </TooltipContent>
    </Tooltip>
  )
}

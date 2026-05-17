import { APP_NAV_ITEMS, filterNavItemsByRole } from "@/lib/navigation/app-nav-config"
import { useAuth } from "@/lib/auth/use-auth"
import { SidebarNavItem } from "@/components/layouts/app-shell/sidebar-nav-item"
import { cn } from "@/lib/utils"

export function SidebarNav({ collapsed, onNavigate, className }) {
  const { user } = useAuth()
  const items = filterNavItemsByRole(APP_NAV_ITEMS, user?.role)

  return (
    <nav
      className={cn("flex flex-1 flex-col gap-1 px-2 py-2", className)}
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <SidebarNavItem
          key={item.href}
          item={item}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}

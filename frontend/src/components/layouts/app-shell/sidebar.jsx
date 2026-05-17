import { SidebarBrand } from "@/components/layouts/app-shell/sidebar-brand"
import { SidebarNav } from "@/components/layouts/app-shell/sidebar-nav"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { collapsed } = useAppShell()

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "relative hidden h-screen shrink-0 flex-col border-r border-sidebar-border/80 bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-in-out lg:flex",
        collapsed ? "w-[4.25rem]" : "w-60",
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border/80 px-3">
        <SidebarBrand collapsed={collapsed} />
      </div>

      <SidebarNav collapsed={collapsed} className="flex-1 overflow-y-auto py-2" />
    </aside>
  )
}

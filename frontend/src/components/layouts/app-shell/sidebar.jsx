import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarBrand } from "@/components/layouts/app-shell/sidebar-brand"
import { SidebarNav } from "@/components/layouts/app-shell/sidebar-nav"
import { UserMenu } from "@/components/layouts/app-shell/user-menu"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useAppShell()

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "relative hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar/95 text-sidebar-foreground backdrop-blur-xl transition-[width] duration-300 ease-in-out lg:flex",
        collapsed ? "w-[4.5rem]" : "w-64",
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        <SidebarBrand collapsed={collapsed} />
      </div>

      <SidebarNav collapsed={collapsed} className="flex-1 overflow-y-auto py-3" />

      <div
        className={cn(
          "mt-auto space-y-2 border-t border-sidebar-border p-3",
          collapsed && "flex flex-col items-center",
        )}
      >
        <UserMenu collapsed={collapsed} />
        <Button
          type="button"
          variant="ghost"
          size={collapsed ? "icon-sm" : "sm"}
          className={cn(
            "w-full text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            collapsed && "size-8",
          )}
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <>
              <PanelLeftClose className="size-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}

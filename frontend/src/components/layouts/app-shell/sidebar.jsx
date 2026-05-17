import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarBrand } from "@/components/layouts/app-shell/sidebar-brand"
import { SidebarNav } from "@/components/layouts/app-shell/sidebar-nav"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useAppShell()

  return (
    <aside
      data-collapsed={collapsed}
      className={cn(
        "relative hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-in-out lg:flex",
        collapsed ? "w-[4.25rem]" : "w-60",
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-3">
        <SidebarBrand collapsed={collapsed} />
      </div>

      <SidebarNav collapsed={collapsed} className="flex-1 overflow-y-auto" />

      <div
        className={cn(
          "mt-auto flex border-t border-sidebar-border p-2",
          collapsed ? "justify-center" : "justify-end",
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="size-8 text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
      </div>
    </aside>
  )
}

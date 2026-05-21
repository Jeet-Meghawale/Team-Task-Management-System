import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { SidebarBrand } from "@/components/layouts/app-shell/sidebar-brand"
import { SidebarNav } from "@/components/layouts/app-shell/sidebar-nav"
import { UserMenu } from "@/components/layouts/app-shell/user-menu"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useAppShell()

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        className="flex w-[min(100%,18rem)] flex-col border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <SidebarBrand collapsed={false} />
        </div>
        <SidebarNav collapsed={false} className="flex-1 px-3 py-4" />
        <div className="border-t border-sidebar-border p-4">
          <UserMenu collapsed={false} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

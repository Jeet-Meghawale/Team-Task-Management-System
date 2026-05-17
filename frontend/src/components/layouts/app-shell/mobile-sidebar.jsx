import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { SidebarBrand } from "@/components/layouts/app-shell/sidebar-brand"
import { SidebarNav } from "@/components/layouts/app-shell/sidebar-nav"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"

export function MobileSidebar() {
  const { mobileOpen, setMobileOpen } = useAppShell()

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        className="flex w-[min(100%,18rem)] flex-col p-0"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <SidebarBrand collapsed={false} />
        </div>
        <SidebarNav collapsed={false} className="flex-1 px-2 py-3" />
      </SheetContent>
    </Sheet>
  )
}

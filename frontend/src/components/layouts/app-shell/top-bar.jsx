import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/layouts/app-shell/theme-toggle"
import { UserMenu } from "@/components/layouts/app-shell/user-menu"
import { usePageTitle } from "@/components/layouts/app-shell/use-page-title"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"

export function TopBar() {
  const title = usePageTitle()
  const { collapsed, toggleCollapsed, setMobileOpen } = useAppShell()

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/80 bg-background/80 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="size-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="hidden size-8 lg:inline-flex"
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <PanelLeftOpen className="size-4" />
        ) : (
          <PanelLeftClose className="size-4" />
        )}
      </Button>

      <Separator orientation="vertical" className="hidden h-5 sm:block" />

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold text-foreground">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <UserMenu collapsed />
      </div>
    </header>
  )
}

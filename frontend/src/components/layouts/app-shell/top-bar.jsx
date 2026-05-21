import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layouts/app-shell/theme-toggle"
import { NotificationBell } from "@/features/notifications/components/notification-bell"
import { UserMenu } from "@/components/layouts/app-shell/user-menu"
import { SearchInput } from "@/components/shared/search-input"
import { useAppShell } from "@/components/layouts/app-shell/use-app-shell"

export function TopBar() {
  const { setMobileOpen } = useAppShell()

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9 shrink-0 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
      >
        <Menu className="size-4" />
      </Button>

      <SearchInput
        className="hidden flex-1 sm:flex"
        placeholder="Search projects, tasks..."
        aria-label="Search"
      />

      <div className="ml-auto flex items-center gap-1">
        <NotificationBell />
        <ThemeToggle />
        <div className="hidden sm:block">
          <UserMenu collapsed />
        </div>
      </div>
    </header>
  )
}

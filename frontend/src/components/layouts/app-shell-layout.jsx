import { Outlet } from "react-router-dom"
import { AppShellProvider } from "@/components/layouts/app-shell/app-shell-provider"
import { Sidebar } from "@/components/layouts/app-shell/sidebar"
import { MobileSidebar } from "@/components/layouts/app-shell/mobile-sidebar"
import { TopBar } from "@/components/layouts/app-shell/top-bar"
import { MainContent } from "@/components/layouts/app-shell/main-content"

export function AppShellLayout() {
  return (
    <AppShellProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <MobileSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <MainContent>
            <Outlet />
          </MainContent>
        </div>
      </div>
    </AppShellProvider>
  )
}

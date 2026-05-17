import { Link, Outlet } from "react-router-dom"
import { ROUTES } from "@/lib/constants/routes"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border px-6 py-4">
        <Link
          to={ROUTES.LOGIN}
          className="text-sm font-medium text-foreground hover:underline"
        >
          Task &amp; Team Management
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

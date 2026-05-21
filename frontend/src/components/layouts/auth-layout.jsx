import { Link, Outlet } from "react-router-dom"
import { ROUTES } from "@/lib/constants/routes"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-white/5 bg-background/80 px-6 py-4 backdrop-blur-xl">
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <span className="gradient-primary flex size-8 items-center justify-center rounded-lg text-white">
            T
          </span>
          Taskboard
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

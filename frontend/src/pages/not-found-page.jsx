import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/constants/routes"

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The route you requested does not exist.
      </p>
      <Link
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        to={ROUTES.HOME}
      >
        Go home
      </Link>
    </div>
  )
}

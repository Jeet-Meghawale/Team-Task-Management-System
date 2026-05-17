import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants/routes"

export function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">
          Team Task Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Frontend shell aligned with the Express API at{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">/api/v1</code>.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to={ROUTES.LOGIN}>Sign in</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={ROUTES.APP_ROOT}>Open app</Link>
        </Button>
      </div>
    </div>
  )
}

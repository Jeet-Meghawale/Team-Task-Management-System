import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants/routes"

export function ForbiddenPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Access denied</h1>
      <p className="text-sm text-muted-foreground">
        You do not have permission to view this area. Ask an administrator if
        you believe this is a mistake.
      </p>
      <Button asChild variant="outline">
        <Link to={ROUTES.DASHBOARD}>Return to dashboard</Link>
      </Button>
    </div>
  )
}

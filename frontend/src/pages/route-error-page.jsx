import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants/routes"

export function RouteErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    const isNotFound = error.status === 404
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold">
          {isNotFound ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {isNotFound
            ? "The page you're looking for doesn't exist or may have moved."
            : "We couldn't load this page. Please try again or return home."}
        </p>
        <Button asChild variant="outline">
          <Link to={ROUTES.HOME}>Go home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        An unexpected error occurred. Please refresh the page or try again later.
      </p>
      <Button asChild variant="outline">
        <Link to={ROUTES.HOME}>Go home</Link>
      </Button>
    </div>
  )
}

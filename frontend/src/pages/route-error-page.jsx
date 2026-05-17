import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { ROUTES } from "@/lib/constants/routes"

export function RouteErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold">
          {error.status} {error.statusText}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {typeof error.data === "string"
            ? error.data
            : "This route failed to render."}
        </p>
        <Link
          to={ROUTES.HOME}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          Go home
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Unexpected error</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {getApiErrorMessage(error)}
      </p>
      <Link
        to={ROUTES.HOME}
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Go home
      </Link>
    </div>
  )
}

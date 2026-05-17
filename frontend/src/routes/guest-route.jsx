import { Navigate, Outlet, useLocation } from "react-router-dom"
import { PageLoader } from "@/components/feedback/page-loader"
import { ROUTES } from "@/lib/constants/routes"
import { useAuth } from "@/lib/auth/use-auth"

export function GuestRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitialLoading } = useAuth()

  if (isInitialLoading) {
    return <PageLoader />
  }

  if (isAuthenticated) {
    const target =
      location.state?.from?.pathname &&
      typeof location.state.from.pathname === "string"
        ? location.state.from.pathname
        : ROUTES.DASHBOARD
    return <Navigate to={target} replace />
  }

  return <Outlet />
}

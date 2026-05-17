import { Navigate, Outlet, useLocation } from "react-router-dom"
import { PageLoader } from "@/components/feedback/page-loader"
import { ROUTES } from "@/lib/constants/routes"
import { useAuth } from "@/lib/auth/use-auth"

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isInitialLoading } = useAuth()

  if (isInitialLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
    )
  }

  return <Outlet />
}

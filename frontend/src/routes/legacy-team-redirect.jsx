import { Navigate, useParams } from "react-router-dom"
import { ROUTES } from "@/lib/constants/routes"

/** Redirects old /app/teams/:id bookmarks to project detail. */
export function LegacyTeamDetailRedirect() {
  const { teamId } = useParams()
  return <Navigate to={ROUTES.PROJECT_DETAIL(teamId)} replace />
}

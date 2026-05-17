import { ROUTES } from "@/lib/constants/routes"

export function getTeamListRoute(variant = "teams") {
  return variant === "projects" ? ROUTES.PROJECTS : ROUTES.TEAMS
}

export function getTeamDetailRoute(variant = "teams", id) {
  return variant === "projects"
    ? ROUTES.PROJECT_DETAIL(id)
    : ROUTES.TEAM_DETAIL(id)
}

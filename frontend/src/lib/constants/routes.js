export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  APP_ROOT: "/app",
  DASHBOARD: "/app/dashboard",
  TEAMS: "/app/teams",
  TEAM_DETAIL: (teamId) => `/app/teams/${teamId}`,
  TASKS: "/app/tasks",
  ASSIGNMENTS: "/app/assignments",
  NOTIFICATIONS: "/app/notifications",
  ADMIN: "/app/admin",
  REGISTER: "/app/register",
  FORBIDDEN: "/forbidden",
}

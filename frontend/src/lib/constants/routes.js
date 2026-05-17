export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  APP_ROOT: "/app",
  DASHBOARD: "/app/dashboard",
  PROJECTS: "/app/projects",
  PROJECT_DETAIL: (projectId) => `/app/projects/${projectId}`,
  TASKS: "/app/tasks",
  ASSIGNMENTS: "/app/assignments",
  NOTIFICATIONS: "/app/notifications",
  ADMIN: "/app/admin",
  REGISTER: "/app/register",
  FORBIDDEN: "/forbidden",
}

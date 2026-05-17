import { createBrowserRouter, Navigate } from "react-router-dom"
import { RootLayout } from "@/app/root-layout"
import { RouteErrorPage } from "@/pages/route-error-page"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { ForbiddenPage } from "@/pages/forbidden-page"
import { LoginPage } from "@/pages/login-page"
import { DashboardPage } from "@/pages/dashboard-page"
import { AdminAreaPage } from "@/pages/admin-area-page"
import { RegisterPage } from "@/pages/register-page"
import { ProjectsPage } from "@/pages/projects-page"
import { ProjectDetailsPage } from "@/pages/project-details-page"
import { TasksPage } from "@/pages/tasks-page"
import { AssignmentsPage } from "@/pages/assignments-page"
import { NotificationsPage } from "@/pages/notifications-page"
import { AuthLayout } from "@/components/layouts/auth-layout"
import { AppShellLayout } from "@/components/layouts/app-shell-layout"
import { GuestRoute } from "@/routes/guest-route"
import { ProtectedRoute } from "@/routes/protected-route"
import { RoleRoute } from "@/routes/role-route"
import { ROUTES } from "@/lib/constants/routes"
import { PROTECTED_ROUTE_ROLES } from "@/lib/routing/role-route-config"
import { LegacyTeamDetailRedirect } from "@/routes/legacy-team-redirect"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.FORBIDDEN, element: <ForbiddenPage /> },
      {
        element: <GuestRoute />,
        children: [
          {
            path: ROUTES.LOGIN.slice(1),
            element: <AuthLayout />,
            children: [{ index: true, element: <LoginPage /> }],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.APP_ROOT.slice(1),
            element: <AppShellLayout />,
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: "dashboard", element: <DashboardPage /> },
              { path: "teams", element: <Navigate to="projects" replace /> },
              { path: "teams/:teamId", element: <LegacyTeamDetailRedirect /> },
              { path: "projects", element: <ProjectsPage /> },
              { path: "projects/:projectId", element: <ProjectDetailsPage /> },
              { path: "tasks", element: <TasksPage /> },
              { path: "assignments", element: <AssignmentsPage /> },
              { path: "notifications", element: <NotificationsPage /> },
              {
                path: "register",
                element: (
                  <RoleRoute
                    allowedRoles={PROTECTED_ROUTE_ROLES[ROUTES.REGISTER]}
                  />
                ),
                children: [{ index: true, element: <RegisterPage /> }],
              },
              {
                path: "admin",
                element: (
                  <RoleRoute
                    allowedRoles={PROTECTED_ROUTE_ROLES[ROUTES.ADMIN]}
                  />
                ),
                children: [{ index: true, element: <AdminAreaPage /> }],
              },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

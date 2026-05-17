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
import { TeamsPage } from "@/pages/teams-page"
import { TeamDetailsPage } from "@/pages/team-details-page"
import { AuthLayout } from "@/components/layouts/auth-layout"
import { AppShellLayout } from "@/components/layouts/app-shell-layout"
import { GuestRoute } from "@/routes/guest-route"
import { ProtectedRoute } from "@/routes/protected-route"
import { RoleRoute } from "@/routes/role-route"
import { ROUTES } from "@/lib/constants/routes"
import { PROTECTED_ROUTE_ROLES } from "@/lib/routing/role-route-config"

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
              { path: "teams", element: <TeamsPage /> },
              { path: "teams/:teamId", element: <TeamDetailsPage /> },
              {
                path: "tasks",
                element: (
                  <AppSectionPlaceholder
                    title="Tasks"
                    description="Track work across projects with filters, status updates, and assignments."
                  />
                ),
              },
              {
                path: "assignments",
                element: (
                  <AppSectionPlaceholder
                    title="Assignments"
                    description="View tasks assigned to you and manage workload across the team."
                  />
                ),
              },
              {
                path: "notifications",
                element: (
                  <AppSectionPlaceholder
                    title="Notifications"
                    description="Stay updated on task changes, mentions, and team activity."
                  />
                ),
              },
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

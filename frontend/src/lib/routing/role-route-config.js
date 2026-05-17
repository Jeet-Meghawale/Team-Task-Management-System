import { USER_ROLES } from "@/lib/auth/roles"
import { ROUTES } from "@/lib/constants/routes"

/**
 * Single source of truth for which app paths require which roles.
 * Router `RoleRoute` should stay in sync with this map while the app grows.
 */
export const PROTECTED_ROUTE_ROLES = Object.freeze({
  [ROUTES.ADMIN]: [USER_ROLES.ADMIN],
  [ROUTES.REGISTER]: [USER_ROLES.ADMIN],
})

import { ENDPOINTS } from "@/lib/api/endpoints"

/**
 * Centralized React Query keys. Import and extend per feature (e.g. tasks: { all: ... }).
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  root: (segment) => [segment],
  dashboard: {
    stats: [ENDPOINTS.DASHBOARD, "stats"],
  },
  teams: {
    all: ["teams"],
    list: (filters) => ["teams", "list", filters],
    detail: (id) => ["teams", "detail", id],
  },
  users: {
    list: (filters) => [ENDPOINTS.USERS, "list", filters],
  },
}

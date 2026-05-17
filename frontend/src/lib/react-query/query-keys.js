import { ENDPOINTS } from "@/lib/api/endpoints"

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
  projects: {
    all: ["projects"],
    list: (filters) => ["projects", "list", filters],
    detail: (id) => ["projects", "detail", id],
  },
  tasks: {
    all: ["tasks"],
    list: (filters) => ["tasks", "list", filters],
    detail: (id) => ["tasks", "detail", id],
    assigned: ["tasks", "assigned", "me"],
  },
  comments: {
    task: (taskId) => ["comments", taskId],
  },
  users: {
    all: [ENDPOINTS.USERS],
    list: (filters) => [ENDPOINTS.USERS, "list", filters],
    detail: (id) => [ENDPOINTS.USERS, "detail", id],
    assignable: ["users", "assignable"],
  },
}

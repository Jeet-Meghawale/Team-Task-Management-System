import { PROJECT_STATUSES } from "@/features/projects/lib/project-status"

export function getProjectProgress(project) {
  switch (project?.status) {
    case PROJECT_STATUSES.COMPLETED:
      return 100
    case PROJECT_STATUSES.ACTIVE:
      return 65
    case PROJECT_STATUSES.ON_HOLD:
      return 35
    case PROJECT_STATUSES.PLANNED:
    default:
      return 15
  }
}

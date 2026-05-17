export const PROJECT_STATUSES = Object.freeze({
  PLANNED: "PLANNED",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
})

export const PROJECT_STATUS_OPTIONS = [
  { value: PROJECT_STATUSES.PLANNED, label: "Planned" },
  { value: PROJECT_STATUSES.ACTIVE, label: "Active" },
  { value: PROJECT_STATUSES.COMPLETED, label: "Completed" },
  { value: PROJECT_STATUSES.ON_HOLD, label: "On hold" },
]

export const PROJECT_STATUS_FILTER_ALL = "ALL"

export const PROJECT_STATUS_STYLES = {
  [PROJECT_STATUSES.PLANNED]:
    "border-slate-200/80 bg-slate-100/80 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200",
  [PROJECT_STATUSES.ACTIVE]:
    "border-emerald-200/80 bg-emerald-50/80 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200",
  [PROJECT_STATUSES.COMPLETED]:
    "border-blue-200/80 bg-blue-50/80 text-blue-800 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-200",
  [PROJECT_STATUSES.ON_HOLD]:
    "border-amber-200/80 bg-amber-50/80 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-200",
}

export function getProjectStatusLabel(status) {
  return PROJECT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

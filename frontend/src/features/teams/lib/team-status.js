export const TEAM_STATUSES = Object.freeze({
  PLANNED: "PLANNED",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
})

export const TEAM_STATUS_OPTIONS = [
  { value: TEAM_STATUSES.PLANNED, label: "Planned" },
  { value: TEAM_STATUSES.ACTIVE, label: "Active" },
  { value: TEAM_STATUSES.COMPLETED, label: "Completed" },
  { value: TEAM_STATUSES.ON_HOLD, label: "On hold" },
]

export const TEAM_STATUS_FILTER_ALL = "ALL"

export const TEAM_STATUS_STYLES = {
  [TEAM_STATUSES.PLANNED]:
    "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
  [TEAM_STATUSES.ACTIVE]:
    "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  [TEAM_STATUSES.COMPLETED]:
    "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200",
  [TEAM_STATUSES.ON_HOLD]:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
}

export function getTeamStatusLabel(status) {
  return TEAM_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

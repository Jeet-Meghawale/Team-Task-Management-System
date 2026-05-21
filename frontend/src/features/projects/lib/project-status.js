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
    "rounded-full border-slate-500/30 bg-slate-500/15 text-slate-300",
  [PROJECT_STATUSES.ACTIVE]:
    "rounded-full border-brand-secondary/30 bg-brand-secondary/15 text-cyan-300",
  [PROJECT_STATUSES.COMPLETED]:
    "rounded-full border-brand-success/30 bg-brand-success/15 text-emerald-300",
  [PROJECT_STATUSES.ON_HOLD]:
    "rounded-full border-brand-accent/30 bg-brand-accent/15 text-amber-300",
}

export function getProjectStatusLabel(status) {
  return PROJECT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status
}

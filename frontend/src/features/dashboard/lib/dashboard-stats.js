const STATUS_ORDER = ["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]
const PRIORITY_ORDER = ["LOW", "MEDIUM", "HIGH"]

const STATUS_LABELS = {
  TODO: "To do",
  IN_PROGRESS: "In progress",
  REVIEW: "In review",
  COMPLETED: "Completed",
}

const PRIORITY_LABELS = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
}

const STATUS_COLORS = {
  TODO: "bg-slate-500",
  IN_PROGRESS: "bg-blue-500",
  REVIEW: "bg-amber-500",
  COMPLETED: "bg-emerald-500",
}

const PRIORITY_COLORS = {
  LOW: "bg-sky-500",
  MEDIUM: "bg-violet-500",
  HIGH: "bg-rose-500",
}

function mapGroupCounts(items, order, labelMap, colorMap, keyField, countField) {
  const lookup = new Map(
    (items ?? []).map((item) => [
      item[keyField],
      item._count?.[countField] ?? 0,
    ]),
  )

  return order.map((key) => ({
    key,
    label: labelMap[key] ?? key,
    count: lookup.get(key) ?? 0,
    color: colorMap[key] ?? "bg-muted-foreground",
  }))
}

export function normalizeDashboardStats(raw) {
  if (!raw || typeof raw !== "object") {
    return null
  }

  const totalProjects = Number(raw.totalProjects) || 0
  const totalTasks = Number(raw.totalTasks) || 0
  const completedTasks = Number(raw.completedTasks) || 0
  const pendingTasks = Number(raw.pendingTasks) || 0
  const overdueTasks = Number(raw.overdueTasks) || 0

  const taskStatusStats = mapGroupCounts(
    raw.taskStatusStats,
    STATUS_ORDER,
    STATUS_LABELS,
    STATUS_COLORS,
    "status",
    "status",
  )

  const taskPriorityStats = mapGroupCounts(
    raw.taskPriorityStats,
    PRIORITY_ORDER,
    PRIORITY_LABELS,
    PRIORITY_COLORS,
    "priority",
    "priority",
  )

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return {
    totalProjects,
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
    taskStatusStats,
    taskPriorityStats,
    completionRate,
  }
}

export function isDashboardEmpty(stats) {
  if (!stats) return true
  return stats.totalProjects === 0 && stats.totalTasks === 0
}

export function hasTaskBreakdown(stats) {
  return stats?.totalTasks > 0
}

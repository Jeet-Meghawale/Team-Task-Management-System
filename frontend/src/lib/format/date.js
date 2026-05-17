export function toDateInputValue(value) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

export function formatDisplayDate(value) {
  if (!value) return "—"
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

export function formatRelativeDate(value) {
  if (!value) return ""
  const date = new Date(value)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays === -1) return "Yesterday"
  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`
  return `In ${diffDays}d`
}

export function isTaskOverdue(task) {
  if (!task?.dueDate || task.status === "COMPLETED") return false
  return new Date(task.dueDate) < new Date()
}

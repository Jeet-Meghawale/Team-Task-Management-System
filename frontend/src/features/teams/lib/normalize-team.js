export function mapProjectToTeam(project) {
  if (!project) return null

  const members =
    project.members?.map((entry) => ({
      id: entry.user?.id ?? entry.userId,
      name: entry.user?.name,
      email: entry.user?.email,
      role: entry.user?.role,
      assignedAt: entry.assignedAt,
    })) ?? []

  return {
    id: project.id,
    name: project.name,
    description: project.description ?? "",
    startDate: project.startDate,
    endDate: project.endDate,
    status: project.status,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    creator: project.creator,
    memberCount: project._count?.members ?? members.length,
    taskCount: project._count?.tasks ?? project.tasks?.length ?? 0,
    members,
    tasks: project.tasks ?? [],
  }
}

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

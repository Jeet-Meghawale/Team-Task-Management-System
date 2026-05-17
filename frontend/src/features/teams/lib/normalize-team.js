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

export { formatDisplayDate, toDateInputValue } from "@/lib/format/date"

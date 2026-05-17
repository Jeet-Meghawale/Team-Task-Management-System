import { isTaskOverdue } from "@/lib/format/date"

export function mapTask(task) {
  if (!task) return null

  const mapped = {
    id: task.id,
    title: task.title,
    description: task.description ?? "",
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    projectId: task.projectId,
    project: task.project,
    projectName: task.project?.name ?? "",
    assignedToId: task.assignedToId,
    assignedTo: task.assignedTo,
    createdById: task.createdById,
    createdBy: task.createdBy,
    comments: task.comments ?? [],
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  }

  return {
    ...mapped,
    isOverdue: isTaskOverdue(mapped),
  }
}

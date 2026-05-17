import { USER_ROLES } from "@/lib/auth/roles"

export function canManageTasks(role) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.MANAGER
}

export function canDeleteTask(role) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.MANAGER
}

export function canUpdateTaskStatus(task, user) {
  if (!user) return false
  if (canManageTasks(user.role)) return true
  return user.role === USER_ROLES.DEVELOPER && task.assignedToId === user.id
}

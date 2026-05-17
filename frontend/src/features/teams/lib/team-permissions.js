import { USER_ROLES } from "@/lib/auth/roles"

export function canManageTeams(role) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.MANAGER
}

export function canDeleteTeam(role) {
  return role === USER_ROLES.ADMIN
}

export function canAssignMembers(role) {
  return role === USER_ROLES.ADMIN || role === USER_ROLES.MANAGER
}

export function canBrowseUsersForAssignment(role) {
  return role === USER_ROLES.ADMIN
}

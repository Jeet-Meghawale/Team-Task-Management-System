import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"
import { mapProjectToTeam } from "@/features/teams/lib/normalize-team"

export async function fetchTeams(params) {
  const { data } = await api.get(ENDPOINTS.PROJECTS, { params })
  const payload = unwrapApiPayload(data)
  const items = Array.isArray(payload) ? payload : []
  return items.map(mapProjectToTeam)
}

export async function fetchTeamById(id) {
  const { data } = await api.get(`${ENDPOINTS.PROJECTS}/${id}`)
  return mapProjectToTeam(unwrapApiPayload(data))
}

export async function createTeam(body) {
  const { data } = await api.post(ENDPOINTS.PROJECTS, body)
  return mapProjectToTeam(unwrapApiPayload(data))
}

export async function updateTeam(id, body) {
  const { data } = await api.patch(`${ENDPOINTS.PROJECTS}/${id}`, body)
  return mapProjectToTeam(unwrapApiPayload(data))
}

export async function deleteTeam(id) {
  await api.delete(`${ENDPOINTS.PROJECTS}/${id}`)
}

export async function assignTeamMembers(teamId, userIds) {
  await api.post(`${ENDPOINTS.PROJECTS}/${teamId}/members`, { userIds })
}

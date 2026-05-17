import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"
import { normalizeProject } from "@/features/projects/lib/normalize-project"

export async function fetchProjects(params) {
  const { data } = await api.get(ENDPOINTS.PROJECTS, { params })
  const payload = unwrapApiPayload(data)
  const items = Array.isArray(payload) ? payload : []
  return items.map(normalizeProject)
}

export async function fetchProjectById(id) {
  const { data } = await api.get(`${ENDPOINTS.PROJECTS}/${id}`)
  return normalizeProject(unwrapApiPayload(data))
}

export async function createProject(body) {
  const { data } = await api.post(ENDPOINTS.PROJECTS, body)
  return normalizeProject(unwrapApiPayload(data))
}

export async function updateProject(id, body) {
  const { data } = await api.patch(`${ENDPOINTS.PROJECTS}/${id}`, body)
  return normalizeProject(unwrapApiPayload(data))
}

export async function deleteProject(id) {
  await api.delete(`${ENDPOINTS.PROJECTS}/${id}`)
}

export async function assignProjectMembers(projectId, userIds) {
  await api.post(`${ENDPOINTS.PROJECTS}/${projectId}/members`, { userIds })
}

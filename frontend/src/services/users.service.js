import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"

export async function fetchUsers(params) {
  const { data } = await api.get(ENDPOINTS.USERS, { params })
  const payload = unwrapApiPayload(data)
  return Array.isArray(payload) ? payload : []
}

export async function fetchUserById(id) {
  const { data } = await api.get(`${ENDPOINTS.USERS}/${id}`)
  return unwrapApiPayload(data)
}

export async function createUser(body) {
  const { data } = await api.post(ENDPOINTS.USERS, body)
  return unwrapApiPayload(data)
}

export async function updateUserRole(id, role) {
  const { data } = await api.patch(`${ENDPOINTS.USERS}/${id}/role`, { role })
  return unwrapApiPayload(data)
}

export async function updateUserStatus(id, isActive) {
  const { data } = await api.patch(`${ENDPOINTS.USERS}/${id}/status`, {
    isActive,
  })
  return unwrapApiPayload(data)
}

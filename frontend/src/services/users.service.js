import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"

export async function fetchUsers(params) {
  const { data } = await api.get(ENDPOINTS.USERS, { params })
  const payload = unwrapApiPayload(data)
  return Array.isArray(payload) ? payload : []
}

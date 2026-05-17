import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"

export async function fetchDashboardStats() {
  const { data } = await api.get(`${ENDPOINTS.DASHBOARD}/stats`)
  return unwrapApiPayload(data)
}

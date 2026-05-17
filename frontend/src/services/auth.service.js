import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"

export async function loginRequest(body) {
  const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, body)
  return unwrapApiPayload(data)
}

export async function registerRequest(body) {
  const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, body)
  return unwrapApiPayload(data)
}

export async function fetchCurrentUser() {
  const { data } = await api.get(ENDPOINTS.AUTH.ME)
  return unwrapApiPayload(data)
}

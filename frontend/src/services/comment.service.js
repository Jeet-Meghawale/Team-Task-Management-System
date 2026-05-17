import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"
import { mapComment } from "@/features/comments/lib/normalize-comment"

export async function fetchTaskComments(taskId) {
  const { data } = await api.get(`${ENDPOINTS.COMMENTS}/${taskId}`)
  const payload = unwrapApiPayload(data)
  const items = Array.isArray(payload) ? payload : []
  return items.map(mapComment)
}

export async function createTaskComment(taskId, commentText) {
  const { data } = await api.post(`${ENDPOINTS.COMMENTS}/${taskId}`, {
    commentText,
  })
  return mapComment(unwrapApiPayload(data))
}

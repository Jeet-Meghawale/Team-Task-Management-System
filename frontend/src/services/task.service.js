import { api } from "@/lib/api/client"
import { ENDPOINTS } from "@/lib/api/endpoints"
import { unwrapApiPayload } from "@/lib/api/normalize-response"
import { mapTask } from "@/features/tasks/lib/normalize-task"

export async function fetchTasks(params) {
  const { data } = await api.get(ENDPOINTS.TASKS, { params })
  const payload = unwrapApiPayload(data)
  const items = Array.isArray(payload) ? payload : []
  return items.map(mapTask)
}

export async function fetchTaskById(id) {
  const { data } = await api.get(`${ENDPOINTS.TASKS}/${id}`)
  return mapTask(unwrapApiPayload(data))
}

export async function fetchAssignedTasks() {
  const { data } = await api.get(`${ENDPOINTS.TASKS}/assigned/me`)
  const payload = unwrapApiPayload(data)
  const items = Array.isArray(payload) ? payload : []
  return items.map(mapTask)
}

export async function createTask(body) {
  const { data } = await api.post(ENDPOINTS.TASKS, body)
  return mapTask(unwrapApiPayload(data))
}

export async function updateTask(id, body) {
  const { data } = await api.patch(`${ENDPOINTS.TASKS}/${id}`, body)
  return mapTask(unwrapApiPayload(data))
}

export async function updateTaskStatus(id, status) {
  const { data } = await api.patch(`${ENDPOINTS.TASKS}/${id}/status`, { status })
  return mapTask(unwrapApiPayload(data))
}

export async function deleteTask(id) {
  await api.delete(`${ENDPOINTS.TASKS}/${id}`)
}

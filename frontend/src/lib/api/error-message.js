import axios from "axios"

/**
 * User-facing message from API or network errors.
 */
export function getApiErrorMessage(error, fallback = "Something went wrong.") {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message
    if (typeof msg === "string") return msg
    if (Array.isArray(msg)) return msg.join(", ")
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}

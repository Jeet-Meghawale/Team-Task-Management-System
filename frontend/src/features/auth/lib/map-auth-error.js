import axios from "axios"
import { getApiErrorMessage } from "@/lib/api/error-message"

/**
 * Maps API errors to react-hook-form field errors when possible.
 * Backend Zod validation returns a single comma-joined `message` string.
 */
export function applyAuthApiError(form, error, fieldMatchers = []) {
  const message = getApiErrorMessage(error)

  if (axios.isAxiosError(error)) {
    const status = error.response?.status

    if (status === 401) {
      form.setError("root", { message })
      return
    }

    if (status === 400) {
      for (const { pattern, field } of fieldMatchers) {
        if (pattern.test(message)) {
          form.setError(field, { message })
          return
        }
      }
    }
  }

  form.setError("root", { message })
}

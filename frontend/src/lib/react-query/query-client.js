import { QueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getApiErrorMessage } from "@/lib/api/error-message"

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry(failureCount, error) {
          if (failureCount >= 2) return false
          const status = error?.response?.status
          if (status === 401 || status === 403 || status === 404) return false
          return true
        },
      },
      mutations: {
        onError(error) {
          toast.error(getApiErrorMessage(error))
        },
      },
    },
  })
}

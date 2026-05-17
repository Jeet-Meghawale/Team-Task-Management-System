import axios from "axios"
import { env } from "@/config/env"
import { tokenStorage } from "@/lib/auth/token-storage"
import { ROUTES } from "@/lib/constants/routes"

let navigateRef = null

export function attachRouterNavigate(navigate) {
  navigateRef = navigate
}

export const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      tokenStorage.clear()
      const path = window.location.pathname
      const isPublicAuthRoute =
        path === ROUTES.LOGIN || path === ROUTES.HOME
      if (!isPublicAuthRoute) {
        navigateRef?.(ROUTES.LOGIN, {
          replace: true,
          state: { from: { pathname: path } },
        })
      }
    }
    return Promise.reject(error)
  },
)

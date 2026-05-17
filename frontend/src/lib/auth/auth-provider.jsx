import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useQueryClient } from "@tanstack/react-query"
import { AuthContext } from "@/lib/auth/auth-context"
import { queryKeys } from "@/lib/react-query/query-keys"
import { tokenStorage } from "@/lib/auth/token-storage"
import { fetchCurrentUser } from "@/services/auth.service"
import { normalizeAuthSession } from "@/features/auth/lib/normalize-session"

export function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(() =>
    tokenStorage.get() ? "loading" : "ready",
  )

  useEffect(() => {
    const token = tokenStorage.get()
    if (!token) return undefined

    let cancelled = false

    fetchCurrentUser()
      .then((me) => {
        if (!cancelled) setUser(me)
      })
      .catch(() => {
        if (!cancelled) {
          tokenStorage.clear()
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setStatus("ready")
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(
    async (payload) => {
      const session = normalizeAuthSession(payload)
      tokenStorage.set(session.token)
      setUser(session.user)
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
    [queryClient],
  )

  const logout = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
    queryClient.clear()
  }, [queryClient])

  const refreshUser = useCallback(async () => {
    const token = tokenStorage.get()
    if (!token) {
      setUser(null)
      return
    }
    try {
      const me = await fetchCurrentUser()
      setUser(me)
    } catch {
      tokenStorage.clear()
      setUser(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitialLoading: status === "loading",
      login,
      logout,
      refreshUser,
    }),
    [user, status, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

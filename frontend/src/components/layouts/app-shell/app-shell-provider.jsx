import { useCallback, useMemo, useState } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppShellContext } from "@/components/layouts/app-shell/app-shell-context"

const STORAGE_KEY = "ttms_sidebar_collapsed"

export function AppShellProvider({ children }) {
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true",
  )
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      collapsed,
      toggleCollapsed,
      mobileOpen,
      setMobileOpen,
    }),
    [collapsed, toggleCollapsed, mobileOpen],
  )

  return (
    <AppShellContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </AppShellContext.Provider>
  )
}

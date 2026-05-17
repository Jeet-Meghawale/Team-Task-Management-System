import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import {
  APP_NAV_ITEMS,
  isNavItemActive,
} from "@/lib/navigation/app-nav-config"

export function usePageTitle() {
  const { pathname } = useLocation()

  return useMemo(() => {
    const match = APP_NAV_ITEMS.find((item) =>
      isNavItemActive(pathname, item.href),
    )
    return match?.label ?? "Taskboard"
  }, [pathname])
}

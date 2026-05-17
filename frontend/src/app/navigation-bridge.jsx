import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { attachRouterNavigate } from "@/lib/api/client"

export function NavigationBridge() {
  const navigate = useNavigate()

  useEffect(() => {
    attachRouterNavigate((path, options) => navigate(path, options))
    return () => attachRouterNavigate(null)
  }, [navigate])

  return null
}

import { useContext } from "react"
import { AppShellContext } from "@/components/layouts/app-shell/app-shell-context"

export function useAppShell() {
  const ctx = useContext(AppShellContext)
  if (!ctx) {
    throw new Error("useAppShell must be used within AppShellProvider")
  }
  return ctx
}

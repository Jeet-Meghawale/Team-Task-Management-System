import { Outlet } from "react-router-dom"
import { NavigationBridge } from "@/app/navigation-bridge"

export function RootLayout() {
  return (
    <>
      <NavigationBridge />
      <Outlet />
    </>
  )
}

import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "@/lib/auth/auth-provider"
import { Toaster } from "@/components/ui/sonner"
import { createQueryClient } from "@/lib/react-query/query-client"
import { router } from "@/app/router"

const queryClient = createQueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </AuthProvider>
    </QueryClientProvider>
  )
}

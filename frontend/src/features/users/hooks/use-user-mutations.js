import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateUserRole, updateUserStatus } from "@/services/users.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { getApiErrorMessage } from "@/lib/api/error-message"

export function useUserMutations() {
  const queryClient = useQueryClient()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.users.all })
  }

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      toast.success("User role updated")
      invalidate()
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update role"))
    },
  })

  const statusMutation = useMutation({
    mutationFn: ({ id, isActive }) => updateUserStatus(id, isActive),
    onSuccess: () => {
      toast.success("User status updated")
      invalidate()
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to update status"))
    },
  })

  return { roleMutation, statusMutation }
}

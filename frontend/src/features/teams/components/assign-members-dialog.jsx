import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { assignMembersSchema } from "@/features/teams/schemas/team-form.schema"
import { useUsersForAssignment } from "@/features/teams/hooks/use-users-for-assignment"
import { useDebouncedValue } from "@/features/teams/hooks/use-debounced-value"
import { Skeleton } from "@/components/ui/skeleton"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { cn } from "@/lib/utils"

export function AssignMembersDialog({
  open,
  onOpenChange,
  team,
  userRole,
  onSubmit,
  isSubmitting,
}) {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebouncedValue(search)
  const usersQuery = useUsersForAssignment(userRole, debouncedSearch)

  const existingMemberIds = useMemo(
    () => new Set(team?.members?.map((m) => m.id) ?? []),
    [team?.members],
  )

  const availableUsers = useMemo(
    () =>
      (usersQuery.data ?? []).filter((user) => !existingMemberIds.has(user.id)),
    [usersQuery.data, existingMemberIds],
  )

  const form = useForm({
    resolver: zodResolver(assignMembersSchema),
    defaultValues: { userIds: [] },
  })

  const selectedIds = form.watch("userIds")

  function toggleUser(userId) {
    const current = form.getValues("userIds")
    if (current.includes(userId)) {
      form.setValue(
        "userIds",
        current.filter((id) => id !== userId),
        { shouldValidate: true },
      )
      return
    }
    form.setValue("userIds", [...current, userId], { shouldValidate: true })
  }

  async function handleSubmit(values) {
    form.clearErrors("root")
    try {
      await onSubmit(values.userIds)
      form.reset({ userIds: [] })
      setSearch("")
      onOpenChange(false)
    } catch (error) {
      form.setError("root", { message: getApiErrorMessage(error) })
    }
  }

  const rootError = form.formState.errors.root?.message

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          form.reset({ userIds: [] })
          setSearch("")
        }
        onOpenChange(next)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add members</DialogTitle>
          <DialogDescription>
            Add users to <span className="font-medium">{team?.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-8"
              disabled={usersQuery.isLoading}
            />
          </div>

          <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg border border-border p-2">
            {usersQuery.isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))
            ) : availableUsers.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                No users available to add.
              </p>
            ) : (
              availableUsers.map((user) => {
                const checked = selectedIds.includes(user.id)
                return (
                  <label
                    key={user.id}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors",
                      checked ? "bg-muted" : "hover:bg-muted/60",
                    )}
                  >
                    <input
                      type="checkbox"
                      className="size-4 rounded border-input"
                      checked={checked}
                      onChange={() => toggleUser(user.id)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {user.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {user.email} · {user.role}
                      </span>
                    </span>
                  </label>
                )
              })
            )}
          </div>

          {form.formState.errors.userIds ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.userIds.message}
            </p>
          ) : null}
          {rootError ? (
            <p className="text-sm text-destructive" role="alert">
              {rootError}
            </p>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Adding...
                </>
              ) : (
                "Add members"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

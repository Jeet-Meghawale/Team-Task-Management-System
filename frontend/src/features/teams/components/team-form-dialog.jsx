import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { teamFormSchema } from "@/features/teams/schemas/team-form.schema"
import { TEAM_STATUS_OPTIONS, TEAM_STATUSES } from "@/features/teams/lib/team-status"
import { toDateInputValue } from "@/features/teams/lib/normalize-team"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { cn } from "@/lib/utils"

const selectClassName = cn(
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none",
)

export function TeamFormDialog({
  open,
  onOpenChange,
  mode = "create",
  team,
  onSubmit,
  isSubmitting,
}) {
  const isEdit = mode === "edit"

  const form = useForm({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: TEAM_STATUSES.PLANNED,
    },
  })

  useEffect(() => {
    if (!open) return

    if (isEdit && team) {
      form.reset({
        name: team.name,
        description: team.description ?? "",
        startDate: toDateInputValue(team.startDate),
        endDate: toDateInputValue(team.endDate),
        status: team.status,
      })
      return
    }

    form.reset({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: TEAM_STATUSES.PLANNED,
    })
  }, [open, isEdit, team, form])

  async function handleSubmit(values) {
    form.clearErrors("root")
    const body = {
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      startDate: values.startDate,
      endDate: values.endDate || undefined,
      status: values.status,
    }

    try {
      await onSubmit(body)
      onOpenChange(false)
    } catch (error) {
      form.setError("root", {
        message: getApiErrorMessage(error),
      })
    }
  }

  const rootError = form.formState.errors.root?.message

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit team" : "Create team"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update team details and workflow status."
              : "Set up a new team workspace for members and tasks."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team name</FormLabel>
                  <FormControl>
                    <Input placeholder="Platform squad" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      rows={3}
                      disabled={isSubmitting}
                      placeholder="What does this team own?"
                      className={cn(
                        "flex min-h-20 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm",
                        "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none",
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End date (optional)</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      className={selectClassName}
                      disabled={isSubmitting}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    >
                      {TEAM_STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    Saving...
                  </>
                ) : isEdit ? (
                  "Save changes"
                ) : (
                  "Create team"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

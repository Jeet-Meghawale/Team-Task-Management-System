import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
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
import { taskFormSchema } from "@/features/tasks/schemas/task-form.schema"
import {
  TASK_PRIORITIES,
  TASK_PRIORITY_LABELS,
} from "@/lib/constants/task-priority"
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
} from "@/lib/constants/task-status"
import { toDateInputValue } from "@/lib/format/date"
import { nativeSelectClassName } from "@/lib/ui/select-class"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { fetchProjectById, fetchProjects } from "@/services/project.service"
import { fetchUsers } from "@/services/users.service"
import { USER_ROLES } from "@/lib/auth/roles"
import { useAuth } from "@/lib/auth/use-auth"

export function TaskFormDialog({
  open,
  onOpenChange,
  mode = "create",
  task,
  onSubmit,
  isSubmitting,
  defaultProjectId,
}) {
  const { user } = useAuth()
  const isEdit = mode === "edit"
  const isAdmin = user?.role === USER_ROLES.ADMIN

  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: TASK_PRIORITIES.MEDIUM,
      status: TASK_STATUSES.TODO,
      dueDate: "",
      projectId: defaultProjectId ?? "",
      assignedToId: user?.id ?? "",
    },
  })

  const projectId = form.watch("projectId")

  const projectsQuery = useQuery({
    queryKey: ["task-form", "projects"],
    queryFn: () => fetchProjects({ page: 1, limit: 100 }),
    enabled: open,
  })

  const usersQuery = useQuery({
    queryKey: ["task-form", "users"],
    queryFn: () => fetchUsers({ page: 1, limit: 100 }),
    enabled: open && isAdmin,
  })

  const projectMembersQuery = useQuery({
    queryKey: ["task-form", "project-members", projectId],
    queryFn: () => fetchProjectById(projectId),
    enabled: open && Boolean(projectId) && !isAdmin,
  })

  const assigneeOptions = useMemo(() => {
    if (isAdmin) {
      return (usersQuery.data ?? []).map((u) => ({
        id: u.id,
        label: u.name,
      }))
    }
    const members = projectMembersQuery.data?.members ?? []
    return members.map((m) => ({ id: m.id, label: m.name }))
  }, [isAdmin, usersQuery.data, projectMembersQuery.data])

  useEffect(() => {
    if (!open) return

    if (isEdit && task) {
      form.reset({
        title: task.title,
        description: task.description ?? "",
        priority: task.priority,
        status: task.status,
        dueDate: toDateInputValue(task.dueDate),
        projectId: task.projectId,
        assignedToId: task.assignedToId,
      })
      return
    }

    form.reset({
      title: "",
      description: "",
      priority: TASK_PRIORITIES.MEDIUM,
      status: TASK_STATUSES.TODO,
      dueDate: "",
      projectId: defaultProjectId ?? "",
      assignedToId: user?.id ?? "",
    })
  }, [open, isEdit, task, form, defaultProjectId, user?.id])

  async function handleSubmit(values) {
    form.clearErrors("root")
    const body = {
      title: values.title.trim(),
      description: values.description?.trim() || undefined,
      priority: values.priority,
      status: values.status,
      projectId: values.projectId,
      assignedToId: values.assignedToId,
      dueDate: values.dueDate || undefined,
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit task" : "Create task"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update task details, assignment, and schedule."
              : "Add a new task to a project and assign it to a team member."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
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
                      {...field}
                      rows={3}
                      disabled={isSubmitting}
                      className="flex min-h-[80px] w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isSubmitting || isEdit}
                      className={nativeSelectClassName}
                    >
                      <option value="">Select project</option>
                      {(projectsQuery.data ?? []).map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignedToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={isSubmitting || !projectId}
                      className={nativeSelectClassName}
                    >
                      <option value="">Select assignee</option>
                      {assigneeOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <select {...field} className={nativeSelectClassName} disabled={isSubmitting}>
                        {Object.values(TASK_STATUSES).map((value) => (
                          <option key={value} value={value}>
                            {TASK_STATUS_LABELS[value]}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <select {...field} className={nativeSelectClassName} disabled={isSubmitting}>
                        {Object.values(TASK_PRIORITIES).map((value) => (
                          <option key={value} value={value}>
                            {TASK_PRIORITY_LABELS[value]}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {rootError ? (
              <p className="text-sm text-destructive">{rootError}</p>
            ) : null}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
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
                  "Create task"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

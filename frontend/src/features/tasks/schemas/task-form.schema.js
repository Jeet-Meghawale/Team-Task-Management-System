import { z } from "zod"
import { TASK_PRIORITIES } from "@/lib/constants/task-priority"
import { TASK_STATUSES } from "@/lib/constants/task-status"

export const taskFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum([
    TASK_PRIORITIES.LOW,
    TASK_PRIORITIES.MEDIUM,
    TASK_PRIORITIES.HIGH,
  ]),
  status: z.enum([
    TASK_STATUSES.TODO,
    TASK_STATUSES.IN_PROGRESS,
    TASK_STATUSES.REVIEW,
    TASK_STATUSES.COMPLETED,
  ]),
  dueDate: z.string().optional(),
  projectId: z.string().uuid("Select a project"),
  assignedToId: z.string().uuid("Select an assignee"),
})

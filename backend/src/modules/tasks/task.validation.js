import { z } from "zod"

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Task title is required"),

  description: z.string().optional(),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH"
  ]).optional(),

  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "REVIEW",
    "COMPLETED"
  ]).optional(),

  dueDate: z.string().optional(),

  projectId: z.string().uuid(),

  assignedToId: z.string().uuid().optional()
})
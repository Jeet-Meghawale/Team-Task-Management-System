import { z } from "zod"

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project name is required"),

    description: z.string().optional(),

    startDate: z.string().date(),

    endDate: z.string().date().optional(),

    status: z.enum([
        "PLANNED",
        "ACTIVE",
        "COMPLETED",
        "ON_HOLD"
    ]).optional()
})

export const assignMembersSchema = z.object({
  userIds: z.array(z.string().uuid())
})
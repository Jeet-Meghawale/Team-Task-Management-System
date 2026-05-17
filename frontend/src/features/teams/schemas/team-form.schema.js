import { z } from "zod"
import { TEAM_STATUSES } from "@/features/teams/lib/team-status"

const statusValues = Object.values(TEAM_STATUSES)

export const teamFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    status: z.enum(statusValues).optional(),
  })
  .refine(
    (data) => {
      if (!data.endDate) return true
      return data.endDate >= data.startDate
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    },
  )

export const assignMembersSchema = z.object({
  userIds: z.array(z.string().uuid()).min(1, "Select at least one member"),
})

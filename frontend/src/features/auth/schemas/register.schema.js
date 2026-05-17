import { z } from "zod"
import { USER_ROLES } from "@/lib/auth/roles"

/** Mirrors `registerSchema` in backend auth.validation.js */
export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z
    .enum([USER_ROLES.ADMIN, USER_ROLES.MANAGER, USER_ROLES.DEVELOPER])
    .optional(),
})

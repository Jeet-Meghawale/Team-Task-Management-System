import { Router } from "express"
import authMiddleware from "../../middlewares/auth.middleware.js"
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "./auth.controller.js"

import authorizeRoles from "../../middlewares/role.middleware.js"
import { UserRole } from "@prisma/client"

import validate from "../../middlewares/validate.middleware.js"
import {
  registerSchema,
  loginSchema
} from "./auth.validation.js"


const router = Router()

router.post("/register", validate(registerSchema), authMiddleware, authorizeRoles(UserRole.ADMIN), registerUser)
router.post("/login", validate(loginSchema), loginUser)
router.get("/me", authMiddleware, getCurrentUser)
export default router
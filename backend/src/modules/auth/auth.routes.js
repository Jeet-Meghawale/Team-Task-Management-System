import { Router } from "express"
import authMiddleware from "../../middlewares/auth.middleware.js"
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "./auth.controller.js"

import authorizeRoles from "../../middlewares/role.middleware.js"
import { UserRole } from "@prisma/client"
const router = Router()

router.post("/register",authMiddleware,authorizeRoles(UserRole.ADMIN), registerUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, getCurrentUser)
export default router
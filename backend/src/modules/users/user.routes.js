import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"
import authorizeRoles from "../../middlewares/role.middleware.js"

import {
  getUsers
} from "./user.controller.js"

const router = Router()

router.get(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getUsers
)

export default router
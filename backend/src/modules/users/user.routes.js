import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"
import authorizeRoles from "../../middlewares/role.middleware.js"

import {
  getUsers,
  getSingleUser,
  createUser,
  updateUserRole,
  updateUserStatus
} from "./user.controller.js"

const router = Router()

router.get(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getUsers
)

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  getSingleUser
)

router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN"),
  createUser
)

router.patch(
  "/:id/role",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUserRole
)

router.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles("ADMIN"),
  updateUserStatus
)

export default router
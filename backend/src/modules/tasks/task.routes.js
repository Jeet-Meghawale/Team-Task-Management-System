import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"
import authorizeRoles from "../../middlewares/role.middleware.js"
import validate from "../../middlewares/validate.middleware.js"

import {
    createTaskSchema,
    updateTaskSchema,
    updateTaskStatusSchema
} from "./task.validation.js"

import {
    createTask,
    deleteTask,
    getAssignedTasks,
    getSingleTask,
    getTasks,
    updateTask,
    updateTaskStatus
} from "./task.controller.js"

const router = Router()

router.post(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN", "MANAGER"),
    validate(createTaskSchema),
    createTask
)

router.get(
    "/",
    authMiddleware,
    getTasks
)

router.get(
  "/assigned/me",
  authMiddleware,
  authorizeRoles("DEVELOPER"),
  getAssignedTasks
)

router.get(
  "/:id",
  authMiddleware,
  getSingleTask
)

router.patch(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "MANAGER"),
  validate(updateTaskSchema),
  updateTask
)

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateTaskStatusSchema),
  updateTaskStatus
)

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN", "MANAGER"),
  deleteTask
)



export default router
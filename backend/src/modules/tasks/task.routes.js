import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"
import authorizeRoles from "../../middlewares/role.middleware.js"
import validate from "../../middlewares/validate.middleware.js"

import {
    createTaskSchema
} from "./task.validation.js"

import {
    createTask,
    getTasks
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

export default router
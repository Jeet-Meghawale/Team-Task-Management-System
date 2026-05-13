import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"
import authorizeRoles from "../../middlewares/role.middleware.js"
import validate from "../../middlewares/validate.middleware.js"

import {
    createProjectSchema
} from "./project.validation.js"

import {
    createProject,
    getProjects
} from "./project.controller.js"

const router = Router()

router.post(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN", "MANAGER"),
    validate(createProjectSchema),
    createProject
)

router.get(
    "/",
    authMiddleware,
    getProjects
)

export default router
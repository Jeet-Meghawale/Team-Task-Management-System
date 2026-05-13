import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"
import authorizeRoles from "../../middlewares/role.middleware.js"
import validate from "../../middlewares/validate.middleware.js"

import {
    assignMembersSchema,
    createProjectSchema
} from "./project.validation.js"

import {
    assignMembers,
    createProject,
    deleteProject,
    getProjects,
    getSingleProject,
    updateProject
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

router.get(
    "/:id",
    authMiddleware,
    getSingleProject
)

router.patch(
    "/:id",
    authMiddleware,
    authorizeRoles("ADMIN", "MANAGER"),
    updateProject
)


router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("ADMIN"),
    deleteProject
)

router.post(
    "/:id/members",
    authMiddleware,
    authorizeRoles("ADMIN", "MANAGER"),
    validate(assignMembersSchema),
    assignMembers
)

export default router
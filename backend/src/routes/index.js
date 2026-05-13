import express from "express"

import authRoutes from "../modules/auth/auth.routes.js"
import userRoutes from "../modules/users/user.routes.js"
import projectRoutes from "../modules/projects/project.routes.js"


const router = express.Router()
router.use("/auth", authRoutes)
router.use("/users", userRoutes)
router.use("/projects", projectRoutes)
export default router
import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"

import {
  getDashboardStats
} from "./dashboard.controller.js"

const router = Router()

router.get(
  "/stats",
  authMiddleware,
  getDashboardStats
)

export default router
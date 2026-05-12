import { Router } from "express"
import authMiddleware from "../../middlewares/auth.middleware.js"
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "./auth.controller.js"

const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/me", authMiddleware, getCurrentUser)
export default router
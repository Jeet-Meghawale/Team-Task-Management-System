import { Router } from "express"

import authMiddleware from "../../middlewares/auth.middleware.js"

import validate from "../../middlewares/validate.middleware.js"

import {
  createCommentSchema
} from "./comment.validation.js"

import {
  createComment,
  getTaskComments
} from "./comment.controller.js"

const router = Router()

router.post(
  "/:taskId",
  authMiddleware,
  validate(createCommentSchema),
  createComment
)

router.get(
  "/:taskId",
  authMiddleware,
  getTaskComments
)

export default router
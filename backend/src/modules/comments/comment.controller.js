import ApiResponse from "../../utils/apiResponse.js"
import asyncHandler from "../../utils/asyncHandler.js"
import {
  createCommentService,
  getTaskCommentsService
} from "./comment.services.js"


export const createComment = asyncHandler(async (
  req,
  res
) => {
  const comment =
    await createCommentService(
      req.params.taskId,
      req.body.commentText,
      req.user.id
    )

  return res.status(201).json(
    new ApiResponse(
      true,
      "Comment added successfully",
      comment
    )
  )
})

export const getTaskComments = asyncHandler(async (
  req,
  res
) => {
  const comments =
    await getTaskCommentsService(
      req.params.taskId
    )

  return res.status(200).json(
    new ApiResponse(
      true,
      "Comments fetched successfully",
      comments
    )
  )
})

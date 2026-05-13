import ApiResponse from "../../utils/apiResponse.js"

import {
  createCommentService,
  getTaskCommentsService
} from "./comment.services.js"


export const createComment = async (
  req,
  res,
  next
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}

export const getTaskComments = async (
  req,
  res,
  next
) => {
  try {
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
  } catch (error) {
    next(error)
  }
}


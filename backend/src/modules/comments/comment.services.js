import ApiError from "../../utils/apiError.js"

import {
    createCommentRepository,
    getTaskCommentsRepository
} from "./comment.repository.js"

import {
    getSingleTaskRepository
} from "../tasks/task.repository.js"

export const createCommentService =
    async (
        taskId,
        commentText,
        userId
    ) => {
        const task =
            await getSingleTaskRepository(taskId)

        if (!task) {
            throw new ApiError(404, "Task not found")
        }

        return createCommentRepository({
            commentText,

            taskId,

            userId
        })
    }
export const getTaskCommentsService =
    async (taskId) => {
        const task =
            await getSingleTaskRepository(taskId)

        if (!task) {
            throw new ApiError(404, "Task not found")
        }

        return getTaskCommentsRepository(taskId)
    }
    
import ApiResponse from "../../utils/apiResponse.js"

import {
    createTaskService,
    getTasksService
} from "./task.service.js"

export const createTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await createTaskService(
            req.body,
            req.user.id
        )

        return res.status(201).json(
            new ApiResponse(
                true,
                "Task created successfully",
                task
            )
        )
    } catch (error) {
        next(error)
    }
}

export const getTasks = async (
    req,
    res,
    next
) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const search = req.query.search || ""

        const status = req.query.status

        const priority = req.query.priority

        const tasks = await getTasksService({
            page,
            limit,
            search,
            status,
            priority
        })

        return res.status(200).json(
            new ApiResponse(
                true,
                "Tasks fetched successfully",
                tasks
            )
        )
    } catch (error) {
        next(error)
    }
}
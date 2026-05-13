import ApiResponse from "../../utils/apiResponse.js"

import {
    createTaskService,
    deleteTaskService,
    getAssignedTasksService,
    getSingleTaskService,
    getTasksService,
    updateTaskService,
    updateTaskStatusService
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

export const getSingleTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await getSingleTaskService(
            req.params.id
        )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Task fetched successfully",
                task
            )
        )
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (
    req,
    res,
    next
) => {
    try {
        const task = await updateTaskService(
            req.params.id,
            req.body
        )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Task updated successfully",
                task
            )
        )
    } catch (error) {
        next(error)
    }
}

export const updateTaskStatus = async (
    req,
    res,
    next
) => {
    try {
        const task =
            await updateTaskStatusService(
                req.params.id,
                req.body.status,
                req.user
            )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Task status updated successfully",
                task
            )
        )
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (
    req,
    res,
    next
) => {
    try {
        await deleteTaskService(req.params.id)

        return res.status(200).json(
            new ApiResponse(
                true,
                "Task deleted successfully"
            )
        )
    } catch (error) {
        next(error)
    }
}
export const getAssignedTasks = async (
    req,
    res,
    next
) => {
    try {
        const tasks =
            await getAssignedTasksService(
                req.user.id
            )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Assigned tasks fetched successfully",
                tasks
            )
        )
    } catch (error) {
        next(error)
    }
}
import ApiResponse from "../../utils/apiResponse.js"
import asyncHandler from "../../utils/asyncHandler.js"
import {
    createTaskService,
    deleteTaskService,
    getAssignedTasksService,
    getSingleTaskService,
    getTasksService,
    updateTaskService,
    updateTaskStatusService
} from "./task.service.js"

export const createTask = asyncHandler(async (
    req,
    res
) => {
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
})

export const getTasks = asyncHandler(async (
    req,
    res
) => {
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
})

export const getSingleTask = asyncHandler(async (
    req,
    res
) => {
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
})

export const updateTask = asyncHandler(async (
    req,
    res
) => {
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
})

export const updateTaskStatus = asyncHandler(async (
    req,
    res
) => {
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
})

export const deleteTask = asyncHandler(async (
    req,
    res
) => {
    await deleteTaskService(req.params.id)

    return res.status(200).json(
        new ApiResponse(
            true,
            "Task deleted successfully"
        )
    )
})
export const getAssignedTasks = asyncHandler(async (
    req,
    res
) => {
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
})
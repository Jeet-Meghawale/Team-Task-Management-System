import ApiError from "../../utils/apiError.js"

import {
    createTaskRepository,
    deleteTaskRepository,
    getAssignedTasksRepository,
    getTasksRepository,
    updateTaskRepository
} from "./task.repository.js"

import {
    getSingleProjectRepository
} from "../projects/project.repository.js"

export const createTaskService = async (
    data,
    userId
) => {
    const project =
        await getSingleProjectRepository(
            data.projectId
        )

    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    return createTaskRepository({
        ...data,

        dueDate: data.dueDate
            ? new Date(data.dueDate)
            : null,

        createdById: userId
    })
}

export const getTasksService = async ({
    page,
    limit,
    search,
    status,
    priority
}) => {
    const skip = (page - 1) * limit

    return getTasksRepository({
        skip,
        take: limit,
        search,
        status,
        priority
    })
}

import {
    getSingleTaskRepository
} from "./task.repository.js"

export const getSingleTaskService = async (
    id
) => {
    const task = await getSingleTaskRepository(
        id
    )

    if (!task) {
        throw new ApiError(404, "Task not found")
    }

    return task
}

export const updateTaskService = async (
    id,
    data
) => {
    const task = await getSingleTaskRepository(
        id
    )

    if (!task) {
        throw new ApiError(404, "Task not found")
    }

    return updateTaskRepository(id, {
        ...data,

        dueDate: data.dueDate
            ? new Date(data.dueDate)
            : undefined
    })
}

export const updateTaskStatusService =
    async (
        taskId,
        status,
        user
    ) => {
        const task =
            await getSingleTaskRepository(taskId)

        if (!task) {
            throw new ApiError(404, "Task not found")
        }

        const isDeveloper =
            user.role === "DEVELOPER"

        const isAssignedDeveloper =
            task.assignedToId === user.id

        if (
            isDeveloper &&
            !isAssignedDeveloper
        ) {
            throw new ApiError(
                403,
                "You can only update your assigned tasks"
            )
        }

        return updateTaskRepository(taskId, {
            status
        })
    }

export const deleteTaskService = async (
    id
) => {
    const task = await getSingleTaskRepository(
        id
    )

    if (!task) {
        throw new ApiError(404, "Task not found")
    }

    await deleteTaskRepository(id)
}


export const getAssignedTasksService =
    async (userId) => {
        return getAssignedTasksRepository(
            userId
        )
    }
import ApiResponse from "../../utils/apiResponse.js"

import {
    createProjectService,
    getProjectsService,
    getSingleProjectService,
    updateProjectService,
    deleteProjectService,
    assignMembersService
} from "./project.service.js"

export const createProject = async (
    req,
    res,
    next
) => {
    try {
        const project = await createProjectService(
            req.body,
            req.user.id
        )

        return res.status(201).json(
            new ApiResponse(
                true,
                "Project created successfully",
                project
            )
        )
    } catch (error) {
        next(error)
    }
}

export const getProjects = async (
    req,
    res,
    next
) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const search = req.query.search || ""

        const projects = await getProjectsService({
            page,
            limit,
            search
        })

        return res.status(200).json(
            new ApiResponse(
                true,
                "Projects fetched successfully",
                projects
            )
        )
    } catch (error) {
        next(error)
    }
}

export const getSingleProject = async (
    req,
    res,
    next
) => {
    try {
        const project =
            await getSingleProjectService(
                req.params.id
            )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Project fetched successfully",
                project
            )
        )
    } catch (error) {
        next(error)
    }
}

export const updateProject = async (
    req,
    res,
    next
) => {
    try {
        const project =
            await updateProjectService(
                req.params.id,
                req.body
            )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Project updated successfully",
                project
            )
        )
    } catch (error) {
        next(error)
    }
}

export const deleteProject = async (
    req,
    res,
    next
) => {
    try {
        await deleteProjectService(req.params.id)

        return res.status(200).json(
            new ApiResponse(
                true,
                "Project deleted successfully"
            )
        )
    } catch (error) {
        next(error)
    }
}

export const assignMembers = async (
    req,
    res,
    next
) => {
    try {
        await assignMembersService(
            req.params.id,
            req.body.userIds
        )

        return res.status(200).json(
            new ApiResponse(
                true,
                "Members assigned successfully"
            )
        )
    } catch (error) {
        next(error)
    }
}
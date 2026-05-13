import ApiResponse from "../../utils/apiResponse.js"
import asyncHandler from "../../utils/asyncHandler.js"
import {
    createProjectService,
    getProjectsService,
    getSingleProjectService,
    updateProjectService,
    deleteProjectService,
    assignMembersService
} from "./project.service.js"

export const createProject = asyncHandler(async (
    req,
    res
) => {
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
}
)

export const getProjects = asyncHandler(async (req, res) => {

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

})

export const getSingleProject = asyncHandler(async (
    req,
    res
) => {

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
})

export const updateProject = asyncHandler(async (
    req,
    res
) => {
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
})

export const deleteProject = asyncHandler(async (
    req,
    res
) => {
    await deleteProjectService(req.params.id)

    return res.status(200).json(
        new ApiResponse(
            true,
            "Project deleted successfully"
        )
    )
})

export const assignMembers = asyncHandler(async (
    req,
    res
) => {
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
})
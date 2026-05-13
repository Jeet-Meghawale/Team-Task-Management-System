import {
  createProjectRepository,
  deleteProjectRepository,
  getProjectsRepository,
  getSingleProjectRepository,
  updateProjectRepository
} from "./project.repository.js"


import ApiError from "../../utils/apiError.js"


export const createProjectService = async (
  data,
  userId
) => {
  return createProjectRepository({
    ...data,

    startDate: new Date(data.startDate),

    endDate: data.endDate
      ? new Date(data.endDate)
      : null,

    createdById: userId
  })
}

export const getProjectsService = async ({
  page,
  limit,
  search
}) => {
  const skip = (page - 1) * limit

  return getProjectsRepository({
    skip,
    take: limit,
    search
  })
}



export const getSingleProjectService = async (
  id
) => {
  const project = await getSingleProjectRepository(
    id
  )

  if (!project) {
    throw new ApiError(404, "Project not found")
  }

  return project
}

export const updateProjectService = async (
  id,
  data
) => {
  const project =
    await getSingleProjectRepository(id)

  if (!project) {
    throw new ApiError(404, "Project not found")
  }

  return updateProjectRepository(id, {
    ...data,

    startDate: data.startDate
      ? new Date(data.startDate)
      : undefined,

    endDate: data.endDate
      ? new Date(data.endDate)
      : undefined
  })
}

export const deleteProjectService = async (
  id
) => {
  const project =
    await getSingleProjectRepository(id)

  if (!project) {
    throw new ApiError(404, "Project not found")
  }

  await deleteProjectRepository(id)
}

import {
  assignMembersRepository
} from "./project.repository.js"

export const assignMembersService = async (
  projectId,
  userIds
) => {
  const project =
    await getSingleProjectRepository(projectId)

  if (!project) {
    throw new ApiError(404, "Project not found")
  }

  await assignMembersRepository(
    projectId,
    userIds
  )
}
import ApiError from "../../utils/apiError.js"

import {
  createTaskRepository,
  getTasksRepository
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

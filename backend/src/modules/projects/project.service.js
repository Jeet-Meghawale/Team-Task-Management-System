import {
    createProjectRepository,
    getProjectsRepository
} from "./project.repository.js"

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

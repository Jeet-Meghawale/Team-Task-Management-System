import prisma from "../../config/prisma.js"

export const createProjectRepository = async (
  data
) => {
  return prisma.project.create({
    data,
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })
}

export const getProjectsRepository = async ({
  skip,
  take,
  search
}) => {
  return prisma.project.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive"
      }
    },

    skip,
    take,

    orderBy: {
      createdAt: "desc"
    },

    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },

      _count: {
        select: {
          tasks: true,
          members: true
        }
      }
    }
  })
}


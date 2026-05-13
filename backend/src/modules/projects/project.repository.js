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

export const getSingleProjectRepository = async (
  id
) => {
  return prisma.project.findUnique({
    where: {
      id
    },

    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },

      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      },

      tasks: {
        select: {
          id: true,
          title: true,
          status: true,
          priority: true
        }
      }
    }
  })
}

export const updateProjectRepository = async (
  id,
  data
) => {
  return prisma.project.update({
    where: {
      id
    },

    data
  })
}

export const deleteProjectRepository = async (
  id
) => {
  return prisma.project.delete({
    where: {
      id
    }
  })
}

export const assignMembersRepository = async (
  projectId,
  userIds
) => {
  return prisma.projectMember.createMany({
    data: userIds.map((userId) => ({
      projectId,
      userId
    })),

    skipDuplicates: true
  })
}
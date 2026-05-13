import prisma from "../../config/prisma.js"

export const createTaskRepository = async (
  data
) => {
  return prisma.task.create({
    data,

    include: {
      project: {
        select: {
          id: true,
          name: true
        }
      },

      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },

      createdBy: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

export const getTasksRepository = async ({
  skip,
  take,
  search,
  status,
  priority
}) => {
  return prisma.task.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive"
      },

      ...(status && { status }),

      ...(priority && { priority })
    },

    skip,
    take,

    orderBy: {
      createdAt: "desc"
    },

    include: {
      project: {
        select: {
          id: true,
          name: true
        }
      },

      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })
}


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

export const getSingleTaskRepository = async (
    id
) => {
    return prisma.task.findUnique({
        where: {
            id
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
            },

            createdBy: {
                select: {
                    id: true,
                    name: true
                }
            },

            comments: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },

                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })
}

export const updateTaskRepository = async (
    id,
    data
) => {
    return prisma.task.update({
        where: {
            id
        },

        data
    })
}

export const deleteTaskRepository = async (
    id
) => {
    return prisma.task.delete({
        where: {
            id
        }
    })
}

export const getAssignedTasksRepository =
    async (userId) => {
        return prisma.task.findMany({
            where: {
                assignedToId: userId
            },

            include: {
                project: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },

            orderBy: {
                dueDate: "asc"
            }
        })
    }
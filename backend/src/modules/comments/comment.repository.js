import prisma from "../../config/prisma.js"

export const createCommentRepository =
    async (data) => {
        return prisma.taskComment.create({
            data,

            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
    }

export const getTaskCommentsRepository =
    async (taskId) => {
        return prisma.taskComment.findMany({
            where: {
                taskId
            },

            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },

            orderBy: {
                createdAt: "desc"
            }
        })
    }
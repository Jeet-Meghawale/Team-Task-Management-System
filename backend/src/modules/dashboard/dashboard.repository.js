import prisma from "../../config/prisma.js"

export const getTotalProjects =
    async () => {
        return prisma.project.count()
    }

export const getTotalTasks =
    async () => {
        return prisma.task.count()
    }

export const getCompletedTasks =
    async () => {
        return prisma.task.count({
            where: {
                status: "COMPLETED"
            }
        })
    }

export const getPendingTasks =
    async () => {
        return prisma.task.count({
            where: {
                NOT: {
                    status: "COMPLETED"
                }
            }
        })
    }

export const getOverdueTasks =
    async () => {
        return prisma.task.count({
            where: {
                dueDate: {
                    lt: new Date()
                },

                NOT: {
                    status: "COMPLETED"
                }
            }
        })
    }

export const getTaskCountByStatus =
    async () => {
        return prisma.task.groupBy({
            by: ["status"],

            _count: {
                status: true
            }
        })
    }
    
    export const getTaskCountByPriority =
        async () => {
            return prisma.task.groupBy({
                by: ["priority"],

                _count: {
                    priority: true
                }
            })
        }

        
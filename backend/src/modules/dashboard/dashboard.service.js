import {
    getTotalProjects,
    getTotalTasks,
    getCompletedTasks,
    getPendingTasks,
    getOverdueTasks,
    getTaskCountByStatus,
    getTaskCountByPriority
} from "./dashboard.repository.js"

export const getDashboardStatsService =
    async () => {
        const [
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueTasks,
            taskStatusStats,
            taskPriorityStats
        ] = await Promise.all([
            getTotalProjects(),
            getTotalTasks(),
            getCompletedTasks(),
            getPendingTasks(),
            getOverdueTasks(),
            getTaskCountByStatus(),
            getTaskCountByPriority()
        ])

        return {
            totalProjects,
            totalTasks,
            completedTasks,
            pendingTasks,
            overdueTasks,

            taskStatusStats,

            taskPriorityStats
        }
    }

    
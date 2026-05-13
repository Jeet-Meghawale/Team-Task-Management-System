import ApiResponse from "../../utils/apiResponse.js"

import {
    getDashboardStatsService
} from "./dashboard.service.js"

export const getDashboardStats =
    async (req, res, next) => {
        try {
            const stats =
                await getDashboardStatsService()

            return res.status(200).json(
                new ApiResponse(
                    true,
                    "Dashboard stats fetched successfully",
                    stats
                )
            )
        } catch (error) {
            next(error)
        }
    }
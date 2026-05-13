import ApiResponse from "../../utils/apiResponse.js"
import asyncHandler from "../../utils/asyncHandler.js"
import {
    getDashboardStatsService
} from "./dashboard.service.js"

export const getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await getDashboardStatsService()

    return res.status(200).json(
        new ApiResponse(
            true,
            "Dashboard stats fetched successfully",
            stats
        )
    )
}
)
import ApiResponse from "../../utils/apiResponse.js"

import { getUsersService } from "./user.services.js"

export const getUsers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search || ""

    const users = await getUsersService({
      page,
      limit,
      search
    })

    return res.status(200).json(
      new ApiResponse(
        true,
        "Users fetched successfully",
        users
      )
    )
  } catch (error) {
    next(error)
  }
}
import ApiResponse from "../../utils/apiResponse.js"

import { getUsersService,getSingleUserService, updateUserRoleService, createUserService, updateUserStatusService } from "./user.services.js"

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

export const getSingleUser = async (
  req,
  res,
  next
) => {
  try {
    const user = await getSingleUserService(
      req.params.id
    )

    return res.status(200).json(
      new ApiResponse(
        true,
        "User fetched successfully",
        user
      )
    )
  } catch (error) {
    next(error)
  }
}

export const createUser = async (
  req,
  res,
  next
) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      throw new ApiError(
        400,
        "All fields are required"
      )
    }

    const user = await createUserService(req.body)

    return res.status(201).json(
      new ApiResponse(
        true,
        "User created successfully",
        user
      )
    )
  } catch (error) {
    next(error)
  }
}

export const updateUserRole = async (
  req,
  res,
  next
) => {
  try {
    const { role } = req.body

    const user = await updateUserRoleService(
      req.params.id,
      role
    )

    return res.status(200).json(
      new ApiResponse(
        true,
        "User role updated successfully",
        user
      )
    )
  } catch (error) {
    next(error)
  }
}

export const updateUserStatus = async (
  req,
  res,
  next
) => {
  try {
    const { isActive } = req.body

    const user = await updateUserStatusService(
      req.params.id,
      isActive
    )

    return res.status(200).json(
      new ApiResponse(
        true,
        "User status updated successfully",
        user
      )
    )
  } catch (error) {
    next(error)
  }
}


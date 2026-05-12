import ApiResponse from "../../utils/apiResponse.js"
import ApiError from "../../utils/apiError.js"

import {
  registerService
} from "./auth.service.js"

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required")
    }

    const result = await registerService(req.body)

    return res.status(201).json(
      new ApiResponse(
        true,
        "User registered successfully",
        result
      )
    )
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Login route working"
    })
  } catch (error) {
    next(error)
  }
}
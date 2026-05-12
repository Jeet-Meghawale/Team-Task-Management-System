import ApiResponse from "../../utils/apiResponse.js"
import ApiError from "../../utils/apiError.js"

import {
    registerService,
    loginService
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
        const { email, password } = req.body

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required")
        }

        const result = await loginService(req.body)

        return res.status(200).json(
            new ApiResponse(
                true,
                "Login successful",
                result
            )
        )
    } catch (error) {
        next(error)
    }
}

export const getCurrentUser = async (req, res, next) => {
    try {
        return res.status(200).json(
            new ApiResponse(
                true,
                "Current user fetched successfully",
                req.user
            )
        )
    } catch (error) {
        next(error)
    }
}
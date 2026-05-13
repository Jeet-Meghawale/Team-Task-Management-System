import ApiResponse from "../../utils/apiResponse.js"
import ApiError from "../../utils/apiError.js"
import asyncHandler from "../../utils/asyncHandler.js"

import {
    registerService,
    loginService
} from "./auth.service.js"

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const result = await registerService(req.body)

    return res.status(201).json(
        new ApiResponse(
            true,
            "User registered successfully",
            result
        )
    )

}
)

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body


    const result = await loginService(req.body)

    return res.status(200).json(
        new ApiResponse(
            true,
            "Login successful",
            result
        )
    )
}
)

export const getCurrentUser = asyncHandler(async (req, res) => {

    return res.status(200).json(
        new ApiResponse(
            true,
            "Current user fetched successfully",
            req.user
        )
    )

})
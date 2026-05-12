import jwt from "jsonwebtoken"

import prisma from "../config/prisma.js"

import ApiError from "../utils/apiError.js"

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Unauthorized access")
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            throw new ApiError(401, "User not found")
        }

        if (!user.isActive) {
            throw new ApiError(403, "User account is deactivated")
        }

        req.user = {
            id: user.id,
            role: user.role,
            email: user.email,
            name: user.name
        }

        next()
    } catch (error) {
        next(error)
    }
}

export default authMiddleware
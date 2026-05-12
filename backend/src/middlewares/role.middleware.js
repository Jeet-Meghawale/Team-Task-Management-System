import ApiError from "../utils/apiError.js"

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw new ApiError(401, "Unauthorized access")
            }

            if (!roles.includes(req.user.role)) {
                throw new ApiError(
                    403,
                    "You do not have permission to access this resource"
                )
            }

            next()
        } catch (error) {
            next(error)
        }
    }
}

export default authorizeRoles
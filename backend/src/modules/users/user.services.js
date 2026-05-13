import { findUsers, findUserById, createUserRepository, updateUserRoleRepository, updateUserStatusRepository } from "./user.repository.js"
import { findUserByEmail } from "../auth/auth.repository.js"
import ApiError from "../../utils/apiError.js"
import bcrypt from "bcryptjs"



export const getUsersService = async ({
    page,
    limit,
    search
}) => {
    const skip = (page - 1) * limit

    const users = await findUsers({
        skip,
        take: limit,
        search
    })

    return users
}

export const getSingleUserService = async (id) => {
    const user = await findUserById(id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return user
}

export const createUserService = async (data) => {
    let { name, email, password, role } = data

    email = email.toLowerCase()

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    return createUserRepository({
        name,
        email,
        password: hashedPassword,
        role
    })
}

export const updateUserRoleService = async (
    id,
    role
) => {
    const user = await findUserById(id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return updateUserRoleRepository(id, role)
}

export const updateUserStatusService = async (
    id,
    isActive
) => {
    const user = await findUserById(id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    return updateUserStatusRepository(id, isActive)
}
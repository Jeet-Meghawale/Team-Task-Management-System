import bcrypt from "bcryptjs"

import ApiError from "../../utils/apiError.js"
import generateToken from "../../utils/generateToken.js"

import {
    findUserByEmail,
    createUser
} from "./auth.repository.js"

export const registerService = async (data) => {
    let { name, email, password, role } = data

    email = email.toLowerCase()

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
        throw new ApiError(400, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({
        name,
        email,
        password: hashedPassword,
        role
    })

    const token = generateToken({
        id: user.id,
        role: user.role
    })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}

export const loginService = async (data) => {
    let { email, password } = data

    email = email.toLowerCase()

    const user = await findUserByEmail(email)

    if (!user) {
        throw new ApiError(401, "Invalid email or password")
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    )

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password")
    }

    if (!user.isActive) {
        throw new ApiError(403, "User account is deactivated")
    }

    const token = generateToken({
        id: user.id,
        role: user.role
    })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}


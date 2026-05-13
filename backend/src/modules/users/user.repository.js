import prisma from "../../config/prisma.js"

export const findUsers = async ({
    skip,
    take,
    search
}) => {
    return prisma.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                },
                {
                    email: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            ]
        },
        skip,
        take,
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    })
}

export const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    })
}

export const createUserRepository = async (data) => {
    return prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true
        }
    })
}

export const updateUserRoleRepository = async (
    id,
    role
) => {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            role
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true
        }
    })


}

export const updateUserStatusRepository = async (
    id,
    isActive
) => {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            isActive
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true
        }
    })
}


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
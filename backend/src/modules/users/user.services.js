import { findUsers } from "./user.repository.js"

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
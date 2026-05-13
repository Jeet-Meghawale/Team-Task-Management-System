import { z } from "zod"

export const createCommentSchema =
  z.object({
    commentText: z
      .string()
      .min(1, "Comment is required")
  })
  
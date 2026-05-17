import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createTaskComment } from "@/services/comment.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { getApiErrorMessage } from "@/lib/api/error-message"
import { addNotification } from "@/features/notifications/lib/notification-center"

export function useCommentMutations(taskId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentText) => createTaskComment(taskId, commentText),
    onMutate: async (commentText) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.task(taskId),
      })
      const previous = queryClient.getQueryData(queryKeys.comments.task(taskId))
      const optimistic = {
        id: `temp-${Date.now()}`,
        commentText,
        taskId,
        createdAt: new Date().toISOString(),
        user: { name: "You" },
        optimistic: true,
      }
      queryClient.setQueryData(queryKeys.comments.task(taskId), (old = []) => [
        optimistic,
        ...old,
      ])
      return { previous }
    },
    onError: (error, _text, context) => {
      queryClient.setQueryData(
        queryKeys.comments.task(taskId),
        context?.previous,
      )
      toast.error(getApiErrorMessage(error, "Failed to add comment"))
    },
    onSuccess: (comment) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.task(taskId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(taskId) })
      toast.success("Comment added")
      addNotification({
        type: "comment",
        title: "New comment",
        message: comment.commentText.slice(0, 80),
        href: `/app/tasks?task=${taskId}`,
      })
    },
  })
}

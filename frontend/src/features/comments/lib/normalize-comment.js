export function mapComment(comment) {
  if (!comment) return null
  return {
    id: comment.id,
    commentText: comment.commentText,
    taskId: comment.taskId,
    userId: comment.userId,
    user: comment.user,
    createdAt: comment.createdAt,
  }
}

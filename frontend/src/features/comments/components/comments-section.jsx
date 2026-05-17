import { useState } from "react"
import { Loader2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { useComments } from "@/features/comments/hooks/use-comments"
import { useCommentMutations } from "@/features/comments/hooks/use-comment-mutations"
import { formatDisplayDate } from "@/lib/format/date"

export function CommentsSection({ taskId }) {
  const [text, setText] = useState("")
  const commentsQuery = useComments(taskId)
  const commentMutation = useCommentMutations(taskId)

  async function handleSubmit(event) {
    event.preventDefault()
    const value = text.trim()
    if (!value) return
    await commentMutation.mutateAsync(value)
    setText("")
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Comments</h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows={2}
          className="flex min-h-[72px] flex-1 resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <Button
          type="submit"
          size="icon"
          className="size-9 shrink-0 self-end"
          disabled={!text.trim() || commentMutation.isPending}
        >
          {commentMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </Button>
      </form>

      {commentsQuery.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : commentsQuery.isError ? (
        <ErrorDisplay
          error={commentsQuery.error}
          onRetry={() => commentsQuery.refetch()}
        />
      ) : commentsQuery.data?.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
          No comments yet. Start the conversation.
        </p>
      ) : (
        <ul className="space-y-3">
          {commentsQuery.data.map((comment) => (
            <li
              key={comment.id}
              className="rounded-lg border border-border bg-muted/20 px-3 py-2.5"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {comment.user?.name ?? "Unknown"}
                </span>
                <span>{formatDisplayDate(comment.createdAt)}</span>
              </div>
              <p className="mt-1 text-sm text-foreground">{comment.commentText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

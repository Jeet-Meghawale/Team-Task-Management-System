import { CheckSquare } from "lucide-react"
import { EmptyStateCard } from "@/components/shared/empty-state-card"

export function TaskEmptyState({ canCreate, onCreate }) {
  return (
    <EmptyStateCard
      icon={CheckSquare}
      title="No tasks found"
      description="Create a task or adjust your filters to see work items."
      actionLabel={canCreate ? "Create task" : undefined}
      onAction={canCreate ? onCreate : undefined}
    />
  )
}

import { FolderKanban } from "lucide-react"
import { EmptyStateCard } from "@/components/shared/empty-state-card"

export function ProjectEmptyState({ canCreate, onCreate }) {
  return (
    <EmptyStateCard
      icon={FolderKanban}
      title="No projects found"
      description={
        canCreate
          ? "Create your first project to plan timelines and assign members."
          : "No projects match your filters, or you do not have access to create projects yet."
      }
      actionLabel={canCreate ? "Create project" : undefined}
      onAction={canCreate ? onCreate : undefined}
    />
  )
}

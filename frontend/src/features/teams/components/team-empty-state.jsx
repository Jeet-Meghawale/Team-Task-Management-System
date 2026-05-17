import { FolderKanban, Users } from "lucide-react"
import { EmptyStateCard } from "@/components/shared/empty-state-card"

const COPY = {
  teams: {
    title: "No teams found",
    descriptionCreate:
      "Create your first team to organize members and track project work together.",
    descriptionBrowse:
      "No teams match your filters, or you do not have access to create teams yet.",
    action: "Create team",
  },
  projects: {
    title: "No projects found",
    descriptionCreate:
      "Create your first project to plan timelines and assign team members.",
    descriptionBrowse:
      "No projects match your filters, or you do not have access to create projects yet.",
    action: "Create project",
  },
}

export function TeamEmptyState({ variant = "teams", canCreate, onCreate }) {
  const copy = COPY[variant] ?? COPY.teams
  const Icon = variant === "projects" ? FolderKanban : Users

  return (
    <EmptyStateCard
      icon={Icon}
      title={copy.title}
      description={canCreate ? copy.descriptionCreate : copy.descriptionBrowse}
      actionLabel={canCreate ? copy.action : undefined}
      onAction={canCreate ? onCreate : undefined}
    />
  )
}

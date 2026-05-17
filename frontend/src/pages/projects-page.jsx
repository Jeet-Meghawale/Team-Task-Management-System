import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ErrorDisplay } from "@/components/feedback/error-display"
import { PageHeader } from "@/components/shared/page-header"
import { ListPagination } from "@/components/shared/list-pagination"
import { ROUTES } from "@/lib/constants/routes"
import { useAuth } from "@/lib/auth/use-auth"
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value"
import { PROJECT_STATUS_FILTER_ALL } from "@/features/projects/lib/project-status"
import {
  canDeleteProject,
  canManageProjects,
} from "@/features/projects/lib/project-permissions"
import { useProjects } from "@/features/projects/hooks/use-projects"
import { useProjectMutations } from "@/features/projects/hooks/use-project-mutations"
import { ProjectFilters } from "@/features/projects/components/project-filters"
import { ProjectViewToggle } from "@/features/projects/components/project-view-toggle"
import { ProjectTable } from "@/features/projects/components/project-table"
import { ProjectCardGrid } from "@/features/projects/components/project-card-grid"
import { ProjectListSkeleton } from "@/features/projects/components/project-list-skeleton"
import { ProjectEmptyState } from "@/features/projects/components/project-empty-state"
import { ProjectFormDialog } from "@/features/projects/components/project-form-dialog"
import { ProjectDeleteDialog } from "@/features/projects/components/project-delete-dialog"

const PAGE_LIMIT = 10

export function ProjectsPage() {
  const { user } = useAuth()
  const role = user?.role
  const detailRoute = (id) => ROUTES.PROJECT_DETAIL(id)

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState(PROJECT_STATUS_FILTER_ALL)
  const [view, setView] = useState("table")

  const [createOpen, setCreateOpen] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const debouncedSearch = useDebouncedValue(search)

  const projectsQuery = useProjects({
    page,
    limit: PAGE_LIMIT,
    search: debouncedSearch,
    status,
  })

  const { createMutation, updateMutation, deleteMutation } = useProjectMutations()

  const projects = projectsQuery.data ?? []
  const canManage = canManageProjects(role)
  const canDelete = canDeleteProject(role)
  const isFiltered = status !== PROJECT_STATUS_FILTER_ALL
  const hasNextPage = !isFiltered && projects.length >= PAGE_LIMIT

  return (
    <div className="space-y-8">
      <PageHeader
        title="Projects"
        description="Plan projects, timelines, and member assignments."
        hideTitle
        actions={
          <>
            <ProjectViewToggle view={view} onViewChange={setView} />
            {canManage ? (
              <Button type="button" onClick={() => setCreateOpen(true)}>
                <Plus className="size-4" aria-hidden />
                Create project
              </Button>
            ) : null}
          </>
        }
      />

      <ProjectFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setPage(1)
        }}
      />

      {projectsQuery.isLoading ? (
        <ProjectListSkeleton view={view} />
      ) : projectsQuery.isError ? (
        <ErrorDisplay
          error={projectsQuery.error}
          onRetry={() => projectsQuery.refetch()}
        />
      ) : projects.length === 0 ? (
        <ProjectEmptyState
          canCreate={canManage}
          onCreate={() => setCreateOpen(true)}
        />
      ) : (
        <>
          {view === "table" ? (
            <ProjectTable
              projects={projects}
              detailRoute={detailRoute}
              canManage={canManage}
              canDelete={canDelete}
              onEdit={setEditProject}
              onDelete={setDeleteTarget}
            />
          ) : (
            <ProjectCardGrid
              projects={projects}
              detailRoute={detailRoute}
              canManage={canManage}
              canDelete={canDelete}
              onEdit={setEditProject}
              onDelete={setDeleteTarget}
            />
          )}

          {!isFiltered ? (
            <ListPagination
              page={page}
              onPageChange={setPage}
              hasNextPage={hasNextPage}
              isLoading={projectsQuery.isFetching}
            />
          ) : null}
        </>
      )}

      <ProjectFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        mode="create"
        isSubmitting={createMutation.isPending}
        onSubmit={(body) => createMutation.mutateAsync(body)}
      />

      <ProjectFormDialog
        open={Boolean(editProject)}
        onOpenChange={(open) => !open && setEditProject(null)}
        mode="edit"
        project={editProject}
        isSubmitting={updateMutation.isPending}
        onSubmit={(body) =>
          updateMutation.mutateAsync({ id: editProject.id, body })
        }
      />

      <ProjectDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        project={deleteTarget}
        isDeleting={deleteMutation.isPending}
        onConfirm={() => deleteMutation.mutate(deleteTarget.id)}
      />
    </div>
  )
}

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  assignProjectMembers,
  createProject,
  deleteProject,
  updateProject,
} from "@/services/project.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { ROUTES } from "@/lib/constants/routes"
import { getApiErrorMessage } from "@/lib/api/error-message"

export function useProjectMutations() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const invalidateProjects = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
  }

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (project) => {
      toast.success("Project created successfully")
      invalidateProjects()
      navigate(ROUTES.PROJECT_DETAIL(project.id))
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => updateProject(id, body),
    onSuccess: (project) => {
      toast.success("Project updated successfully")
      invalidateProjects()
      queryClient.setQueryData(queryKeys.projects.detail(project.id), project)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      toast.success("Project deleted successfully")
      invalidateProjects()
      navigate(ROUTES.PROJECTS)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to delete project"))
    },
  })

  const assignMembersMutation = useMutation({
    mutationFn: ({ projectId, userIds }) =>
      assignProjectMembers(projectId, userIds),
    onSuccess: (_, variables) => {
      toast.success("Members added successfully")
      invalidateProjects()
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects.detail(variables.projectId),
      })
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    assignMembersMutation,
  }
}

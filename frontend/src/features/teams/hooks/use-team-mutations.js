import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  assignTeamMembers,
  createTeam,
  deleteTeam,
  updateTeam,
} from "@/services/team.service"
import { queryKeys } from "@/lib/react-query/query-keys"
import { ROUTES } from "@/lib/constants/routes"
import { getApiErrorMessage } from "@/lib/api/error-message"
export function useTeamMutations() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const invalidateTeams = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.teams.all })
  }

  const createMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: (team) => {
      toast.success("Team created successfully")
      invalidateTeams()
      navigate(ROUTES.TEAM_DETAIL(team.id))
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, body }) => updateTeam(id, body),
    onSuccess: (team) => {
      toast.success("Team updated successfully")
      invalidateTeams()
      queryClient.setQueryData(queryKeys.teams.detail(team.id), team)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      toast.success("Team deleted successfully")
      invalidateTeams()
      navigate(ROUTES.TEAMS)
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to delete team"))
    },
  })

  const assignMembersMutation = useMutation({
    mutationFn: ({ teamId, userIds }) => assignTeamMembers(teamId, userIds),
    onSuccess: (_, variables) => {
      toast.success("Members added successfully")
      invalidateTeams()
      queryClient.invalidateQueries({
        queryKey: queryKeys.teams.detail(variables.teamId),
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

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AssignMembersDialog } from "@/features/projects/components/assign-members-dialog"
import { formatDisplayDate } from "@/features/projects/lib/normalize-project"
import {
  canAssignMembers,
  canBrowseUsersForAssignment,
} from "@/features/projects/lib/project-permissions"

export function ProjectMembersSection({
  project,
  userRole,
  onAssignMembers,
  isAssigning,
}) {
  const [assignOpen, setAssignOpen] = useState(false)
  const showAssign = canAssignMembers(userRole)

  return (
    <>
      <Card className="border-border/60 bg-card/50 shadow-none">
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div>
            <CardTitle>Project members</CardTitle>
            <CardDescription>
              {project.members.length} member{project.members.length === 1 ? "" : "s"}{" "}
              assigned to this project.
            </CardDescription>
          </div>
          {showAssign ? (
            <Button type="button" size="sm" onClick={() => setAssignOpen(true)}>
              <UserPlus className="size-4" />
              Add members
            </Button>
          ) : null}
        </CardHeader>
        <CardContent>
          {project.members.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border bg-muted/20 px-4 py-10 text-center">
              <p className="text-sm font-medium text-foreground">No members yet</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {showAssign
                  ? "Add teammates to collaborate on this project's work."
                  : "Members will appear here once assigned by an admin or manager."}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{member.role}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDisplayDate(member.assignedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {showAssign && !canBrowseUsersForAssignment(userRole) ? (
            <p className="mt-3 text-xs text-muted-foreground">
              User search for assignment is available to administrators.
            </p>
          ) : null}
        </CardContent>
      </Card>

      {showAssign ? (
        <AssignMembersDialog
          open={assignOpen}
          onOpenChange={setAssignOpen}
          project={project}
          userRole={userRole}
          onSubmit={(userIds) => onAssignMembers(userIds)}
          isSubmitting={isAssigning}
        />
      ) : null}
    </>
  )
}

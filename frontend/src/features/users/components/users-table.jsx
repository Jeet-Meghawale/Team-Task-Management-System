import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserRoleBadge } from "@/features/users/components/user-role-badge"
import { Badge } from "@/components/ui/badge"
import { formatDisplayDate } from "@/lib/format/date"
import { USER_ROLES } from "@/lib/auth/roles"
import { nativeSelectClassName } from "@/lib/ui/select-class"

export function UsersTable({ users, onRoleChange, onStatusChange, isUpdating }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <select
                  className={nativeSelectClassName}
                  value={user.role}
                  disabled={isUpdating}
                  onChange={(e) => onRoleChange(user, e.target.value)}
                  aria-label={`Change role for ${user.name}`}
                >
                  {Object.values(USER_ROLES).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      user.isActive
                        ? "border-transparent bg-emerald-500/15 text-emerald-700"
                        : "border-transparent bg-muted text-muted-foreground"
                    }
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <UserRoleBadge role={user.role} />
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDisplayDate(user.createdAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button type="button" variant="ghost" size="icon-sm">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        onStatusChange(user, !user.isActive)
                      }
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

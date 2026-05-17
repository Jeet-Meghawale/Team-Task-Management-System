import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTableShell } from "@/components/shared/data-table-shell"
import { NativeSelect } from "@/components/ui/native-select"
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
import { Badge } from "@/components/ui/badge"
import { formatDisplayDate } from "@/lib/format/date"
import { USER_ROLES } from "@/lib/auth/roles"
import { cn } from "@/lib/utils"

export function UsersTable({ users, onRoleChange, onStatusChange, isUpdating }) {
  return (
    <DataTableShell>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden lg:table-cell">Joined</TableHead>
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <p className="font-medium">{user.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                  {user.email}
                </p>
                <div className="mt-1 md:hidden">
                  <Badge
                    variant="outline"
                    className={cn(
                      user.isActive
                        ? "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                        : "border-transparent bg-muted text-muted-foreground",
                    )}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {user.email}
              </TableCell>
              <TableCell>
                <NativeSelect
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
                </NativeSelect>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant="outline"
                  className={cn(
                    user.isActive
                      ? "border-transparent bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "border-transparent bg-muted text-muted-foreground",
                  )}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {formatDisplayDate(user.createdAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Actions for ${user.name}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onStatusChange(user, !user.isActive)}
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
    </DataTableShell>
  )
}

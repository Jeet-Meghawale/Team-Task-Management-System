import { Link } from "react-router-dom"
import { LogOut, Settings, UserPlus } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ROUTES } from "@/lib/constants/routes"
import { USER_ROLES } from "@/lib/auth/roles"
import { useAuth } from "@/lib/auth/use-auth"
import { cn } from "@/lib/utils"

function getInitials(name) {
  if (!name) return "?"
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function UserMenu({ collapsed = false, className }) {
  const { user, logout } = useAuth()
  const isAdmin = user?.role === USER_ROLES.ADMIN

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "h-auto w-full justify-start gap-2 px-2 py-2 hover:bg-sidebar-accent/60",
            collapsed && "size-9 justify-center px-0",
            className,
          )}
        >
          <Avatar className="size-8">
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          {!collapsed ? (
            <span className="flex min-w-0 flex-1 flex-col items-start text-left">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                {user?.name}
              </span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                {user?.email}
              </span>
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align={collapsed ? "center" : "end"}
        side={collapsed ? "right" : "top"}
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <p className="text-sm leading-none font-medium">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isAdmin ? (
            <DropdownMenuItem asChild>
              <Link to={ROUTES.REGISTER}>
                <UserPlus />
                Create user
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem disabled>
            <Settings />
            Account settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logout}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

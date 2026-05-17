import { Bell } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ROUTES } from "@/lib/constants/routes"
import { useNotifications } from "@/features/notifications/hooks/use-notifications"
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "@/features/notifications/lib/notification-center"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const { items, unreadCount } = useNotifications()
  const recent = items.slice(0, 6)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative size-8"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          {unreadCount > 0 ? (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          {unreadCount > 0 ? (
            <button
              type="button"
              className="text-xs font-normal text-primary"
              onClick={markAllNotificationsRead}
            >
              Mark all read
            </button>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {recent.length === 0 ? (
          <p className="px-2 py-6 text-center text-xs text-muted-foreground">
            No notifications yet
          </p>
        ) : (
          recent.map((item) => (
            <DropdownMenuItem key={item.id} asChild>
              <Link
                to={item.href ?? ROUTES.NOTIFICATIONS}
                className={cn("flex flex-col items-start gap-0.5", !item.read && "bg-muted/50")}
                onClick={() => markNotificationRead(item.id)}
              >
                <span className="text-sm font-medium">{item.title}</span>
                <span className="line-clamp-2 text-xs text-muted-foreground">
                  {item.message}
                </span>
              </Link>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={ROUTES.NOTIFICATIONS} className="w-full justify-center text-center">
            View all
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

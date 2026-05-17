import { Link } from "react-router-dom"
import { Bell, CheckCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNotifications } from "@/features/notifications/hooks/use-notifications"
import {
  markAllNotificationsRead,
  markNotificationRead,
  removeNotification,
} from "@/features/notifications/lib/notification-center"
import { formatDisplayDate } from "@/lib/format/date"
import { cn } from "@/lib/utils"

export function NotificationsPage() {
  const { items, unreadCount } = useNotifications()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Activity from tasks, comments, and workspace updates.
          </p>
        </div>
        {unreadCount > 0 ? (
          <Button type="button" variant="outline" onClick={markAllNotificationsRead}>
            <CheckCheck className="size-4" />
            Mark all as read
          </Button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <Bell className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              You are all caught up. Notifications appear when you create tasks or
              comments.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <Card
                className={cn(
                  "py-0 transition-colors",
                  !item.read && "border-primary/30 bg-primary/5",
                )}
              >
                <CardContent className="flex items-start justify-between gap-4 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      {!item.read ? (
                        <span className="size-2 rounded-full bg-primary" />
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDisplayDate(item.createdAt)}
                    </p>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="mt-2 inline-block text-xs font-medium text-primary hover:underline"
                        onClick={() => markNotificationRead(item.id)}
                      >
                        View details
                      </Link>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {!item.read ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => markNotificationRead(item.id)}
                        aria-label="Mark as read"
                      >
                        <CheckCheck className="size-4" />
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeNotification(item.id)}
                      aria-label="Remove notification"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

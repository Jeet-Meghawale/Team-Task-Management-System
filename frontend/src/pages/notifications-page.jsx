import { Link } from "react-router-dom"
import { Bell, CheckCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyStateCard } from "@/components/shared/empty-state-card"
import { PageHeader } from "@/components/shared/page-header"
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
      <PageHeader
        title="Notifications"
        description="Activity from tasks, comments, and workspace updates."
        hideTitle
        actions={
          unreadCount > 0 ? (
            <Button type="button" variant="outline" onClick={markAllNotificationsRead}>
              <CheckCheck className="size-4" aria-hidden />
              Mark all as read
            </Button>
          ) : null
        }
      />

      {items.length === 0 ? (
        <EmptyStateCard
          icon={Bell}
          title="All caught up"
          description="Notifications appear when you create tasks or comments."
        />
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <Card
                className={cn(
                  "py-0 transition-colors",
                  !item.read && "border-primary/30 bg-primary/5 dark:bg-primary/10",
                )}
              >
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      {!item.read ? (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                          New
                        </span>
                      ) : null}
                    </div>
                    {item.body ? (
                      <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                    ) : null}
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDisplayDate(item.createdAt)}
                    </p>
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                        onClick={() => markNotificationRead(item.id)}
                      >
                        View details
                      </Link>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-1 self-end sm:self-start">
                    {!item.read ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => markNotificationRead(item.id)}
                      >
                        Mark read
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Remove notification"
                      onClick={() => removeNotification(item.id)}
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

import { useEffect, useState } from "react"
import {
  getNotifications,
  getUnreadCount,
  subscribeNotifications,
} from "@/features/notifications/lib/notification-center"

export function useNotifications() {
  const [items, setItems] = useState(getNotifications)
  const [unreadCount, setUnreadCount] = useState(getUnreadCount)

  useEffect(() => {
    return subscribeNotifications(() => {
      setItems(getNotifications())
      setUnreadCount(getUnreadCount())
    })
  }, [])

  return { items, unreadCount }
}

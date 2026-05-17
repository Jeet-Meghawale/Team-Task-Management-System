const STORAGE_KEY = "ttms_notifications"
const MAX_ITEMS = 50

const listeners = new Set()

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)))
  listeners.forEach((listener) => listener())
}

export function subscribeNotifications(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getNotifications() {
  return readAll()
}

export function getUnreadCount() {
  return readAll().filter((item) => !item.read).length
}

export function addNotification(notification) {
  const item = {
    id: crypto.randomUUID(),
    read: false,
    createdAt: new Date().toISOString(),
    ...notification,
  }
  writeAll([item, ...readAll()])
  return item
}

export function markNotificationRead(id) {
  writeAll(
    readAll().map((item) =>
      item.id === id ? { ...item, read: true } : item,
    ),
  )
}

export function markAllNotificationsRead() {
  writeAll(readAll().map((item) => ({ ...item, read: true })))
}

export function removeNotification(id) {
  writeAll(readAll().filter((item) => item.id !== id))
}

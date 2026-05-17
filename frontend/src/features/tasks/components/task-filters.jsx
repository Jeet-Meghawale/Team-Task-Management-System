import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TASK_PRIORITY_FILTER_ALL, TASK_PRIORITY_LABELS, TASK_PRIORITIES } from "@/lib/constants/task-priority"
import { TASK_STATUS_FILTER_ALL, TASK_STATUS_LABELS, TASK_STATUSES } from "@/lib/constants/task-status"
import { nativeSelectClassName } from "@/lib/ui/select-class"

export function TaskFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="pl-8"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <select
          className={nativeSelectClassName}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
        >
          <option value={TASK_STATUS_FILTER_ALL}>All statuses</option>
          {Object.values(TASK_STATUSES).map((value) => (
            <option key={value} value={value}>
              {TASK_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
        <select
          className={nativeSelectClassName}
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          aria-label="Filter by priority"
        >
          <option value={TASK_PRIORITY_FILTER_ALL}>All priorities</option>
          {Object.values(TASK_PRIORITIES).map((value) => (
            <option key={value} value={value}>
              {TASK_PRIORITY_LABELS[value]}
            </option>
          ))}
        </select>
        <select
          className={nativeSelectClassName}
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort tasks"
        >
          <option value="newest">Newest first</option>
          <option value="dueDate">Due date</option>
        </select>
      </div>
    </div>
  )
}

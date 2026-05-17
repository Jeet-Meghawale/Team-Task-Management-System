import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  PROJECT_STATUS_FILTER_ALL,
  PROJECT_STATUS_OPTIONS,
} from "@/features/projects/lib/project-status"
import { NativeSelect } from "@/components/ui/native-select"

export function ProjectFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects by name..."
          className="pl-8"
        />
      </div>
      <NativeSelect
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="sm:w-44"
        aria-label="Filter by status"
      >
        <option value={PROJECT_STATUS_FILTER_ALL}>All statuses</option>
        {PROJECT_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </div>
  )
}

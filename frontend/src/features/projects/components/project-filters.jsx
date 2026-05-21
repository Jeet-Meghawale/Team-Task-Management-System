import { Search } from "lucide-react"
import { NativeSelect } from "@/components/ui/native-select"
import { GlassCard } from "@/components/shared/glass-card"
import {
  PROJECT_STATUS_FILTER_ALL,
  PROJECT_STATUS_OPTIONS,
} from "@/features/projects/lib/project-status"

export function ProjectFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
}) {
  return (
    <GlassCard className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects..."
          className="h-10 w-full rounded-2xl border border-white/5 bg-muted/30 py-2 pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search projects"
        />
      </div>
      <NativeSelect
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="sm:w-48"
        aria-label="Filter by status"
      >
        <option value={PROJECT_STATUS_FILTER_ALL}>All statuses</option>
        {PROJECT_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
    </GlassCard>
  )
}

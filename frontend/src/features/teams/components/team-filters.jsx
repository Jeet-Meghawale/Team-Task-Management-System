import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  TEAM_STATUS_FILTER_ALL,
  TEAM_STATUS_OPTIONS,
} from "@/features/teams/lib/team-status"
import { cn } from "@/lib/utils"

export function TeamFilters({
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
          placeholder="Search teams by name..."
          className="pl-8"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={cn(
          "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm sm:w-44",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none",
        )}
        aria-label="Filter by status"
      >
        <option value={TEAM_STATUS_FILTER_ALL}>All statuses</option>
        {TEAM_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

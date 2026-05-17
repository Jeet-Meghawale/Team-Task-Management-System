import { DashboardStatsGrid } from "@/features/dashboard/components/dashboard-stats-grid"
import { CompletionOverview } from "@/features/dashboard/components/completion-overview"
import { TaskStatusSummary } from "@/features/dashboard/components/task-status-summary"
import { TaskPrioritySummary } from "@/features/dashboard/components/task-priority-summary"
import { DashboardEmpty } from "@/features/dashboard/components/dashboard-empty"
import { isDashboardEmpty } from "@/features/dashboard/lib/dashboard-stats"

export function DashboardView({ stats }) {
  if (isDashboardEmpty(stats)) {
    return <DashboardEmpty />
  }

  return (
    <div className="space-y-6">
      <DashboardStatsGrid stats={stats} />
      <CompletionOverview stats={stats} />
      <div className="grid gap-4 lg:grid-cols-2">
        <TaskStatusSummary stats={stats} />
        <TaskPrioritySummary stats={stats} />
      </div>
    </div>
  )
}

import { DashboardStatsGrid } from "@/features/dashboard/components/dashboard-stats-grid"
import { DashboardActivity } from "@/features/dashboard/components/dashboard-activity"
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
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <CompletionOverview stats={stats} />
        </div>
        <DashboardActivity stats={stats} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TaskStatusSummary stats={stats} />
        <TaskPrioritySummary stats={stats} />
      </div>
    </div>
  )
}

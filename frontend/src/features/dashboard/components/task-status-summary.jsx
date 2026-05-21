import { GlassCard } from "@/components/shared/glass-card"
import {
  BreakdownBar,
  BreakdownList,
} from "@/features/dashboard/components/breakdown-bar"
import { SummaryEmpty } from "@/features/dashboard/components/dashboard-empty"
import { hasTaskBreakdown } from "@/features/dashboard/lib/dashboard-stats"

export function TaskStatusSummary({ stats }) {
  const hasTasks = hasTaskBreakdown(stats)

  return (
    <GlassCard className="h-full p-5">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">Task status</h3>
        <p className="text-sm text-muted-foreground">
          Distribution by workflow stage
        </p>
      </div>
      {hasTasks ? (
        <div className="space-y-5">
          <BreakdownBar segments={stats.taskStatusStats} total={stats.totalTasks} />
          <BreakdownList items={stats.taskStatusStats} total={stats.totalTasks} />
        </div>
      ) : (
        <SummaryEmpty
          title="No tasks to summarize"
          description="Create tasks to see how work is distributed by status."
        />
      )}
    </GlassCard>
  )
}

import { GlassCard } from "@/components/shared/glass-card"
import {
  BreakdownBar,
  BreakdownList,
} from "@/features/dashboard/components/breakdown-bar"
import { SummaryEmpty } from "@/features/dashboard/components/dashboard-empty"
import { hasTaskBreakdown } from "@/features/dashboard/lib/dashboard-stats"

export function TaskPrioritySummary({ stats }) {
  const hasTasks = hasTaskBreakdown(stats)

  return (
    <GlassCard className="h-full p-5">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-foreground">Task priority</h3>
        <p className="text-sm text-muted-foreground">How work is distributed by urgency</p>
      </div>
      {hasTasks ? (
        <div className="space-y-5">
          <BreakdownBar
            segments={stats.taskPriorityStats}
            total={stats.totalTasks}
          />
          <BreakdownList
            items={stats.taskPriorityStats}
            total={stats.totalTasks}
          />
        </div>
      ) : (
        <SummaryEmpty
          title="No priority data"
          description="Priority insights appear once tasks are created."
        />
      )}
    </GlassCard>
  )
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BreakdownBar,
  BreakdownList,
} from "@/features/dashboard/components/breakdown-bar"
import { SummaryEmpty } from "@/features/dashboard/components/dashboard-empty"
import { hasTaskBreakdown } from "@/features/dashboard/lib/dashboard-stats"

export function TaskPrioritySummary({ stats }) {
  const hasTasks = hasTaskBreakdown(stats)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Task priority</CardTitle>
        <CardDescription>How work is distributed by urgency</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

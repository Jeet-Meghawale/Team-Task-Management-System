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

export function TaskStatusSummary({ stats }) {
  const hasTasks = hasTaskBreakdown(stats)

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Task status</CardTitle>
        <CardDescription>Distribution of tasks by workflow stage</CardDescription>
      </CardHeader>
      <CardContent>
        {hasTasks ? (
          <div className="space-y-5">
            <BreakdownBar
              segments={stats.taskStatusStats}
              total={stats.totalTasks}
            />
            <BreakdownList items={stats.taskStatusStats} total={stats.totalTasks} />
          </div>
        ) : (
          <SummaryEmpty
            title="No tasks to summarize"
            description="Create tasks to see how work is distributed by status."
          />
        )}
      </CardContent>
    </Card>
  )
}

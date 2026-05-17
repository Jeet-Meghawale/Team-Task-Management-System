import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProgressRing } from "@/features/dashboard/components/progress-ring"

export function CompletionOverview({ stats }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion overview</CardTitle>
        <CardDescription>
          See how much work is complete versus still in progress.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
          <Metric label="Total" value={stats.totalTasks} />
          <Metric label="Done" value={stats.completedTasks} />
          <Metric label="Pending" value={stats.pendingTasks} />
          <Metric label="Overdue" value={stats.overdueTasks} highlight />
        </div>
        <ProgressRing
          value={stats.completionRate}
          label="Complete"
          className="shrink-0"
        />
      </CardContent>
    </Card>
  )
}

function Metric({ label, value, highlight = false }) {
  return (
    <div className="rounded-lg border border-border/80 bg-muted/30 px-3 py-2.5 text-center">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={
          highlight
            ? "mt-0.5 text-xl font-semibold tabular-nums text-destructive"
            : "mt-0.5 text-xl font-semibold tabular-nums text-foreground"
        }
      >
        {value}
      </p>
    </div>
  )
}

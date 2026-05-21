import { GlassCard } from "@/components/shared/glass-card"
import { ProgressRing } from "@/features/dashboard/components/progress-ring"

export function CompletionOverview({ stats }) {
  return (
    <GlassCard className="p-5">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-foreground">Completion overview</h3>
        <p className="text-sm text-muted-foreground">
          Track progress across all active work
        </p>
      </div>
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Total" value={stats.totalTasks} />
          <Metric label="Done" value={stats.completedTasks} highlight="success" />
          <Metric label="Pending" value={stats.pendingTasks} />
          <Metric label="Overdue" value={stats.overdueTasks} highlight="danger" />
        </div>
        <ProgressRing
          value={stats.completionRate}
          label="Complete"
          className="shrink-0"
        />
      </div>
    </GlassCard>
  )
}

function Metric({ label, value, highlight }) {
  const valueClass =
    highlight === "danger"
      ? "text-destructive"
      : highlight === "success"
        ? "text-brand-success"
        : "text-foreground"

  return (
    <div className="rounded-xl bg-muted/30 px-3 py-3 text-center ring-1 ring-white/5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl font-bold tabular-nums ${valueClass}`}>{value}</p>
    </div>
  )
}

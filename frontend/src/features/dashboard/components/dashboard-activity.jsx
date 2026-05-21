import { CheckCircle2, Clock, FolderKanban } from "lucide-react"
import { GlassCard } from "@/components/shared/glass-card"
import { ProgressBar } from "@/components/shared/progress-bar"
import { cn } from "@/lib/utils"

export function DashboardActivity({ stats }) {
  const items = [
    {
      icon: CheckCircle2,
      label: "Tasks completed",
      value: stats.completedTasks,
      color: "text-brand-success",
    },
    {
      icon: Clock,
      label: "Tasks in progress",
      value: stats.pendingTasks,
      color: "text-brand-accent",
    },
    {
      icon: FolderKanban,
      label: "Active projects",
      value: stats.totalProjects,
      color: "text-brand-secondary",
    },
  ]

  return (
    <GlassCard className="p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-foreground">Delivery pulse</h3>
        <p className="text-sm text-muted-foreground">
          Real-time snapshot of work across your organization
        </p>
      </div>
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall completion</span>
          <span className="font-semibold tabular-nums text-foreground">
            {stats.completionRate}%
          </span>
        </div>
        <ProgressBar value={stats.completionRate} />
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between rounded-xl bg-muted/30 px-3 py-2.5 transition-colors hover:bg-muted/50"
          >
            <span className="flex items-center gap-2.5 text-sm text-foreground">
              <item.icon className={cn("size-4", item.color)} aria-hidden />
              {item.label}
            </span>
            <span className="text-sm font-semibold tabular-nums">{item.value}</span>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}

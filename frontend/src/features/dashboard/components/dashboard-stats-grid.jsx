import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FolderKanban,
  ListTodo,
} from "lucide-react"
import { StatCard } from "@/features/dashboard/components/stat-card"

export function DashboardStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        title="Total Projects"
        value={stats.totalProjects}
        description="Active in your org"
        icon={FolderKanban}
        accent="secondary"
      />
      <StatCard
        title="Total Tasks"
        value={stats.totalTasks}
        description="Across all projects"
        icon={ListTodo}
        accent="primary"
      />
      <StatCard
        title="Completed"
        value={stats.completedTasks}
        description={`${stats.completionRate}% completion rate`}
        icon={CheckCircle2}
        accent="success"
        trend={stats.completionRate > 0 ? "On track" : undefined}
      />
      <StatCard
        title="Pending"
        value={stats.pendingTasks}
        description="Awaiting completion"
        icon={Clock}
        accent="accent"
      />
      <StatCard
        title="Overdue"
        value={stats.overdueTasks}
        description="Needs attention"
        icon={AlertTriangle}
        accent="danger"
      />
    </div>
  )
}

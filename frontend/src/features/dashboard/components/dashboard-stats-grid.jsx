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
        description="In your organization"
        icon={FolderKanban}
        iconClassName="text-blue-600 dark:text-blue-400"
      />
      <StatCard
        title="Total Tasks"
        value={stats.totalTasks}
        description="Across all projects"
        icon={ListTodo}
        iconClassName="text-violet-600 dark:text-violet-400"
      />
      <StatCard
        title="Completed"
        value={stats.completedTasks}
        description={`${stats.completionRate}% completion rate`}
        icon={CheckCircle2}
        iconClassName="text-emerald-600 dark:text-emerald-400"
      />
      <StatCard
        title="Pending"
        value={stats.pendingTasks}
        description="Not yet completed"
        icon={Clock}
        iconClassName="text-amber-600 dark:text-amber-400"
      />
      <StatCard
        title="Overdue"
        value={stats.overdueTasks}
        description="Past due date"
        icon={AlertTriangle}
        iconClassName="text-rose-600 dark:text-rose-400"
      />
    </div>
  )
}

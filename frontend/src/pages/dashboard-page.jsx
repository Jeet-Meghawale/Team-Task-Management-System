import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { QueryState } from "@/components/feedback/query-state"
import { useAuth } from "@/lib/auth/use-auth"
import { queryKeys } from "@/lib/react-query/query-keys"
import { fetchDashboardStats } from "@/services/dashboard.service"
import { normalizeDashboardStats } from "@/features/dashboard/lib/dashboard-stats"
import { PageHeader } from "@/components/shared/page-header"
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton"
import { DashboardView } from "@/features/dashboard/components/dashboard-view"

export function DashboardPage() {
  const { user } = useAuth()
  const statsQuery = useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: fetchDashboardStats,
  })

  const stats = useMemo(
    () => normalizeDashboardStats(statsQuery.data),
    [statsQuery.data],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        hideTitle
        description={`Welcome back, ${user?.name ?? "there"}. Here's an overview of projects, tasks, and delivery across your organization.`}
      />

      <QueryState
        isLoading={statsQuery.isLoading}
        isError={statsQuery.isError}
        error={statsQuery.error}
        onRetry={() => statsQuery.refetch()}
        loadingFallback={<DashboardSkeleton />}
      >
        {() => (stats ? <DashboardView stats={stats} /> : null)}
      </QueryState>
    </div>
  )
}

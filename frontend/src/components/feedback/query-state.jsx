import { PageLoader } from "@/components/feedback/page-loader"
import { ErrorDisplay } from "@/components/feedback/error-display"

/**
 * Shared handling pattern for TanStack Query results in presentational trees.
 */
export function QueryState({
  isLoading,
  isError,
  error,
  onRetry,
  children,
  loadingFallback,
}) {
  if (isLoading) return loadingFallback ?? <PageLoader />
  if (isError) return <ErrorDisplay error={error} onRetry={onRetry} />
  return children()
}

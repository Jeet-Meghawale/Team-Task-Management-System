import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ListPagination({
  page,
  onPageChange,
  hasNextPage,
  isLoading,
  label = "Page",
  className,
}) {
  const hasPreviousPage = page > 1

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        {label} {page}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasPreviousPage || isLoading}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
          <span className="hidden xs:inline sm:inline">Previous</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasNextPage || isLoading}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <span className="hidden xs:inline sm:inline">Next</span>
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </nav>
  )
}

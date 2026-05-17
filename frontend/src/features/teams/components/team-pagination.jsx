import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TeamPagination({
  page,
  onPageChange,
  hasNextPage,
  isLoading,
}) {
  const hasPreviousPage = page > 1

  return (
    <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
      <p className="text-sm text-muted-foreground">Page {page}</p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasPreviousPage || isLoading}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!hasNextPage || isLoading}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

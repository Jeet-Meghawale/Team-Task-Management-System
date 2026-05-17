import { CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TaskEmptyState({ canCreate, onCreate }) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-muted">
          <CheckSquare className="size-6 text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">No tasks found</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Create a task or adjust your filters to see work items.
          </p>
        </div>
        {canCreate ? (
          <Button type="button" onClick={onCreate}>
            Create task
          </Button>
        ) : null}
      </CardContent>
    </Card>
  )
}

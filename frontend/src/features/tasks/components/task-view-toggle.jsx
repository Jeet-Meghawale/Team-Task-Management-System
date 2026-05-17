import { Columns3, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TaskViewToggle({ view, onViewChange }) {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5">
      <Button
        type="button"
        size="sm"
        variant={view === "table" ? "secondary" : "ghost"}
        className={cn("h-7 gap-1.5 px-2.5")}
        onClick={() => onViewChange("table")}
      >
        <Table className="size-3.5" />
        Table
      </Button>
      <Button
        type="button"
        size="sm"
        variant={view === "board" ? "secondary" : "ghost"}
        className={cn("h-7 gap-1.5 px-2.5")}
        onClick={() => onViewChange("board")}
      >
        <Columns3 className="size-3.5" />
        Board
      </Button>
    </div>
  )
}

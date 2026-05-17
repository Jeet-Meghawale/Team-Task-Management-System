import { LayoutGrid, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TeamViewToggle({ view, onViewChange }) {
  return (
    <div className="inline-flex rounded-lg border border-border p-0.5">
      <Button
        type="button"
        size="sm"
        variant={view === "table" ? "secondary" : "ghost"}
        className={cn("h-7 gap-1.5 px-2.5")}
        onClick={() => onViewChange("table")}
        aria-pressed={view === "table"}
      >
        <Table className="size-3.5" />
        Table
      </Button>
      <Button
        type="button"
        size="sm"
        variant={view === "grid" ? "secondary" : "ghost"}
        className={cn("h-7 gap-1.5 px-2.5")}
        onClick={() => onViewChange("grid")}
        aria-pressed={view === "grid"}
      >
        <LayoutGrid className="size-3.5" />
        Grid
      </Button>
    </div>
  )
}

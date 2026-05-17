import { LayoutGrid, Table } from "lucide-react"
import { ViewToggle } from "@/components/shared/view-toggle"

const OPTIONS = [
  { value: "table", label: "Table", icon: Table },
  { value: "grid", label: "Grid", icon: LayoutGrid },
]

export function TeamViewToggle({ view, onViewChange }) {
  return (
    <ViewToggle value={view} onChange={onViewChange} options={OPTIONS} />
  )
}

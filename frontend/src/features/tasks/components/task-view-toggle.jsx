import { Columns3, Table } from "lucide-react"
import { ViewToggle } from "@/components/shared/view-toggle"

const OPTIONS = [
  { value: "table", label: "Table", icon: Table },
  { value: "board", label: "Board", icon: Columns3 },
]

export function TaskViewToggle({ view, onViewChange }) {
  return (
    <ViewToggle value={view} onChange={onViewChange} options={OPTIONS} />
  )
}

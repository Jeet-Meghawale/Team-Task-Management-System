import { Link } from "react-router-dom"
import { ROUTES } from "@/lib/constants/routes"

export function AdminAreaPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold text-foreground">Admin area</h1>
      <p className="text-sm text-muted-foreground">
        Placeholder route protected by{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">ADMIN</code>.
        Add user management and other elevated tools here.
      </p>
      <Link
        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
        to={ROUTES.DASHBOARD}
      >
        Back to dashboard
      </Link>
    </div>
  )
}

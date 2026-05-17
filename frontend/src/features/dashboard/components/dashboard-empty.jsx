import { FolderKanban, ListTodo } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ROUTES } from "@/lib/constants/routes"

export function DashboardEmpty() {
  return (
    <Card className="border-dashed">
      <CardHeader className="items-center text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <FolderKanban className="size-6 text-muted-foreground" aria-hidden />
        </div>
        <CardTitle className="text-lg">No workspace activity yet</CardTitle>
        <CardDescription className="max-w-md">
          Projects and tasks will appear here once your team starts tracking work.
          Create a project or task to see dashboard insights.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-2 pb-6">
        <Button asChild variant="default">
          <Link to={ROUTES.TASKS}>
            <ListTodo />
            Go to tasks
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={ROUTES.PROJECTS}>View projects</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export function SummaryEmpty({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-10 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

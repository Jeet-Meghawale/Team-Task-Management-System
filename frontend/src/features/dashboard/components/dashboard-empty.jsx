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
    <Card className="border-dashed border-border/60 bg-card/50">
      <CardHeader className="items-center text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <FolderKanban className="size-6 text-muted-foreground" aria-hidden />
        </div>
        <CardTitle className="text-lg">No activity yet</CardTitle>
        <CardDescription className="max-w-md">
          Create a project or task to start tracking progress. Insights and
          summaries will appear here as work is added.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center gap-2 pb-6">
        <Button asChild>
          <Link to={ROUTES.PROJECTS}>
            <FolderKanban className="size-4" aria-hidden />
            Browse projects
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to={ROUTES.TASKS}>
            <ListTodo className="size-4" aria-hidden />
            View tasks
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export function SummaryEmpty({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-muted/20 px-6 py-10 text-center ring-1 ring-border/50">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TeamEmptyState({ canCreate, onCreate }) {
  return (
    <Card className="border-dashed">
      <CardHeader className="items-center text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
          <Users className="size-6 text-muted-foreground" aria-hidden />
        </div>
        <CardTitle>No teams found</CardTitle>
        <CardDescription className="max-w-md">
          {canCreate
            ? "Create your first team to organize members and track project work together."
            : "No teams match your filters, or you do not have access to create teams yet."}
        </CardDescription>
      </CardHeader>
      {canCreate ? (
        <CardContent className="flex justify-center pb-6">
          <Button type="button" onClick={onCreate}>
            Create team
          </Button>
        </CardContent>
      ) : null}
    </Card>
  )
}

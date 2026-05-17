import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function AuthFormCard({ title, description, children }) {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description ? (
          <CardDescription>{description}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

import { Link } from "react-router-dom"
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  Layers,
  Shield,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants/routes"
import heroImage from "@/assets/hero.png"

const FEATURES = [
  {
    icon: FolderKanban,
    title: "Projects & members",
    description:
      "Organize work by project, set timelines, and assign the right people to each initiative.",
  },
  {
    icon: CheckSquare,
    title: "Tasks that stay on track",
    description:
      "Plan, prioritize, and move work from backlog to done with table and board views.",
  },
  {
    icon: Shield,
    title: "Built for teams",
    description:
      "Role-based access keeps admins, managers, and developers in the right areas of the product.",
  },
]

export function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2.5 font-semibold text-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="size-4" aria-hidden />
            </span>
            Taskboard
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to={ROUTES.LOGIN}>Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={ROUTES.LOGIN}>
                Get started
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                <Users className="size-3.5" aria-hidden />
                Project & task management for modern teams
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl md:leading-[1.1]">
                  Plan projects. Ship work. Stay aligned.
                </h1>
                <p className="max-w-lg text-lg text-muted-foreground">
                  Taskboard brings projects, assignments, and delivery visibility
                  into one calm workspace—so your team always knows what matters
                  next.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to={ROUTES.LOGIN}>
                    Sign in to your account
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#features">See how it works</a>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-muted/40 blur-2xl"
                aria-hidden
              />
              <img
                src={heroImage}
                alt="Taskboard dashboard showing projects and tasks"
                className="relative w-full rounded-2xl border border-border/60 shadow-xl ring-1 ring-border/40"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-border/60 bg-muted/20 scroll-mt-8"
        >
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Everything you need to run delivery
              </h2>
              <p className="mt-2 text-muted-foreground">
                From intake to completion, keep projects and tasks connected in
                one product experience.
              </p>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <li
                  key={feature.title}
                  className="rounded-xl bg-card/60 p-6 ring-1 ring-border/60"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Taskboard. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

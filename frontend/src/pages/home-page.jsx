import { Link } from "react-router-dom"
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  Layers,
  Shield,
  Sparkles,
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
      <header className="sticky top-0 z-40 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2.5 font-semibold text-foreground"
          >
            <span className="gradient-primary flex size-9 items-center justify-center rounded-xl shadow-lg shadow-brand-primary/30">
              <Layers className="size-4 text-white" aria-hidden />
            </span>
            Taskboard
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="rounded-xl">
              <Link to={ROUTES.LOGIN}>Sign in</Link>
            </Button>
            <Button asChild size="sm" className="rounded-xl">
              <Link to={ROUTES.LOGIN}>
                Get started
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-4 py-1.5 text-xs font-medium text-violet-300">
                <Sparkles className="size-3.5" aria-hidden />
                Premium work management
              </div>
              <div className="space-y-5">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl md:leading-[1.08]">
                  <span className="gradient-text">Plan projects.</span>
                  <br />
                  Ship work. Stay aligned.
                </h1>
                <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                  Taskboard brings projects, assignments, and delivery visibility
                  into one beautiful workspace—built for teams that move fast.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-xl px-6">
                  <Link to={ROUTES.LOGIN}>
                    Sign in to your account
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl">
                  <a href="#features">See how it works</a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-8 rounded-full bg-brand-primary/20 blur-3xl"
                aria-hidden
              />
              <img
                src={heroImage}
                alt="Taskboard dashboard"
                className="relative w-full rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/10"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-white/5 bg-muted/20 py-20 scroll-mt-8"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Everything you need to run delivery
              </h2>
              <p className="mt-3 text-muted-foreground">
                A focused toolkit for modern product and engineering teams.
              </p>
            </div>
            <ul className="mt-14 grid gap-6 md:grid-cols-3">
              {FEATURES.map((feature) => (
                <li
                  key={feature.title}
                  className="glass-card p-6 transition-all duration-300 hover:glow-primary"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary/25 to-brand-secondary/10 text-brand-primary">
                    <feature.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-10">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Taskboard. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

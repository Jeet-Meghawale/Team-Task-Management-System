import { cn } from "@/lib/utils"

export function MainContent({ children, className }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn("flex-1 overflow-y-auto outline-none", className)}
    >
      <div className="mx-auto w-full max-w-[90rem] px-4 py-6 pb-12 md:px-8 md:py-8">
        {children}
      </div>
    </main>
  )
}

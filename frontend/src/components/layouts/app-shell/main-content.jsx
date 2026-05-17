import { cn } from "@/lib/utils"

export function MainContent({ children, className }) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={cn(
        "flex-1 overflow-y-auto bg-background outline-none",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 pb-10 md:px-6 md:py-8">
        {children}
      </div>
    </main>
  )
}

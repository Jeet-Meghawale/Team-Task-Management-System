import { cn } from "@/lib/utils"

export function MainContent({ children, className }) {
  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto bg-background",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 md:py-8">
        {children}
      </div>
    </main>
  )
}

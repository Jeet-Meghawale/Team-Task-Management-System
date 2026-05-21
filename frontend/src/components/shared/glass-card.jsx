import { cn } from "@/lib/utils"

export function GlassCard({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "glass-card transition-all duration-300 hover:border-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

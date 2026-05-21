import { cn } from "@/lib/utils"

export const nativeSelectClassName = cn(
  "h-10 w-full rounded-2xl border border-white/10 bg-muted/30 px-3.5 text-sm text-foreground",
  "transition-all duration-200 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/25 outline-none",
  "disabled:pointer-events-none disabled:opacity-50",
)

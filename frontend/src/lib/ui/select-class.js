import { cn } from "@/lib/utils"

export const nativeSelectClassName = cn(
  "h-9 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none",
  "disabled:pointer-events-none disabled:opacity-50 dark:border-input dark:bg-input/40",
)

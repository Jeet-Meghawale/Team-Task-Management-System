import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  ...props
}) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "h-9 w-full rounded-2xl border border-white/5 bg-muted/40 py-2 pr-3 pl-9 text-sm text-foreground",
          "placeholder:text-muted-foreground transition-all duration-200",
          "focus:border-primary/50 focus:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
        )}
        {...props}
      />
    </div>
  )
}

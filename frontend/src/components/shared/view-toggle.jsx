import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ViewToggle({ value, onChange, options, className }) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className={cn(
        "inline-flex rounded-2xl border border-white/5 bg-muted/40 p-1",
        className,
      )}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={value === option.value ? "default" : "ghost"}
          className={cn(
            "h-8 gap-1.5 rounded-xl px-3",
            value !== option.value && "text-muted-foreground",
          )}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.icon ? <option.icon className="size-3.5" aria-hidden /> : null}
          {option.label}
        </Button>
      ))}
    </div>
  )
}

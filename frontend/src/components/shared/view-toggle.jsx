import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ViewToggle({ value, onChange, options, className }) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className={cn("inline-flex rounded-lg border border-border bg-muted/30 p-0.5", className)}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          type="button"
          size="sm"
          variant={value === option.value ? "secondary" : "ghost"}
          className="h-7 gap-1.5 px-2.5"
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

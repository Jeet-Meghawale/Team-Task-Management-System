import { nativeSelectClassName } from "@/lib/ui/select-class"
import { cn } from "@/lib/utils"

export function NativeSelect({ className, ...props }) {
  return (
    <select className={cn(nativeSelectClassName, className)} {...props} />
  )
}

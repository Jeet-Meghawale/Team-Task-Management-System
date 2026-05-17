import { forwardRef } from "react"
import { USER_ROLES } from "@/lib/auth/roles"
import { cn } from "@/lib/utils"

const ROLE_OPTIONS = [
  { value: USER_ROLES.DEVELOPER, label: "Developer" },
  { value: USER_ROLES.MANAGER, label: "Manager" },
  { value: USER_ROLES.ADMIN, label: "Admin" },
]

export const RoleSelect = forwardRef(function RoleSelect(
  { className, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      data-slot="role-select"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        className,
      )}
      {...props}
    >
      {ROLE_OPTIONS.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
})

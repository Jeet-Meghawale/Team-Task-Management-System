import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ROUTES } from "@/lib/constants/routes"
import { USER_ROLES } from "@/lib/auth/roles"
import { registerRequest } from "@/services/auth.service"
import { registerSchema } from "@/features/auth/schemas/register.schema"
import { applyAuthApiError } from "@/features/auth/lib/map-auth-error"
import { AuthFormCard } from "@/features/auth/components/auth-form-card"
import { RoleSelect } from "@/features/auth/components/role-select"

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: USER_ROLES.DEVELOPER,
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values) {
    form.clearErrors("root")

    const body = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      ...(values.role ? { role: values.role } : {}),
    }

    try {
      await registerRequest(body)
      toast.success("User created successfully")
      form.reset({
        name: "",
        email: "",
        password: "",
        role: USER_ROLES.DEVELOPER,
      })
    } catch (error) {
      applyAuthApiError(form, error, [
        { pattern: /name/i, field: "name" },
        { pattern: /email/i, field: "email" },
        { pattern: /password/i, field: "password" },
        { pattern: /role/i, field: "role" },
        { pattern: /already exists/i, field: "email" },
      ])
    }
  }

  const rootError = form.formState.errors.root?.message

  return (
    <AuthFormCard
      title="Create user"
      description="Add a new user to your organization. Admin access required."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="name"
                    placeholder="Alex Johnson"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormDescription>Minimum 6 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RoleSelect
                    disabled={isSubmitting}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {rootError ? (
            <p className="text-sm text-destructive" role="alert">
              {rootError}
            </p>
          ) : null}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" aria-hidden />
                Creating user...
              </>
            ) : (
              "Create user"
            )}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        <Link
          className="underline-offset-4 hover:underline"
          to={ROUTES.DASHBOARD}
        >
          Back to dashboard
        </Link>
      </p>
    </AuthFormCard>
  )
}

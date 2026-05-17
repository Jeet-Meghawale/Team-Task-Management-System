import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ROUTES } from "@/lib/constants/routes"
import { useAuth } from "@/lib/auth/use-auth"
import { loginRequest } from "@/services/auth.service"
import { loginSchema } from "@/features/auth/schemas/login.schema"
import { applyAuthApiError } from "@/features/auth/lib/map-auth-error"
import { AuthFormCard } from "@/features/auth/components/auth-form-card"

export function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const redirectTo =
    location.state?.from?.pathname &&
    typeof location.state.from.pathname === "string"
      ? location.state.from.pathname
      : ROUTES.DASHBOARD

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values) {
    form.clearErrors("root")

    try {
      const payload = await loginRequest(values)
      await login(payload)
      toast.success("Signed in successfully")
      navigate(redirectTo, { replace: true })
    } catch (error) {
      applyAuthApiError(form, error, [
        { pattern: /email/i, field: "email" },
        { pattern: /password/i, field: "password" },
      ])
    }
  }

  const rootError = form.formState.errors.root?.message

  return (
    <AuthFormCard
      title="Sign in"
      description="Enter your workspace email and password to continue."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    placeholder="you@company.com"
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
                    autoComplete="current-password"
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    {...field}
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
                Signing in...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        <Link className="underline-offset-4 hover:underline" to={ROUTES.HOME}>
          Back to home
        </Link>
      </p>
    </AuthFormCard>
  )
}

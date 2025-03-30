"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  loginFormDefinition,
  LoginFormType,
} from "@/lib/definitions/auth/login-form-definition";
import { authService } from "@/services/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [showError, setShowError] = useState<boolean>();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormDefinition.loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: LoginFormType) => {
    setShowError(false);
    authService
      .logIn(values)
      .then(() => router.push("/home"))
      .catch(() => setShowError(true));
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-5">
            {showError && (
              <Alert variant="destructive" className="flex justify-center">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Invalid credentials. Please try again.
                </AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="m@example.com"
                              {...field}
                            ></Input>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" {...field}></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?
                    <a href="#" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

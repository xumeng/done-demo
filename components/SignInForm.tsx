"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signin } from "@/app/services/users";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInFormValues, signinFormSchema } from "@/app/data/SignFormData";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";

export function SignInForm({ message }: { message: string }) {
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<SignInFormValues> = {};
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: SignInFormValues) {
    setLoading(true);
    await signin(data).then((message) => {
      if (message) {
        toast({ title: message });
      } else {
        toast({ title: "Sign In Successful!" });
      }
    });
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
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
                        required
                        placeholder="Enter min 6 char password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                {loading ? "Signing In" : "Sign In"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

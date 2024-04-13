"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signup } from "@/app/services/users";
import {
  GENDER_DATA,
  POSITION_DATA,
  SignUpFormValues,
  ROLE_DATA,
  signupFormSchema,
} from "@/app/data/SignFormData";
import { useState } from "react";

const defaultValues: Partial<SignUpFormValues> = {};

export function SignUpForm({ message }: { message: string }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: SignUpFormValues) {
    setLoading(true);
    await signup(data).then((message) => {
      if (message) {
        toast({ title: message });
      } else {
        toast({ title: "Sign Up Successful!" });
      }
    });
    setLoading(false);
  }

  const position_items = Object.keys(POSITION_DATA).map((key) => (
    <SelectItem key={key} value={key}>
      {POSITION_DATA[Number(key)]}
    </SelectItem>
  ));
  const role_items = Object.keys(ROLE_DATA).map((key) => (
    <SelectItem key={key} value={key}>
      {ROLE_DATA[Number(key)]}
    </SelectItem>
  ));
  const gender_items = Object.keys(GENDER_DATA).map((key) => (
    <SelectItem key={key} value={key}>
      {GENDER_DATA[Number(key)]}
    </SelectItem>
  ));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-4"
      >
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Create a new account</CardTitle>
            <CardDescription>It's quick and easy.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormDescription>
                      You can manage verified email addresses in your email
                      settings.
                    </FormDescription>
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name. It can be your real name
                      or a pseudonym.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{position_items}</SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
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
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{role_items}</SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{gender_items}</SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div></div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing Up" : "Sign Up"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SignInFormValues, SignUpFormValues } from "@/app/data/SignFormData";

export async function signin(formData: SignInFormValues) {
  const email = formData.email;
  const password = formData.password;

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return "Could not authenticate user, " + error.message;
  }
  return redirect("/");
}

export async function signup(formData: SignUpFormValues) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        email: formData.email,
        name: formData.name,
        position: Number(formData.position),
        role: Number(formData.role),
        age: Number(formData.age),
        gender: Number(formData.gender),
      },
    },
  });
  if (!data || !data.user || error) {
    return "Could not registration user, " + error?.message;
  }
  revalidatePath("/", "layout");
  redirect("/");
}

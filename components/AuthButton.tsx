import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut().then(() => {
      return redirect("/signin");
    });
  };

  return user ? (
    <div className="flex items-center gap-4">
      <Label>Hi, {user.user_metadata.name}</Label>
      <form action={signOut}>
        <Button variant="secondary">Logout</Button>
      </form>
    </div>
  ) : (
    <Link
      href="/signin"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}

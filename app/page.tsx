import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

import { UserList } from "@/components/UserList";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/signin");
  }
  const getUsers = async () => {
    const { data: users, error } = await supabase.from("user_infos").select();
    if (error) {
      return [];
    }
    return users;
  };

  const users = await getUsers();

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <Label className="text-xl flex gap-4 m-4">LOGO</Label>
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex-1 flex flex-col w-full px-3">
        <UserList data={users} />
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Next.js{"  "}
          </a>
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            shadcn/ui{"  "}
          </a>
          <a
            href="https://supabase.com/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}

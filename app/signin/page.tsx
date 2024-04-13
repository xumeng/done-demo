import Link from "next/link";
import { SignInForm } from "@/components/SignInForm";

export default function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <SignInForm message={searchParams.message} />
    </div>
  );
}

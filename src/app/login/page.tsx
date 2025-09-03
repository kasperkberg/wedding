import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth";

export default async function LoginPage() {
  // Check if user is already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/");
  }

  return <LoginForm />;
}

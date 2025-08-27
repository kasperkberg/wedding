import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { isAdmin } from "../../../lib/role-utils";
import { redirect } from "next/navigation";
import { BetterAuthUser } from "../../../lib/auth-types";
import { AdminNav } from "./AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || !isAdmin(session.user.role as "guest" | "admin")) {
    redirect("/login");
  }

  // Convert to BetterAuthUser type, handling the image field properly
  const user: BetterAuthUser = {
    ...session.user,
    image: session.user.image ?? null, // Convert undefined to null
    role: session.user.role as "guest" | "admin",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto py-8">
        <AdminNav user={user} />

        {/* Page Content */}
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}

import { auth } from "../../../lib/auth";
import { headers } from "next/headers";
import { isAdmin } from "../../../lib/role-utils";
import { redirect } from "next/navigation";
import { BetterAuthUser } from "../../../lib/auth-types";
import { AdminNav } from "./AdminNav";

// Safe headers utility function
async function getSafeHeaders() {
  try {
    return await headers();
  } catch (error) {
    console.error("Headers error:", error);
    // Return empty headers object if headers() fails
    return new Headers();
  }
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session = null;

  try {
    const requestHeaders = await getSafeHeaders();
    session = await auth.api.getSession({
      headers: requestHeaders,
    });
  } catch (error) {
    console.error("Admin session error:", error);
    redirect("/login");
  }

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

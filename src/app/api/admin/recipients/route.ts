import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { isAdmin } from "lib/role-utils";
import { auth } from "lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import type { UserRole } from "lib/auth-types";

async function getSafeHeaders() {
  try {
    return await headers();
  } catch {
    return new Headers();
  }
}

export async function GET() {
  try {
    const requestHeaders = await getSafeHeaders();
    const session = await auth.api.getSession({ headers: requestHeaders });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    if (!isAdmin(session.user.role as UserRole)) {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    const rows = await db
      .select({ email: user.email, name: user.name })
      .from(user);

    return NextResponse.json({ success: true, data: rows });
  } catch (e) {
    console.error("Recipients fetch error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to fetch recipients" },
      { status: 500 }
    );
  }
}

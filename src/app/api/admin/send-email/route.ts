import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { isAdmin } from "lib/role-utils";
import { auth } from "lib/auth";
import { sendAdminBroadcast } from "lib/email-service";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import type { UserRole } from "lib/auth-types";

async function getSafeHeaders() {
  try {
    return await headers();
  } catch (e) {
    return new Headers();
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { to, subject, text } = body as {
      to: "all" | string[];
      subject: string;
      text: string;
    };

    if (!subject || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "subject and text are required" },
        { status: 400 }
      );
    }

    let emails: string[];
    if (to === "all") {
      const rows = await db.select({ email: user.email }).from(user);
      emails = rows.map((r) => r.email).filter(Boolean);
    } else if (Array.isArray(to) && to.length > 0) {
      emails = to.filter((e): e is string => typeof e === "string");
    } else {
      return NextResponse.json(
        { success: false, error: "to must be 'all' or a non-empty array" },
        { status: 400 }
      );
    }

    if (emails.length === 0) {
      return NextResponse.json(
        { success: false, error: "No recipients" },
        { status: 400 }
      );
    }

    const result = await sendAdminBroadcast({ to: emails, subject, text });

    if (!result.success) {
      const errMsg =
        typeof result.error === "string"
          ? result.error
          : (result.error as Error)?.message || "Send fejlede";
      return NextResponse.json(
        { success: false, error: errMsg },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (e) {
    console.error("Send email error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}

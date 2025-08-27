import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { isAdmin } from "../../../../../lib/role-utils";
import { db } from "../../../../lib/db";
import { user } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../../../../../lib/auth";
import { UserRole } from "../../../../../lib/auth-types";

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

export async function PUT(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const requestHeaders = await getSafeHeaders();
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

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

    // Get request body
    const body = await request.json();
    const { userId, newRole } = body;

    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, error: "userId and newRole are required" },
        { status: 400 }
      );
    }

    if (!["guest", "admin"].includes(newRole)) {
      return NextResponse.json(
        { success: false, error: "Invalid role. Must be 'guest' or 'admin'" },
        { status: 400 }
      );
    }

    // Update user role
    const updatedUser = await db
      .update(user)
      .set({
        role: newRole,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedUser[0],
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update user role",
      },
      { status: 500 }
    );
  }
}

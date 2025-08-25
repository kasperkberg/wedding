import { NextResponse } from "next/server";
import { getAllRsvpsWithGuests } from "@/lib/db/queries";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { user } from "../../../../../auth-schema";

export async function GET() {
  try {
    const rsvps = await getAllRsvpsWithGuests();

    // Get user information for each RSVP
    const rsvpsWithUserInfo = await Promise.all(
      rsvps.map(async (rsvpItem) => {
        try {
          const userInfo = await db
            .select({
              name: user.name,
              email: user.email,
            })
            .from(user)
            .where(eq(user.id, rsvpItem.userId))
            .limit(1);

          return {
            ...rsvpItem,
            user: userInfo[0] || undefined,
          };
        } catch (error) {
          console.error(`Error fetching user info for ${rsvpItem.userId}:`, error);
          return {
            ...rsvpItem,
            user: undefined,
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      data: rsvpsWithUserInfo,
    });
  } catch (error) {
    console.error("Error fetching all RSVPs:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch RSVPs",
      },
      { status: 500 }
    );
  }
}

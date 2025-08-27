import { NextResponse } from "next/server";
import { getUserRsvp, createOrUpdateRsvp } from "@/lib/db/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 }
      );
    }

    const rsvp = await getUserRsvp(userId);

    return NextResponse.json({
      success: true,
      data: rsvp[0] || null,
    });
  } catch (error) {
    console.error("Error fetching RSVP:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch RSVP",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, attending, allergies, foodPreferences, message } = body;

    if (!userId || typeof attending !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "User ID and attending status are required",
        },
        { status: 400 }
      );
    }

    const rsvpData = {
      userId,
      attending,
      allergies,
      foodPreferences,
      message,
    };

    const result = await createOrUpdateRsvp(rsvpData);

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error creating/updating RSVP:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create/update RSVP",
      },
      { status: 500 }
    );
  }
}

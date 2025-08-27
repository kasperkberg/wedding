import { NextResponse } from "next/server";
import { getAdditionalGuests, addAdditionalGuest, updateAdditionalGuest, deleteAdditionalGuest } from "@/lib/db/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rsvpId = searchParams.get("rsvpId");

    if (!rsvpId) {
      return NextResponse.json(
        {
          success: false,
          error: "RSVP ID is required",
        },
        { status: 400 }
      );
    }

    const guests = await getAdditionalGuests(parseInt(rsvpId));

    return NextResponse.json({
      success: true,
      data: guests,
    });
  } catch (error) {
    console.error("Error fetching additional guests:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch additional guests",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rsvpId, name, attending, allergies, foodPreferences } = body;

    if (!rsvpId || !name || typeof attending !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "RSVP ID, name, and attending status are required",
        },
        { status: 400 }
      );
    }

    const guestData = {
      rsvpId: parseInt(rsvpId),
      name,
      attending,
      allergies,
      foodPreferences,
    };

    const result = await addAdditionalGuest(guestData);

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error adding additional guest:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to add additional guest",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, attending, allergies, foodPreferences } = body;

    if (!id || !name || typeof attending !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          error: "ID, name, and attending status are required",
        },
        { status: 400 }
      );
    }

    const guestData = {
      name,
      attending,
      allergies,
      foodPreferences,
    };

    const result = await updateAdditionalGuest(parseInt(id), guestData);

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error updating additional guest:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update additional guest",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "ID is required",
        },
        { status: 400 }
      );
    }

    await deleteAdditionalGuest(parseInt(id));

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting additional guest:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete additional guest",
      },
      { status: 500 }
    );
  }
}

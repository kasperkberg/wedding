import { NextResponse } from "next/server";
import { getWeddingEvent, createOrUpdateWeddingEvent } from "@/lib/db/queries";

export async function GET() {
  try {
    const event = await getWeddingEvent();

    return NextResponse.json({
      success: true,
      data: event[0] || null,
    });
  } catch (error) {
    console.error("Error fetching wedding event:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch wedding event",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      date,
      time,
      location,
      locationDetails,
      program,
      wishes,
      additionalInfo,
    } = body;

    if (!title || !date || !location) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, date, and location are required",
        },
        { status: 400 }
      );
    }

    const eventData = {
      title,
      date: new Date(date),
      time,
      location,
      locationDetails,
      program,
      wishes,
      additionalInfo,
    };

    const result = await createOrUpdateWeddingEvent(eventData);

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error("Error creating/updating wedding event:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create/update wedding event",
      },
      { status: 500 }
    );
  }
}

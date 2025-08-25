import { NextResponse } from "next/server";
import { getAllThings, createThing } from "@/lib/db/queries";

export async function GET() {
  try {
    const things = await getAllThings();

    return NextResponse.json({
      success: true,
      data: things,
    });
  } catch (error) {
    console.error("Error fetching things:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch things",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required and must be a non-empty string",
        },
        { status: 400 }
      );
    }

    const newThing = await createThing(title.trim());

    return NextResponse.json({
      success: true,
      data: newThing,
    });
  } catch (error) {
    console.error("Error creating thing:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create thing",
      },
      { status: 500 }
    );
  }
}

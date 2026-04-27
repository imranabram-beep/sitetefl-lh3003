import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// POST update settings
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { sendgridKey, senderEmail } = body;

    if (!sendgridKey || !senderEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Save settings to database or environment
    // For now, just validate and return success

    return NextResponse.json({
      success: true,
      message: "Settings saved successfully",
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}

// GET current settings
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // TODO: Get settings from database
  const settings = {
    senderEmail: process.env.SENDGRID_FROM_EMAIL || "",
    sendgridConfigured: !!process.env.SENDGRID_API_KEY,
  };

  return NextResponse.json(settings);
}

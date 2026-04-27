import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    course?: string;
    market?: string;
    paymentMethod?: string;
  };

  if (!body.fullName || !body.email || !body.course) {
    return NextResponse.json({ success: false, message: "Missing required fields.", reference: "N/A" }, { status: 400 });
  }

  const reference = `SEA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  return NextResponse.json({
    success: true,
    message: `Enrollment captured for ${body.market} via ${body.paymentMethod}.`,
    reference
  });
}

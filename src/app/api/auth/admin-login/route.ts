import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (body.email === "admin@seatefl.com" && body.password === "Admin123!") {
    return NextResponse.json({ success: true, message: "Admin login successful.", redirectTo: "/admin" });
  }

  return NextResponse.json({ success: false, message: "Invalid demo admin credentials." }, { status: 401 });
}

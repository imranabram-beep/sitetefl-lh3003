import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (
    body.email === "imran.abram@gmail.com" &&
    body.password === "Mimichim123!"
  ) {
    return NextResponse.json({
      success: true,
      message: "Student login successful.",
      redirectTo: "/courses",
      user: {
        role: "student",
        email: body.email,
      },
    });
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid demo student credentials.",
    },
    { status: 401 }
  );
}
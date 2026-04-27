import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;

    const { data: school, error } = await supabase
      .from("sb_schools")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !school) {
      return NextResponse.json(
        { error: "School not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      school: {
        id: school.id,
        name: school.name,
        type: school.type,
        email: school.email,
        phone: school.phone,
        website: school.website,
        verified: school.verified,
        leadScore: school.lead_score,
        location: school.location,
        createdAt: school.created_at,
      },
    });
  } catch (error: any) {
    console.error("Error fetching school:", error);
    return NextResponse.json(
      { error: "Failed to fetch school" },
      { status: 500 }
    );
  }
}

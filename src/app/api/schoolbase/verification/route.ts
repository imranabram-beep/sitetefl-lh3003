import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "pending";

    if (status === "pending") {
      // Get schools without verification records
      const { data: schools, error } = await supabase
        .from("sb_schools")
        .select(`
          id,
          name,
          email,
          phone,
          website,
          notes,
          location:sb_locations(name)
        `)
        .is("verification", null)
        .limit(50);

      if (error) {
        console.error("Database error:", error);
        return NextResponse.json(
          { error: "Failed to fetch unverified schools" },
          { status: 500 }
        );
      }

      const unverified = (schools || []).map((school: any) => ({
        id: school.id,
        name: school.name,
        email: school.email,
        phone: school.phone,
        website: school.website,
        location: school.location?.name,
        notes: school.notes,
      }));

      return NextResponse.json({ unverified });
    } else {
      // Get verified schools
      const { data: verifications, error } = await supabase
        .from("sb_verification")
        .select(`
          id,
          school_id,
          email_status,
          phone_status,
          website_status,
          last_checked_at,
          school:sb_schools(name)
        `)
        .order("last_checked_at", { ascending: false })
        .limit(50);

      if (error) {
        console.error("Database error:", error);
        return NextResponse.json(
          { error: "Failed to fetch verified schools" },
          { status: 500 }
        );
      }

      const verified = (verifications || []).map((v: any) => ({
        id: v.id,
        schoolId: v.school_id,
        schoolName: v.school?.name || "Unknown",
        emailStatus: v.email_status,
        phoneStatus: v.phone_status,
        websiteStatus: v.website_status,
        lastCheckedAt: v.last_checked_at,
      }));

      return NextResponse.json({ verified });
    }
  } catch (error: any) {
    console.error("Error fetching verification data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

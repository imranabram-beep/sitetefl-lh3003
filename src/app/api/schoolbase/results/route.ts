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
    const type = searchParams.get("type") || "all";
    const sort = searchParams.get("sort") || "leadScore";

    // Build query
    let query = supabase
      .from("sb_schools")
      .select(`
        id,
        name,
        type,
        email,
        phone,
        website,
        verified,
        lead_score,
        created_at,
        location:sb_locations(
          name
        )
      `);

    // Filter by type if specified
    if (type !== "all") {
      query = query.eq("type", type);
    }

    // Apply sorting
    let orderBy: any = "lead_score";
    let ascending = false;

    if (sort === "name") {
      orderBy = "name";
      ascending = true;
    } else if (sort === "newest") {
      orderBy = "created_at";
      ascending = false;
    }

    query = query.order(orderBy, { ascending });
    query = query.limit(100);

    const { data, error } = await query;

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch results" },
        { status: 500 }
      );
    }

    // Format results
    const results = (data || []).map((school: any) => ({
      id: school.id,
      name: school.name,
      type: school.type,
      email: school.email,
      phone: school.phone,
      website: school.website,
      location: school.location?.name || "Unknown",
      verified: school.verified,
      leadScore: school.lead_score || 0,
      createdAt: school.created_at,
    }));

    return NextResponse.json({
      results,
      count: results.length,
    });
  } catch (error: any) {
    console.error("Error fetching results:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

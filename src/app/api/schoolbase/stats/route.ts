import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get all stats from SchoolBase tables
    const [schoolsRes, campaignsRes] = await Promise.all([
      supabase.from("sb_schools").select("id, email, phone"),
      supabase.from("sb_campaigns").select("id, status"),
    ]);

    const schools = schoolsRes.data || [];
    const campaigns = campaignsRes.data || [];

    const emailsFound = schools.filter((s: any) => s.email).length;
    const phonesFound = schools.filter((s: any) => s.phone).length;
    const activeCampaigns = campaigns.filter((c: any) => c.status === "active").length;

    return NextResponse.json({
      totalSchools: schools.length,
      verified: Math.floor(schools.length * 0.3), // Placeholder: 30% verified
      emailsFound,
      phonesFound,
      locationsIndexed: 0,
      activeCampaigns,
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        totalSchools: 0,
        verified: 0,
        emailsFound: 0,
        phonesFound: 0,
        locationsIndexed: 0,
        activeCampaigns: 0,
      },
      { status: 200 }
    );
  }
}

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Mock data - temporary fallback while debugging Supabase connection
const mockSchools = [
  {
    id: "1",
    name: "Bangkok International School",
    type: "school",
    location: "Bangkok",
    email: "admissions@bkk.ac.th",
    phone: "+66-2-963-5800",
    verified: true,
    lead_score: 92,
  },
  {
    id: "2",
    name: "Harrow International School Bangkok",
    type: "academy",
    location: "Bangkok",
    email: "info@harrowbangkok.ac.th",
    phone: "+66-2-300-5000",
    verified: true,
    lead_score: 88,
  },
  {
    id: "3",
    name: "Chiang Mai International School",
    type: "school",
    location: "Chiang Mai",
    email: "office@cmis.ac.th",
    phone: "+66-53-210-009",
    verified: true,
    lead_score: 85,
  },
  {
    id: "4",
    name: "Phuket International School",
    type: "school",
    location: "Phuket",
    email: "admin@phuketis.ac.th",
    phone: "+66-76-340-300",
    verified: true,
    lead_score: 82,
  },
  {
    id: "5",
    name: "NIST International School",
    type: "academy",
    location: "Bangkok",
    email: "admissions@nist.ac.th",
    phone: "+66-2-949-5000",
    verified: true,
    lead_score: 90,
  },
  {
    id: "6",
    name: "Bangkok Prep International School",
    type: "school",
    location: "Bangkok",
    email: "info@bangkokprep.ac.th",
    phone: "+66-2-318-8444",
    verified: true,
    lead_score: 87,
  },
  {
    id: "7",
    name: "Chulalongkorn University",
    type: "university",
    location: "Bangkok",
    email: "admissions@chula.ac.th",
    phone: "+66-2-218-2999",
    verified: true,
    lead_score: 95,
  },
  {
    id: "8",
    name: "Thammasat University",
    type: "university",
    location: "Bangkok",
    email: "admission@tu.ac.th",
    phone: "+66-2-986-9999",
    verified: true,
    lead_score: 93,
  },
];

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get("country") || "";
    const city = searchParams.get("city") || "";
    const region = searchParams.get("region") || "";
    const schoolType = searchParams.get("type") || "all";
    const radius = parseInt(searchParams.get("radius") || "50");

    // Try to use real Supabase data first
    try {
      let query = supabase
        .from("sb_schools")
        .select(`
          id,
          name,
          type,
          email,
          phone,
          verified,
          lead_score,
          location:sb_locations(
            name
          )
        `);

      // Apply filters only if provided
      if (city && city.trim()) {
        query = query.ilike("name", `%${city}%`);
      }

      if (schoolType && schoolType !== "all") {
        query = query.eq("type", schoolType);
      }

      const { data, error } = await query.limit(100);

      if (!error && data) {
        const results = (data || []).map((school: any) => ({
          id: school.id,
          name: school.name,
          type: school.type,
          location: school.location?.name || "Unknown",
          email: school.email,
          phone: school.phone,
          verified: school.verified,
          leadScore: school.lead_score || 0,
        }));

        return NextResponse.json({
          results,
          count: results.length,
        });
      }
    } catch (supabaseError) {
      console.error("Supabase error, falling back to mock data:", supabaseError);
    }

    // Fallback to mock data
    let filteredResults = [...mockSchools];

    if (city && city.trim()) {
      const searchTerm = city.toLowerCase();
      filteredResults = filteredResults.filter(
        (school) =>
          school.name.toLowerCase().includes(searchTerm) ||
          school.location.toLowerCase().includes(searchTerm)
      );
    }

    if (schoolType && schoolType !== "all") {
      filteredResults = filteredResults.filter((school) => school.type === schoolType);
    }

    const results = filteredResults.map((school) => ({
      id: school.id,
      name: school.name,
      type: school.type,
      location: school.location,
      email: school.email,
      phone: school.phone,
      verified: school.verified,
      leadScore: school.lead_score,
    }));

    return NextResponse.json({
      results,
      count: results.length,
    });
  } catch (error: any) {
    console.error("Error searching schools:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

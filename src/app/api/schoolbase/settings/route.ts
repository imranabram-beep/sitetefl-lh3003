import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data: settings, error } = await supabase
      .from("sb_settings")
      .select("*")
      .limit(1)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows returned
      throw error;
    }

    // Return default settings if none exist
    const defaultSettings = {
      id: "default",
      geonamesUsername: "",
      enableOverpassAPI: true,
      overpassAPIUrl: "https://overpass-api.de/api/interpreter",
      maxSearchRadius: 50,
      emailVerificationService: "smtp",
      enableWebScraping: true,
      scrapingRateLimit: 0.5,
      verificationBatchSize: 50,
    };

    return NextResponse.json({
      settings: settings || defaultSettings,
    });
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Get or create settings record
    const { data: existing } = await supabase
      .from("sb_settings")
      .select("id")
      .limit(1)
      .single();

    let result;

    if (existing) {
      // Update existing
      result = await supabase
        .from("sb_settings")
        .update({
          geonames_username: body.geonamesUsername,
          enable_overpass_api: body.enableOverpassAPI,
          overpass_api_url: body.overpassAPIUrl,
          max_search_radius: body.maxSearchRadius,
          email_verification_service: body.emailVerificationService,
          enable_web_scraping: body.enableWebScraping,
          scraping_rate_limit: body.scrapingRateLimit,
          verification_batch_size: body.verificationBatchSize,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
        .select()
        .single();
    } else {
      // Create new
      result = await supabase
        .from("sb_settings")
        .insert({
          geonames_username: body.geonamesUsername,
          enable_overpass_api: body.enableOverpassAPI,
          overpass_api_url: body.overpassAPIUrl,
          max_search_radius: body.maxSearchRadius,
          email_verification_service: body.emailVerificationService,
          enable_web_scraping: body.enableWebScraping,
          scraping_rate_limit: body.scrapingRateLimit,
          verification_batch_size: body.verificationBatchSize,
        })
        .select()
        .single();
    }

    if (result.error) {
      throw result.error;
    }

    return NextResponse.json({
      settings: result.data,
      message: "Settings saved successfully",
    });
  } catch (error: any) {
    console.error("Error saving settings:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}

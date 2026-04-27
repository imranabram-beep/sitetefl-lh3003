import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all campaigns
export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("email_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaigns", details: error.message },
      { status: 500 }
    );
  }
}

// POST create a new campaign
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, subject, template_id, recipient_type, scheduled_at } = body;

    // Validate required fields
    if (!name || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: name, subject" },
        { status: 400 }
      );
    }

    // Get user ID from Clerk
    const createdBy = userId;

    // Save to Supabase
    const { data, error } = await supabase
      .from("email_campaigns")
      .insert([
        {
          name,
          subject,
          template_id: template_id || null,
          status: scheduled_at ? "scheduled" : "draft",
          scheduled_at: scheduled_at || null,
          recipient_count: 0,
          sent_count: 0,
          opened_count: 0,
          clicked_count: 0,
          bounced_count: 0,
          created_by: createdBy,
          body: subject,
          html_body: `<p>${subject}</p>`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Campaign created successfully",
      campaign: data?.[0],
      campaignId: data?.[0]?.id,
    });
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign", details: error.message },
      { status: 500 }
    );
  }
}

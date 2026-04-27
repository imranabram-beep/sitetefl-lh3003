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
    const status = searchParams.get("status") || "all";

    let query = supabase
      .from("sb_campaigns")
      .select(`
        id,
        name,
        subject,
        status,
        emails_sent,
        emails_opened,
        emails_clicked,
        emails_bounced,
        created_at,
        scheduled_at,
        sent_at
      `);

    if (status !== "all") {
      query = query.eq("status", status);
    }

    query = query.order("created_at", { ascending: false }).limit(100);

    const { data, error } = await query;

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch campaigns" },
        { status: 500 }
      );
    }

    const campaigns = (data || []).map((campaign: any) => ({
      id: campaign.id,
      name: campaign.name,
      subject: campaign.subject,
      status: campaign.status,
      emailsSent: campaign.emails_sent,
      emailsOpened: campaign.emails_opened,
      emailsClicked: campaign.emails_clicked,
      emailsBounced: campaign.emails_bounced,
      createdAt: campaign.created_at,
      scheduledAt: campaign.scheduled_at,
      sentAt: campaign.sent_at,
    }));

    return NextResponse.json({
      campaigns,
      count: campaigns.length,
    });
  } catch (error: any) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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
    const { name, subject, body: emailBody, schoolIds } = body;

    // Create campaign
    const { data: campaign, error: campaignError } = await supabase
      .from("sb_campaigns")
      .insert({
        name,
        subject,
        body: emailBody,
        status: "draft",
      })
      .select()
      .single();

    if (campaignError) {
      console.error("Error creating campaign:", campaignError);
      return NextResponse.json(
        { error: "Failed to create campaign" },
        { status: 500 }
      );
    }

    // Add recipients if provided
    if (schoolIds && schoolIds.length > 0) {
      const recipients = schoolIds.map((schoolId: string) => ({
        campaign_id: campaign.id,
        school_id: schoolId,
        status: "pending",
      }));

      const { error: recipientError } = await supabase
        .from("sb_campaign_recipients")
        .insert(recipients);

      if (recipientError) {
        console.error("Error adding recipients:", recipientError);
      }
    }

    return NextResponse.json({
      campaign: {
        id: campaign.id,
        name: campaign.name,
        subject: campaign.subject,
        status: campaign.status,
      },
    });
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

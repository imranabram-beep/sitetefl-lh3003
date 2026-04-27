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

    const { data: campaign, error } = await supabase
      .from("sb_campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      campaign: {
        id: campaign.id,
        name: campaign.name,
        subject: campaign.subject,
        body: campaign.body,
        status: campaign.status,
        emailsSent: campaign.emails_sent,
        emailsOpened: campaign.emails_opened,
        emailsClicked: campaign.emails_clicked,
        emailsBounced: campaign.emails_bounced,
        createdAt: campaign.created_at,
        scheduledAt: campaign.scheduled_at,
        sentAt: campaign.sent_at,
      },
    });
  } catch (error: any) {
    console.error("Error fetching campaign:", error);
    return NextResponse.json(
      { error: "Failed to fetch campaign" },
      { status: 500 }
    );
  }
}

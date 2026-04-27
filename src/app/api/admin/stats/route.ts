import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET dashboard stats from database
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get total contacts
    const { count: totalContacts } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true });

    // Get total campaigns
    const { count: totalCampaigns } = await supabase
      .from("email_campaigns")
      .select("*", { count: "exact", head: true });

    // Get sent emails
    const { data: sentData } = await supabase
      .from("email_campaigns")
      .select("sent_count");
    const sentEmails = sentData?.reduce((sum, campaign) => sum + (campaign.sent_count || 0), 0) || 0;

    // Get active campaigns (status = 'sending')
    const { count: activeCampaigns } = await supabase
      .from("email_campaigns")
      .select("*", { count: "exact", head: true })
      .eq("status", "sending");

    // Calculate open rate
    const { data: campaignStats } = await supabase
      .from("email_campaigns")
      .select("sent_count, opened_count");

    let openRate = 0;
    if (sentEmails > 0) {
      const totalOpened = campaignStats?.reduce((sum, c) => sum + (c.opened_count || 0), 0) || 0;
      openRate = Math.round((totalOpened / sentEmails) * 100) || 0;
    }

    const stats = {
      totalContacts: totalContacts || 0,
      totalCampaigns: totalCampaigns || 0,
      sentEmails,
      openRate,
      activeCampaigns: activeCampaigns || 0,
    };

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        totalContacts: 0,
        totalCampaigns: 0,
        sentEmails: 0,
        openRate: 0,
        activeCampaigns: 0,
      },
      { status: 200 } // Return zeros instead of error
    );
  }
}

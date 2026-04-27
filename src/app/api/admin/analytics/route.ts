import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET analytics data
export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get all campaigns for analytics
    const { data: campaigns, count: totalCampaigns } = await supabase
      .from("email_campaigns")
      .select("*", { count: "exact" });

    let totalEmailsSent = 0;
    let totalOpened = 0;
    let totalClicked = 0;
    let totalBounces = 0;
    let averageOpenRate = 0;
    let averageClickRate = 0;

    if (campaigns && campaigns.length > 0) {
      // Calculate totals
      totalEmailsSent = campaigns.reduce((sum, c) => sum + (c.sent_count || 0), 0);
      totalOpened = campaigns.reduce((sum, c) => sum + (c.opened_count || 0), 0);
      totalClicked = campaigns.reduce((sum, c) => sum + (c.clicked_count || 0), 0);
      totalBounces = campaigns.reduce((sum, c) => sum + (c.bounced_count || 0), 0);

      // Calculate averages
      if (totalEmailsSent > 0) {
        averageOpenRate = Number(((totalOpened / totalEmailsSent) * 100).toFixed(1));
        averageClickRate = Number(((totalClicked / totalEmailsSent) * 100).toFixed(1));
      }
    }

    const analyticsData = {
      totalCampaigns: totalCampaigns || 0,
      totalEmailsSent,
      averageOpenRate,
      averageClickRate,
      totalBounces,
    };

    return NextResponse.json(analyticsData);
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      {
        totalCampaigns: 0,
        totalEmailsSent: 0,
        averageOpenRate: 0,
        averageClickRate: 0,
        totalBounces: 0,
      },
      { status: 200 } // Return zeros instead of error
    );
  }
}

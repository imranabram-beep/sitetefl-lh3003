import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// This would integrate with SendGrid or your email service
const sendEmail = async (to: string, subject: string, html: string) => {
  // TODO: Implement SendGrid integration
  // For now, log the email that would be sent
  console.log(`[EMAIL] To: ${to}, Subject: ${subject}`);
  return true;
};

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { campaignId } = body;

    if (!campaignId) {
      return NextResponse.json(
        { error: "Campaign ID is required" },
        { status: 400 }
      );
    }

    // Get campaign details
    const { data: campaign, error: campaignError } = await supabase
      .from("sb_campaigns")
      .select("*")
      .eq("id", campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    if (campaign.status !== "draft") {
      return NextResponse.json(
        { error: "Only draft campaigns can be sent" },
        { status: 400 }
      );
    }

    // Get campaign recipients
    const { data: recipients, error: recipientsError } = await supabase
      .from("sb_campaign_recipients")
      .select("id, school_id, school:sb_schools(email, name)")
      .eq("campaign_id", campaignId);

    if (recipientsError) {
      throw recipientsError;
    }

    if (!recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients for this campaign" },
        { status: 400 }
      );
    }

    // Send emails to all recipients
    let emailsSent = 0;
    let emailsFailed = 0;
    const failures: any[] = [];

    for (const recipient of recipients) {
      try {
        const school = (recipient.school as any);
        if (!school?.email) {
          emailsFailed++;
          failures.push({
            recipientId: recipient.id,
            reason: "No email address",
          });
          continue;
        }

        // Replace template variables
        const emailBody = campaign.body
          ?.replace(/{{school_name}}/g, school.name || "")
          .replace(/{{email}}/g, school.email || "")
          || "";

        // Send email
        const sent = await sendEmail(school.email, campaign.subject, emailBody);

        if (sent) {
          emailsSent++;

          // Update recipient status
          await supabase
            .from("sb_campaign_recipients")
            .update({
              status: "sent",
              sent_at: new Date().toISOString(),
            })
            .eq("id", recipient.id);
        }
      } catch (error) {
        emailsFailed++;
        failures.push({
          recipientId: recipient.id,
          reason: (error as any).message,
        });
      }
    }

    // Update campaign status to sending/completed
    const { error: updateError } = await supabase
      .from("sb_campaigns")
      .update({
        status: "completed",
        emails_sent: emailsSent,
        sent_at: new Date().toISOString(),
      })
      .eq("id", campaignId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      emailsFailed,
      failures: failures.length > 0 ? failures : undefined,
      message: `Campaign sent! ${emailsSent} emails sent, ${emailsFailed} failed.`,
    });
  } catch (error: any) {
    console.error("Error sending campaign:", error);
    return NextResponse.json(
      { error: "Failed to send campaign", details: error.message },
      { status: 500 }
    );
  }
}

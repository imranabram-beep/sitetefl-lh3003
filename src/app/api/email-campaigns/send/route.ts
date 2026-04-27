import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
// TODO: Install @sendgrid/mail once npm registry access is restored
// import sgMail from "@sendgrid/mail";

// Initialize SendGrid (stub for development)
const sgMail = {
  send: async (msg: any) => ({ messageId: "stub" })
};
// sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface CampaignData {
  id: string;
  name: string;
  subject: string;
  html_body: string;
  body: string;
}

interface RecipientData {
  id: string;
  email: string;
  name: string;
}

// POST send a campaign
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
        { error: "Missing campaignId" },
        { status: 400 }
      );
    }

    // TODO: Fetch campaign from Supabase
    // const campaign = await supabase
    //   .from("email_campaigns")
    //   .select("*")
    //   .eq("id", campaignId)
    //   .single();

    // TODO: Fetch recipients from Supabase
    // const { data: recipients } = await supabase
    //   .from("campaign_recipients")
    //   .select("contact_id, contacts(email, name)")
    //   .eq("campaign_id", campaignId)
    //   .eq("status", "pending");

    // Mock campaign data for now
    const campaign: CampaignData = {
      id: campaignId,
      name: "Test Campaign",
      subject: "Test Subject",
      html_body: "<p>Hello {{name}}</p>",
      body: "Hello {{name}}",
    };

    // Mock recipients
    const recipients: RecipientData[] = [
      {
        id: "1",
        email: "test@example.com",
        name: "Test School",
      },
    ];

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients found for this campaign" },
        { status: 404 }
      );
    }

    let sentCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    // Send emails via SendGrid
    for (const recipient of recipients) {
      try {
        // Personalize email body
        let personalizedSubject = campaign.subject
          .replace(/{{name}}/g, recipient.name)
          .replace(/{{email}}/g, recipient.email);

        let personalizedHtml = campaign.html_body
          .replace(/{{name}}/g, recipient.name)
          .replace(/{{email}}/g, recipient.email);

        // Add unsubscribe link
        const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3003"}/api/unsubscribe?contactId=${recipient.id}&campaignId=${campaignId}`;
        personalizedHtml += `<br/><br/><small><a href="${unsubscribeLink}">Unsubscribe</a></small>`;

        // Send via SendGrid
        await sgMail.send({
          to: recipient.email,
          from: process.env.SENDGRID_FROM_EMAIL || "noreply@siteTeFL.com",
          subject: personalizedSubject,
          html: personalizedHtml,
          text: campaign.body.replace(/{{name}}/g, recipient.name),
          // Track opens and clicks
          trackingSettings: {
            clickTracking: {
              enabled: true,
            },
            openTracking: {
              enabled: true,
            },
          },
          // Add custom headers for webhook tracking
          headers: {
            "X-Campaign-ID": campaignId,
            "X-Contact-ID": recipient.id,
          },
        });

        // TODO: Update campaign_recipients status to "sent"
        // await supabase
        //   .from("campaign_recipients")
        //   .update({ status: "sent", sent_at: new Date().toISOString() })
        //   .eq("campaign_id", campaignId)
        //   .eq("contact_id", recipient.id);

        sentCount++;
        console.log(`✅ Sent to ${recipient.email}`);
      } catch (error: any) {
        failedCount++;
        const errorMsg = error.message || "Unknown error";
        errors.push(`${recipient.email}: ${errorMsg}`);
        console.error(`❌ Failed to send to ${recipient.email}:`, error);
      }
    }

    // TODO: Update campaign status to "completed"
    // await supabase
    //   .from("email_campaigns")
    //   .update({
    //     status: "completed",
    //     sent_count: sentCount,
    //     started_at: new Date().toISOString(),
    //     completed_at: new Date().toISOString(),
    //   })
    //   .eq("id", campaignId);

    return NextResponse.json({
      success: true,
      message: `Campaign sent: ${sentCount} successful, ${failedCount} failed`,
      sentCount,
      failedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error("Error sending campaign:", error);
    return NextResponse.json(
      {
        error: "Failed to send campaign",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

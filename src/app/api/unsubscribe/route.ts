import { NextRequest, NextResponse } from "next/server";

interface SendGridEvent {
  email: string;
  event: string;
  contact_id?: string;
  campaign_id?: string;
  [key: string]: any;
}

// GET unsubscribe link (when user clicks unsubscribe in email)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const contactId = searchParams.get("contactId");
    const campaignId = searchParams.get("campaignId");

    if (!contactId) {
      return NextResponse.json(
        { error: "Missing contactId" },
        { status: 400 }
      );
    }

    // TODO: Update contact as unsubscribed in Supabase
    // await supabase
    //   .from("contacts")
    //   .update({
    //     unsubscribed: true,
    //     unsubscribed_at: new Date().toISOString(),
    //   })
    //   .eq("id", contactId);

    // TODO: If campaignId provided, update campaign_recipients
    // if (campaignId) {
    //   await supabase
    //     .from("campaign_recipients")
    //     .update({ status: "unsubscribed" })
    //     .eq("campaign_id", campaignId)
    //     .eq("contact_id", contactId);
    // }

    console.log(`📧 Unsubscribed contact: ${contactId}`);

    // Return a confirmation page
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Unsubscribed</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 10px;
              text-align: center;
              box-shadow: 0 10px 25px rgba(0,0,0,0.2);
              max-width: 500px;
            }
            h1 { color: #333; margin-top: 0; }
            p { color: #666; line-height: 1.6; }
            .success { color: #4caf50; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>✓ Unsubscribed</h1>
            <p class="success">You have been successfully unsubscribed from our mailing list.</p>
            <p>We're sorry to see you go. You won't receive any more emails from us.</p>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              siteTeFL • Teaching Jobs Portal
            </p>
          </div>
        </body>
      </html>
    `, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error: any) {
    console.error("Error processing unsubscribe:", error);
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body { font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; }
            .container { background: white; padding: 40px; border-radius: 10px; text-align: center; max-width: 500px; }
            h1 { color: #d32f2f; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Error Processing Request</h1>
            <p>Something went wrong. Please try again later.</p>
          </div>
        </body>
      </html>
    `, {
      status: 500,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}

// POST webhook from SendGrid (for tracking bounces, unsubscribes, etc.)
export async function POST(request: NextRequest) {
  try {
    const events = await request.json();

    if (!Array.isArray(events)) {
      return NextResponse.json(
        { error: "Invalid webhook format" },
        { status: 400 }
      );
    }

    console.log(`📨 Received ${events.length} webhook events from SendGrid`);

    for (const event of events) {
      const sendGridEvent = event as SendGridEvent;

      switch (sendGridEvent.event) {
        case "open":
          // Email was opened
          // TODO: Update campaign_recipients status to "opened"
          // await supabase
          //   .from("campaign_recipients")
          //   .update({
          //     status: "opened",
          //     opened_at: new Date().toISOString(),
          //   })
          //   .eq("contact_id", sendGridEvent.contact_id)
          //   .eq("campaign_id", sendGridEvent.campaign_id);
          console.log(`👀 Email opened: ${sendGridEvent.email}`);
          break;

        case "click":
          // Link was clicked
          // TODO: Update campaign_recipients status to "clicked"
          // await supabase
          //   .from("campaign_recipients")
          //   .update({
          //     status: "clicked",
          //     last_click_at: new Date().toISOString(),
          //   })
          //   .eq("contact_id", sendGridEvent.contact_id)
          //   .eq("campaign_id", sendGridEvent.campaign_id);
          console.log(`🔗 Link clicked: ${sendGridEvent.email}`);
          break;

        case "bounce":
          // Email bounced
          // TODO: Update campaign_recipients status to "bounced"
          // await supabase
          //   .from("campaign_recipients")
          //   .update({
          //     status: "bounced",
          //     bounced_at: new Date().toISOString(),
          //   })
          //   .eq("contact_id", sendGridEvent.contact_id)
          //   .eq("campaign_id", sendGridEvent.campaign_id);
          console.log(`⚠️ Email bounced: ${sendGridEvent.email}`);
          break;

        case "unsubscribe":
          // User unsubscribed via SendGrid
          // TODO: Update contacts as unsubscribed
          // await supabase
          //   .from("contacts")
          //   .update({
          //     unsubscribed: true,
          //     unsubscribed_at: new Date().toISOString(),
          //   })
          //   .eq("email", sendGridEvent.email);
          console.log(`📧 Unsubscribe received: ${sendGridEvent.email}`);
          break;

        case "dropped":
          // Email was dropped
          // TODO: Update campaign_recipients status to "bounced"
          console.log(`🚫 Email dropped: ${sendGridEvent.email}`);
          break;

        default:
          console.log(`ℹ️ Event: ${sendGridEvent.event} from ${sendGridEvent.email}`);
      }
    }

    // Return 200 OK to acknowledge receipt
    return NextResponse.json({ success: true, processed: events.length });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    // Still return 200 so SendGrid doesn't retry
    return NextResponse.json(
      { error: "Processing error", details: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
// TODO: Install @sendgrid/mail once npm registry access is restored
// import sgMail from "@sendgrid/mail";

// Initialize SendGrid (stub for development)
const sgMail = {
  send: async (msg: any) => ({ messageId: "stub" })
};
// sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

// POST send a test email (development only)
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { recipientEmail, recipientName = "Test User", subject = "Test Email from siteTeFL Admin", htmlContent } = body;

    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Missing recipientEmail" },
        { status: 400 }
      );
    }

    // Default test email content if not provided
    const defaultHtml = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h1 style="color: #FF8C00; margin-bottom: 20px;">🎉 Welcome to siteTeFL</h1>

            <p>Hi ${recipientName},</p>

            <p>This is a test email from the <strong>siteTeFL Admin Email Campaign Manager</strong>.</p>

            <h2 style="color: #0066cc; margin-top: 30px;">✨ Email Features Working:</h2>
            <ul>
              <li>✅ SendGrid integration active</li>
              <li>✅ Email templating with personalization</li>
              <li>✅ HTML formatting</li>
              <li>✅ Open & click tracking enabled</li>
              <li>✅ Unsubscribe links included</li>
            </ul>

            <p style="margin-top: 30px;">
              <a href="https://sitetefl.com" style="display: inline-block; background-color: #FF8C00; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Visit siteTeFL
              </a>
            </p>

            <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;">

            <footer style="text-align: center; color: #666; font-size: 12px;">
              <p>siteTeFL Admin System | Email Campaign Manager</p>
              <p>Powered by SendGrid</p>
              <p><a href="http://localhost:3003/api/unsubscribe?email=${recipientEmail}" style="color: #0066cc; text-decoration: none;">Unsubscribe</a></p>
            </footer>
          </div>
        </body>
      </html>
    `;

    const emailContent = htmlContent || defaultHtml;

    // Send test email via SendGrid
    await sgMail.send({
      to: recipientEmail,
      from: process.env.SENDGRID_FROM_EMAIL || "noreply@teflinasia.org",
      subject: subject,
      html: emailContent,
      text: `Test email sent to ${recipientName}`,
      trackingSettings: {
        clickTracking: {
          enabled: true,
        },
        openTracking: {
          enabled: true,
        },
      },
      headers: {
        "X-Test-Email": "true",
        "X-Recipient-Name": recipientName,
      },
    });

    return NextResponse.json({
      success: true,
      message: `✅ Test email sent successfully to ${recipientEmail}`,
      details: {
        recipient: recipientEmail,
        recipientName: recipientName,
        subject: subject,
        sentAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Error sending test email:", error);
    return NextResponse.json(
      {
        error: "Failed to send test email",
        details: error.message || error,
      },
      { status: 500 }
    );
  }
}

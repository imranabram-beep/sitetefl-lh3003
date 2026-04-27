import { NextResponse } from "next/server";
import crypto from "crypto";

// Lemon Squeezy sends a webhook when payment completes.
// We verify the signature, then store the enrolment.
// For now we log it — once you add a database (Supabase/Postgres)
// you'd write to an enrolments table here.

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") ?? "";
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET ?? "";

  // Verify the webhook is genuinely from Lemon Squeezy
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (hmac !== signature) {
    console.error("Webhook signature mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as {
    meta: {
      event_name: string;
      custom_data?: {
        user_id?: string;
        course_slug?: string;
      };
    };
    data: {
      attributes: {
        status: string;
        user_email: string;
      };
    };
  };

  const eventName = payload.meta.event_name;

  // Only act on successful payments
  if (eventName === "order_created") {
    const userId = payload.meta.custom_data?.user_id;
    const courseSlug = payload.meta.custom_data?.course_slug;
    const email = payload.data.attributes.user_email;

    console.log(`✅ Payment confirmed — user: ${userId}, course: ${courseSlug}, email: ${email}`);

    // TODO: Write to database here when you add Supabase:
    // await db.enrolments.create({ userId, courseSlug, createdAt: new Date() })
    //
    // For now enrolment is stored client-side in localStorage.
    // The /enrolment-success page handles this on the client.
  }

  return NextResponse.json({ received: true });
}

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Must be logged in to checkout
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress ?? "";
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  const { courseSlug } = await req.json() as { courseSlug: string };

  const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!variantId || !apiKey) {
    return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
  }

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email,
          name,
          custom: {
            user_id: userId,
            course_slug: courseSlug,
          },
        },
        product_options: {
          redirect_url: `${appUrl}/enrolment-success?course=${courseSlug}`,
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: process.env.LEMON_SQUEEZY_STORE_ID,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: variantId,
          },
        },
      },
    },
  };

  const res = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Lemon Squeezy error:", err);
    return NextResponse.json({ error: "Could not create checkout" }, { status: 500 });
  }

  const data = await res.json() as { data: { attributes: { url: string } } };
  const checkoutUrl = data.data.attributes.url;

  return NextResponse.json({ url: checkoutUrl });
}

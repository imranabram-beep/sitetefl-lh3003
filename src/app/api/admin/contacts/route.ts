import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all contacts with optional type filter
export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    let query = supabase.from("contacts").select("*");

    // Filter by type if provided
    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts", details: error.message },
      { status: 500 }
    );
  }
}

// POST create a new contact
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, name, type, country, website, notes } = body;

    // Validate required fields
    if (!email || !name || !type) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, type" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { data, error } = await supabase.from("contacts").insert([
      {
        email,
        name,
        type,
        country: country || null,
        website: website || null,
        notes: notes || null,
      },
    ]).select();

    if (error) {
      // Check if email already exists
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Contact with this email already exists" },
          { status: 400 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Contact created successfully",
      contact: data?.[0],
    });
  } catch (error: any) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Failed to create contact", details: error.message },
      { status: 500 }
    );
  }
}

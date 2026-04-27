import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "File must be a CSV file" },
        { status: 400 }
      );
    }

    // Read and parse CSV
    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length < 2) {
      return NextResponse.json(
        { error: "CSV file must have headers and at least one data row" },
        { status: 400 }
      );
    }

    // Parse headers
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const requiredFields = ["name", "email", "type"];

    const missingFields = requiredFields.filter(
      (field) => !headers.includes(field)
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required columns: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Parse rows
    const contacts: any[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const row: any = {};

      headers.forEach((header, idx) => {
        row[header] = values[idx] || null;
      });

      // Validate required fields
      if (!row.name || !row.email || !row.type) {
        continue; // Skip invalid rows
      }

      contacts.push({
        name: row.name,
        email: row.email,
        type: row.type,
        country: row.country || null,
        website: row.website || null,
        notes: row.notes || null,
      });
    }

    if (contacts.length === 0) {
      return NextResponse.json(
        { error: "No valid contacts found in CSV" },
        { status: 400 }
      );
    }

    // Insert contacts into database
    const { data, error } = await supabase
      .from("contacts")
      .insert(contacts)
      .select();

    if (error) {
      // Handle unique constraint violation
      if (error.code === "23505") {
        return NextResponse.json(
          {
            error: "Some contacts already exist (duplicate emails)",
            success: (data || []).length,
          },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      success: (data || []).length,
      message: `Successfully imported ${(data || []).length} contacts`,
    });
  } catch (error: any) {
    console.error("Error importing contacts:", error);
    return NextResponse.json(
      { error: "Failed to import contacts", details: error.message },
      { status: 500 }
    );
  }
}

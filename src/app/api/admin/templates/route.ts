import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all templates
export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("email_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates", details: error.message },
      { status: 500 }
    );
  }
}

// POST create a new template
export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, subject, content, variables } = body;

    if (!name || !subject || !content) {
      return NextResponse.json(
        { error: "Missing required fields: name, subject, content" },
        { status: 400 }
      );
    }

    // Extract variables from content ({{variable}} syntax)
    const variableMatches = content.match(/\{\{([^}]+)\}\}/g) || [];
    const extractedVariables = variableMatches.map((match) =>
      match.replace(/[{}]/g, "")
    );

    // Save to Supabase
    const { data, error } = await supabase
      .from("email_templates")
      .insert([
        {
          name,
          subject,
          body: content,
          html_body: content, // Store HTML content
          variables: extractedVariables || [],
          created_by: userId,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: "Template created successfully",
      template: data?.[0],
    });
  } catch (error: any) {
    console.error("Error creating template:", error);
    return NextResponse.json(
      { error: "Failed to create template", details: error.message },
      { status: 500 }
    );
  }
}

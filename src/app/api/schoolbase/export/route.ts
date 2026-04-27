import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      dataType,
      format,
      includeUnverified,
      includeEmails,
      includePhones,
      dateRange,
    } = body;

    let data: any[] = [];

    // Fetch data based on type
    if (dataType === "schools") {
      const { data: schools, error } = await supabase
        .from("sb_schools")
        .select(`
          id,
          name,
          type,
          email,
          phone,
          website,
          verified,
          lead_score,
          created_at,
          location:sb_locations(name)
        `);

      if (error) throw error;

      data = (schools || [])
        .filter((s: any) => includeUnverified || s.verified)
        .map((s: any) => ({
          id: s.id,
          name: s.name,
          type: s.type,
          location: s.location?.name,
          ...(includeEmails && { email: s.email }),
          ...(includePhones && { phone: s.phone }),
          website: s.website,
          verified: s.verified,
          leadScore: s.lead_score,
          createdAt: s.created_at,
        }));
    } else if (dataType === "campaigns") {
      const { data: campaigns, error } = await supabase
        .from("sb_campaigns")
        .select(`
          id,
          name,
          subject,
          status,
          emails_sent,
          emails_opened,
          emails_clicked,
          emails_bounced,
          created_at,
          sent_at
        `);

      if (error) throw error;

      data = (campaigns || []).map((c: any) => ({
        id: c.id,
        name: c.name,
        subject: c.subject,
        status: c.status,
        emailsSent: c.emails_sent,
        emailsOpened: c.emails_opened,
        emailsClicked: c.emails_clicked,
        emailsBounced: c.emails_bounced,
        openRate: c.emails_sent > 0 ? Math.round((c.emails_opened / c.emails_sent) * 100) : 0,
        createdAt: c.created_at,
        sentAt: c.sent_at,
      }));
    } else if (dataType === "verification") {
      const { data: verifications, error } = await supabase
        .from("sb_verification")
        .select(`
          id,
          school_id,
          email_address,
          phone_number,
          website,
          email_status,
          phone_status,
          website_status,
          last_checked_at,
          school:sb_schools(name)
        `);

      if (error) throw error;

      data = (verifications || []).map((v: any) => ({
        schoolId: v.school_id,
        schoolName: v.school?.name,
        ...(includeEmails && { email: v.email_address }),
        ...(includePhones && { phone: v.phone_number }),
        website: v.website,
        emailStatus: v.email_status,
        phoneStatus: v.phone_status,
        websiteStatus: v.website_status,
        lastCheckedAt: v.last_checked_at,
      }));
    }

    // Format data based on export format
    let content: string;
    let mimeType: string;
    let filename: string;

    if (format === "csv") {
      content = convertToCSV(data);
      mimeType = "text/csv";
      filename = `schoolbase-${dataType}-export.csv`;
    } else if (format === "json") {
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
      filename = `schoolbase-${dataType}-export.json`;
    } else {
      // XLSX format - for simplicity, return JSON (in production, use a library like xlsx)
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
      filename = `schoolbase-${dataType}-export.json`;
    }

    return new NextResponse(content, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error: any) {
    console.error("Error exporting data:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) {
    return "";
  }

  const headers = Object.keys(data[0]);
  const headerRow = headers.join(",");

  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header];
        if (value === null || value === undefined) {
          return "";
        }
        // Escape quotes and wrap in quotes if contains comma or quote
        const stringValue = String(value).replace(/"/g, '""');
        if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
          return `"${stringValue}"`;
        }
        return stringValue;
      })
      .join(",")
  );

  return [headerRow, ...rows].join("\n");
}

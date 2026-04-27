"use client";

import Link from "next/link";

export function HomeQuickLinks() {
  return (
    <section style={{ padding: "3rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
          <Link href="/success-stories" style={{
            padding: "2rem",
            background: "white",
            border: "2px solid rgba(34, 201, 154, 0.2)",
            borderRadius: "12px",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.3s ease",
            display: "block",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#00b09b";
            el.style.boxShadow = "0 8px 24px rgba(34, 201, 154, 0.1)";
            el.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(34, 201, 154, 0.2)";
            el.style.boxShadow = "none";
            el.style.transform = "translateY(0)";
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#223548", margin: "0 0 0.75rem 0" }}>
              Success Stories
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#3a5060", lineHeight: 1.6, margin: "0" }}>
              See where our graduates are teaching and hear from real teachers about their journey.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "#00b09b", fontWeight: 600 }}>
              Explore stories →
            </div>
          </Link>

          <Link href="/how-it-works" style={{
            padding: "2rem",
            background: "white",
            border: "2px solid rgba(34, 201, 154, 0.2)",
            borderRadius: "12px",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.3s ease",
            display: "block",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#00b09b";
            el.style.boxShadow = "0 8px 24px rgba(34, 201, 154, 0.1)";
            el.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(34, 201, 154, 0.2)";
            el.style.boxShadow = "none";
            el.style.transform = "translateY(0)";
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#223548", margin: "0 0 0.75rem 0" }}>
              How It Works
            </h3>
            <p style={{ fontSize: "0.95rem", color: "#3a5060", lineHeight: 1.6, margin: "0" }}>
              Follow our clear 4-step path from course enrolment to your first teaching role.
            </p>
            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "#00b09b", fontWeight: 600 }}>
              See the process →
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

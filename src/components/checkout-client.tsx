"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { Course } from "@/lib/data";

type Props = {
  course: Course;
  allCourses: Course[];
};

export function CheckoutPageClient({ course, allCourses }: Props) {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<Course>(course);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/checkout?course=${selectedCourse.slug}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/lemon/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: selectedCourse.slug }),
      });

      const data = await res.json() as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Redirect to Lemon Squeezy hosted checkout
      window.location.href = data.url;
    } catch {
      setError("Could not connect to payment provider. Please try again.");
      setLoading(false);
    }
  }

  if (!isLoaded) {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--muted)" }}>Loading…</p>
      </main>
    );
  }

  return (
    <main>
      <section className="section detail-hero" style={{ paddingBottom: "1rem" }}>
        <div className="container narrow">
          <p className="eyebrow">Secure checkout</p>
          <h1>Enrol in your TEFL course</h1>
          <p className="lead" style={{ marginTop: "8px" }}>
            Instant access on payment. 30-day money-back guarantee.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "2rem",
            alignItems: "start",
            maxWidth: "860px",
          }}
        >
          {/* Left — course selector + CTA */}
          <div className="card" style={{ padding: "2rem" }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Select your course</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "2rem" }}>
              {allCourses.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setSelectedCourse(c)}
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "var(--radius-sm)",
                    border:
                      selectedCourse.slug === c.slug
                        ? "2px solid var(--accent)"
                        : "1.5px solid var(--line-strong)",
                    background:
                      selectedCourse.slug === c.slug
                        ? "var(--info-soft)"
                        : "var(--surface)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "var(--text-strong)", fontSize: "0.95rem" }}>
                      {c.title}
                    </strong>
                    <span style={{ fontWeight: 800, color: "var(--accent)", fontSize: "1.1rem" }}>
                      {c.price ?? "£149"}
                    </span>
                  </div>
                  {c.level && (
                    <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "4px" }}>
                      {c.level} · {c.duration}
                    </p>
                  )}
                </button>
              ))}
            </div>

            {/* Sign-in notice if not logged in */}
            {!isSignedIn && (
              <div
                style={{
                  background: "var(--info-soft)",
                  borderRadius: "var(--radius-xs)",
                  padding: "12px 14px",
                  marginBottom: "1.5rem",
                  fontSize: "0.875rem",
                  color: "var(--text)",
                }}
              >
                💡 You'll be asked to sign in or create a free account before payment.
              </div>
            )}

            {error && (
              <p style={{ color: "var(--danger)", marginBottom: "1rem", fontSize: "0.875rem" }}>
                ⚠️ {error}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="button"
              style={{ width: "100%", fontSize: "1rem", padding: "14px", opacity: loading ? 0.7 : 1 }}
            >
              {loading
                ? "Redirecting to payment…"
                : `Enrol now — ${selectedCourse.price ?? "£149"}`}
            </button>

            <p style={{ marginTop: "12px", fontSize: "0.78rem", color: "var(--muted)", textAlign: "center" }}>
              🔒 Secure payment via Lemon Squeezy · Instant access · 30-day money-back guarantee
            </p>
          </div>

          {/* Right — order summary */}
          <div>
            <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Order summary</p>
              <h3 style={{ marginBottom: "0.5rem", fontSize: "1rem" }}>{selectedCourse.title}</h3>

              <div style={{ borderTop: "1px solid var(--line)", margin: "1rem 0", paddingTop: "1rem" }}>
                {[
                  selectedCourse.level,
                  selectedCourse.duration,
                  selectedCourse.certificate,
                  `${selectedCourse.units.length} units`,
                  `${selectedCourse.units.reduce((t, u) => t + u.modules.length, 0)} modules`,
                  "Video lessons + transcripts",
                ]
                  .filter(Boolean)
                  .map((item) => (
                    <div key={item} style={{ display: "flex", gap: "8px", padding: "3px 0", fontSize: "0.875rem" }}>
                      <span style={{ color: "var(--success)", fontWeight: 700 }}>✓</span>
                      {item}
                    </div>
                  ))}
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--text-strong)" }}>Total</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-strong)" }}>
                  {selectedCourse.price ?? "£149"}
                </span>
              </div>
            </div>

            <div
              className="card"
              style={{
                padding: "1.25rem",
                background: "var(--success-soft)",
                border: "1px solid var(--success)",
              }}
            >
              <p style={{ fontWeight: 600, color: "var(--success)", marginBottom: "0.5rem" }}>
                ✓ 30-day money-back guarantee
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                Not happy? Contact us within 30 days for a full refund, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

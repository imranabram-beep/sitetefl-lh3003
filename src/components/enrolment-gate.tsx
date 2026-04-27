"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEnrolment } from "@/hooks/useEnrolment";
import { useTesterMode } from "@/hooks/useTesterMode";
import type { Course } from "@/lib/data";

type Props = {
  course: Course;
  unitSlug: string;
  moduleSlug: string;
  children: React.ReactNode;
};

export function EnrolmentGate({ course, unitSlug, moduleSlug, children }: Props) {
  const { isLoaded, isEnrolled } = useEnrolment();
  const { enabled: testerMode, isLoaded: testerLoaded } = useTesterMode();
  const [status, setStatus] = useState<"loading" | "free" | "enrolled" | "paywall">("loading");

  useEffect(() => {
    if (!isLoaded || !testerLoaded) return;

    // Tester mode bypasses paywall entirely
    if (testerMode) { setStatus("enrolled"); return; }

    const firstUnit = course.units[0];
    const firstModule = firstUnit?.modules[0];
    const isFreePreview =
      unitSlug === firstUnit?.slug && moduleSlug === firstModule?.slug;

    if (isFreePreview) {
      setStatus("free");
    } else if (isEnrolled(course.slug)) {
      setStatus("enrolled");
    } else {
      setStatus("paywall");
    }
  }, [isLoaded, testerLoaded, testerMode, course, unitSlug, moduleSlug, isEnrolled]);

  if (status === "loading") {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--muted)" }}>Loading…</p>
      </main>
    );
  }

  if (status === "paywall") {
    const checkoutUrl = `/checkout?course=${course.slug}`;
    return (
      <main style={{ minHeight: "70vh" }}>
        <section className="detail-hero" style={{ filter: "blur(3px)", pointerEvents: "none", userSelect: "none", opacity: 0.4 }}>
          <div className="container narrow">
            <p className="eyebrow">Lesson content</p>
            <h1>This lesson is part of the full course</h1>
            <p className="lead">Enrol to unlock all lessons, activities and quizzes.</p>
          </div>
        </section>
        <div style={{ position: "relative", marginTop: "-120px", display: "flex", justifyContent: "center", padding: "0 1rem 4rem", zIndex: 10 }}>
          <div style={{ background: "var(--surface)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-soft)", padding: "2.5rem 2rem", maxWidth: "480px", width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎓</div>
            <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Full course access</p>
            <h2 style={{ marginBottom: "0.75rem" }}>{course.title}</h2>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Enrol now to unlock all lessons, activities, quizzes, and your digital certificate.
            </p>
            <div style={{ background: "var(--surface-soft)", borderRadius: "var(--radius-sm)", padding: "1rem 1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
              {[
                `${course.units.length} units`,
                `${course.units.reduce((t, u) => t + u.modules.length, 0)} lessons, activities & quizzes`,
                "Video lessons with transcripts",
                "Digital certificate on completion",
                "Flexible self-paced study",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0", color: "var(--text)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--success)", fontWeight: 700 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-strong)" }}>{course.price ?? "£149"}</span>
              <span style={{ color: "var(--muted)", marginLeft: "6px", fontSize: "0.9rem" }}>one-time payment</span>
            </div>
            <Link href={checkoutUrl} className="button" style={{ width: "100%", display: "block" }}>
              Enrol now — {course.price ?? "£149"}
            </Link>
            <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
              Secure checkout · Instant access · 30-day money-back guarantee
            </p>
            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--line)" }}>
              <Link href={`/courses/${course.slug}`} style={{ color: "var(--accent)", fontSize: "0.875rem" }}>
                ← Back to course overview
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {status === "free" && (
        <div style={{ background: "var(--success-soft)", borderBottom: "1px solid var(--success)", padding: "10px 0", textAlign: "center", fontSize: "0.875rem", color: "var(--success)", fontWeight: 600 }}>
          🎁 Free preview lesson — enrol to access the full course
        </div>
      )}
      {children}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEnrolment } from "@/hooks/useEnrolment";
import { courses } from "@/lib/data";

export function EnrolmentSuccessClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { enrol } = useEnrolment();
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const courseSlug = searchParams.get("course") ?? "";
    const course = courses.find((c) => c.slug === courseSlug);

    if (courseSlug) {
      enrol(courseSlug);
      setCourseName(course?.title ?? "your course");
    }
  }, [searchParams, enrol]);

  function handleStart() {
    const courseSlug = searchParams.get("course") ?? "";
    const course = courses.find((c) => c.slug === courseSlug);
    const firstUnit = course?.units[0];
    const firstModule = firstUnit?.modules[0];

    if (course && firstUnit && firstModule) {
      router.push(`/courses/${course.slug}/units/${firstUnit.slug}/${firstModule.slug}`);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-soft)",
          padding: "3rem 2.5rem",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
        <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>Payment confirmed</p>
        <h1 style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>You're enrolled!</h1>
        <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>
          You now have full access to <strong>{courseName}</strong>.
          Your progress will be saved automatically as you work through each lesson.
        </p>

        <div
          style={{
            background: "var(--success-soft)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
            marginBottom: "2rem",
            textAlign: "left",
          }}
        >
          {[
            "All lessons and activities unlocked",
            "Progress tracked automatically",
            "Digital certificate on completion",
            "Access never expires",
          ].map((item) => (
            <div
              key={item}
              style={{ display: "flex", gap: "8px", padding: "3px 0", fontSize: "0.9rem" }}
            >
              <span style={{ color: "var(--success)", fontWeight: 700 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        <button onClick={handleStart} className="button" style={{ width: "100%", fontSize: "1rem", padding: "14px" }}>
          Start learning now →
        </button>
      </div>
    </main>
  );
}

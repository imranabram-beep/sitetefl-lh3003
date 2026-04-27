"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/use-progress";
import { getModuleStatus } from "@/lib/drip";
import { useTesterMode } from "@/hooks/useTesterMode";
import type { Course } from "@/lib/data";

type Props = {
  course: Course;
  unitSlug: string;
  moduleSlug: string;
  children: React.ReactNode;
};

export function LessonLockGuard({ course, unitSlug, moduleSlug, children }: Props) {
  const { isLoaded, completedKeys } = useProgress();
  const { enabled: testerMode, isLoaded: testerLoaded } = useTesterMode();
  const [status, setStatus] = useState<"loading" | "unlocked" | "locked">("loading");

  useEffect(() => {
    if (!isLoaded || !testerLoaded) return;
    // Tester mode bypasses drip lock
    if (testerMode) { setStatus("unlocked"); return; }
    const s = getModuleStatus(course, unitSlug, moduleSlug, completedKeys);
    setStatus(s === "locked" ? "locked" : "unlocked");
  }, [isLoaded, testerLoaded, testerMode, completedKeys, course, unitSlug, moduleSlug]);

  if (status === "loading") {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--muted)" }}>Checking progress…</p>
      </main>
    );
  }

  if (status === "locked") {
    return (
      <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "420px", padding: "2rem", background: "var(--surface)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
          <h2 style={{ marginBottom: "0.75rem" }}>This lesson is locked</h2>
          <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
            Complete the previous lessons first to unlock this one.
          </p>
          <Link href={`/courses/${course.slug}`} className="button">
            Back to course overview
          </Link>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/use-progress";
import { useEnrolment } from "@/hooks/useEnrolment";
import { useTesterMode } from "@/hooks/useTesterMode";
import { getDripStatuses } from "@/lib/drip";
import type { Course } from "@/lib/data";
import { makeKey } from "@/hooks/useProgress";

type Props = { course: Course };

export default function CourseUnitsList({ course }: Props) {
  const { isLoaded: progressLoaded, completedKeys } = useProgress();
  const { isLoaded: enrolLoaded, isEnrolled } = useEnrolment();
  const { enabled: testerMode, isLoaded: testerLoaded } = useTesterMode();

  // All units collapsed by default — open first unit
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(course.units.map((u, i) => [u.slug, i === 0]))
  );

  const isLoaded = progressLoaded && enrolLoaded && testerLoaded;
  const enrolled = testerMode || isEnrolled(course.slug);

  const freeUnitSlug = course.units[0]?.slug;
  const freeModuleSlug = course.units[0]?.modules[0]?.slug;

  function toggleUnit(slug: string) {
    setOpenUnits((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  function collapseAll() {
    setOpenUnits(Object.fromEntries(course.units.map((u) => [u.slug, false])));
  }
  function expandAll() {
    setOpenUnits(Object.fromEntries(course.units.map((u) => [u.slug, true])));
  }

  if (!isLoaded) {
    return (
      <div style={{ opacity: 0.5, pointerEvents: "none" }}>
        {course.units.map((unit, i) => (
          <div key={unit.slug} className="card course-unit-card" style={{ padding: "1.25rem 1.5rem" }}>
            <p className="eyebrow">Unit {i + 1}</p>
            <h2>{unit.title}</h2>
          </div>
        ))}
      </div>
    );
  }

  const statuses = enrolled ? getDripStatuses(course, completedKeys) : {};

  return (
    <>
      {/* Expand / Collapse all controls */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "1rem", justifyContent: "flex-end" }}>
        <button onClick={expandAll} className="button ghost" style={{ fontSize: "0.8rem", padding: "6px 14px" }}>
          Expand all
        </button>
        <button onClick={collapseAll} className="button ghost" style={{ fontSize: "0.8rem", padding: "6px 14px" }}>
          Collapse all
        </button>
      </div>

      {/* Tester mode banner */}
      {testerMode && (
        <div style={{
          background: "#fff3cd",
          border: "1px solid #ffc107",
          borderRadius: "var(--radius-xs)",
          padding: "10px 16px",
          marginBottom: "1rem",
          fontSize: "0.875rem",
          color: "#856404",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          🧪 <strong>Tester mode on</strong> — all lessons unlocked. Drip and paywall bypassed.
        </div>
      )}

      {course.units.map((unit, unitIndex) => {
        const isOpen = openUnits[unit.slug] ?? false;

        // Work out unit-level lock state
        const allLocked = enrolled
          ? unit.modules.every((mod) => statuses[makeKey(course.slug, unit.slug, mod.slug)] === "locked")
          : unitIndex > 0;
        const unitLocked = !testerMode && allLocked;

        // Count completions for this unit
        const completedCount = unit.modules.filter((mod) =>
          completedKeys.includes(makeKey(course.slug, unit.slug, mod.slug))
        ).length;
        const totalCount = unit.modules.length;
        const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        return (
          <article
            key={unit.slug}
            className={`course-unit-card ${isOpen ? "open" : ""}`}
            style={{ opacity: unitLocked ? 0.6 : 1 }}
          >
            {/* ── Unit header (always visible, clickable) ── */}
            <button
              type="button"
              onClick={() => toggleUnit(unit.slug)}
            >
              <div>
                <p className="eyebrow">Unit {unitIndex + 1}</p>
                <h2>
                  {unitLocked && <span>🔒</span>}
                  {unit.title}
                </h2>
                <p className="module-count">
                  <span>{totalCount} modules</span>
                  {enrolled && completedCount > 0 && (
                    <span>{completedCount}/{totalCount} complete</span>
                  )}
                </p>
              </div>

              <div className="unit-controls">
                {/* Mini progress bar */}
                {enrolled && pct > 0 && (
                  <div className="unit-mini-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="unit-mini-progress-percent">{pct}%</span>
                  </div>
                )}
                {/* Chevron */}
                <span className="unit-chevron">▼</span>
              </div>
            </button>

            {/* ── Collapsible module list ── */}
            {isOpen && (
              <div className="course-module-list">
                {unit.modules.map((mod, index) => {
                  const isFreePreview = unit.slug === freeUnitSlug && mod.slug === freeModuleSlug;
                  const key = makeKey(course.slug, unit.slug, mod.slug);

                  let displayState: "free" | "enrol" | "completed" | "current" | "locked";
                  if (testerMode) {
                    const completed = completedKeys.includes(key);
                    displayState = completed ? "completed" : "current";
                  } else if (!enrolled) {
                    displayState = isFreePreview ? "free" : "enrol";
                  } else {
                    const s = statuses[key] ?? "locked";
                    displayState = s === "completed" ? "completed" : s === "current" ? "current" : "locked";
                  }

                  const kindLabel = mod.kind === "lesson" ? "Lesson" : mod.kind === "activity" ? "Activity" : "Quiz";
                  const kindIcon = mod.kind === "lesson" ? "📚" : mod.kind === "activity" ? "⚡" : "✓";
                  const href = `/courses/${course.slug}/units/${unit.slug}/${mod.slug}`;

                  return (
                    <div
                      key={mod.slug}
                      className={`course-module-row ${displayState}`}
                    >
                      {/* Status icon */}
                      <div className="course-module-index">
                        {displayState === "completed" ? (
                          "✓"
                        ) : displayState === "locked" || displayState === "enrol" ? (
                          "🔒"
                        ) : displayState === "free" ? (
                          "🎁"
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Title + meta */}
                      <div className="course-module-copy">
                        <h3>{mod.title}</h3>
                        <p className="course-module-kind">
                          <span className="module-type-badge">
                            {kindIcon} {kindLabel}
                          </span>
                          {mod.duration && (
                            <span className="module-duration">
                              {mod.duration}
                            </span>
                          )}
                          {displayState === "free" && <span>· Free preview</span>}
                          {displayState === "completed" && <span>· Completed</span>}
                          {displayState === "current" && <span>· Up next</span>}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="course-module-action">
                        {displayState === "free" && <Link href={href} className="button ghost" style={{ borderColor: "var(--primary-teal)", color: "var(--primary-teal)" }}>🎁 Preview</Link>}
                        {displayState === "enrol" && <Link href={`/checkout?course=${course.slug}`} className="button">Enrol to unlock</Link>}
                        {displayState === "completed" && <Link href={href} className="button ghost">Review</Link>}
                        {displayState === "current" && <Link href={href} className="button">{index === 0 && unitIndex === 0 ? "Start course" : "Open lesson"}</Link>}
                        {displayState === "locked" && <span className="button" style={{ background: "var(--line-strong)", color: "var(--text-muted)", cursor: "not-allowed", pointerEvents: "none" }}>🔒 Locked</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </article>
        );
      })}
    </>
  );
}

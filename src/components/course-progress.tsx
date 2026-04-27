"use client";

import { useEffect, useState } from "react";

type CourseProgressProps = {
  courseSlug: string;
  totalLessons: number;
};

export function CourseProgress({
  courseSlug,
  totalLessons,
}: CourseProgressProps) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
  function loadProgress() {
    const key = `progress-${courseSlug}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    setCompletedCount(saved.length);
  }

  loadProgress();

  window.addEventListener("progressUpdated", loadProgress);
  return () => {
    window.removeEventListener("progressUpdated", loadProgress);
  };
}, [courseSlug]);

  const percentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isComplete = percentage === 100;

  return (
    <div style={{ marginTop: "12px" }}>
      {isComplete ? (
  <p className="lead" style={{ marginBottom: "8px", color: "#0f4c3a" }}>
    🎉 Course completed! Well done.
  </p>
) : (
  <p className="lead" style={{ marginBottom: "8px" }}>
    Progress: {completedCount} of {totalLessons} completed ({percentage}%)
  </p>
)}
      <button
  onClick={() => {
    localStorage.removeItem(`progress-${courseSlug}`);
    setCompletedCount(0);
  }}
  style={{
    marginTop: "12px",
    padding: "8px 14px",
    background: "transparent",
    color: "#0f4c3a",
    border: "1px solid #0f4c3a",
    borderRadius: "999px",
    cursor: "pointer",
  }}
>
  Reset progress
</button>
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "12px",
          background: "#d9d3c7",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background: "#0f4c3a",
            borderRadius: "999px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
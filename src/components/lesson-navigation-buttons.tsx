"use client";

import Link from "next/link";
import { useProgress } from "@/lib/use-progress";

type Props = {
  courseSlug: string;
  unitSlug: string;
  lessonSlug: string;
  previousLessonSlug?: string;
  nextLessonSlug?: string;
};

export function LessonNavigationButtons({
  courseSlug,
  unitSlug,
  lessonSlug,
  previousLessonSlug,
  nextLessonSlug,
}: Props) {
  const { isLoaded, getModuleProgress } = useProgress();

  if (!isLoaded) {
    return (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {previousLessonSlug ? (
          <Link
            href={`/courses/${courseSlug}/units/${unitSlug}/${previousLessonSlug}`}
            className="button ghost"
          >
            ← Previous
          </Link>
        ) : null}
        {nextLessonSlug ? (
          <button type="button" className="button" disabled>
            Loading…
          </button>
        ) : null}
      </div>
    );
  }

  const { completed } = getModuleProgress(courseSlug, unitSlug, lessonSlug);

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {previousLessonSlug ? (
        <Link
          href={`/courses/${courseSlug}/units/${unitSlug}/${previousLessonSlug}`}
          className="button ghost"
        >
          ← Previous
        </Link>
      ) : null}

      {nextLessonSlug ? (
        completed ? (
          <Link
            href={`/courses/${courseSlug}/units/${unitSlug}/${nextLessonSlug}`}
            className="button"
          >
            Next →
          </Link>
        ) : (
          <button type="button" className="button" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
            Complete this lesson to unlock next
          </button>
        )
      ) : null}
    </div>
  );
}

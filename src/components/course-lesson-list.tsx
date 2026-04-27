"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CourseLesson } from "@/lib/data";

type CourseLessonListProps = {
  courseSlug: string;
  lessons: CourseLesson[];
};

export function CourseLessonList({
  courseSlug,
  lessons,
}: CourseLessonListProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
  function loadCompleted() {
    const key = `progress-${courseSlug}`;
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    setCompleted(saved);
  }

  loadCompleted();

  window.addEventListener("progressUpdated", loadCompleted);
  return () => {
    window.removeEventListener("progressUpdated", loadCompleted);
  };
}, [courseSlug]);

  return (
    <ul className="stack-list">
      {lessons.map((lesson, index) => {
  const isCompleted = completed.includes(lesson.slug);

  const previousLesson = lessons[index - 1];
  const isUnlocked =
    index === 0 || completed.includes(previousLesson?.slug);

  return (
    <li key={lesson.slug}>
      {isUnlocked ? (
        <Link href={`/courses/${courseSlug}/learn/${lesson.slug}`}>
          {lesson.title} {isCompleted ? "✓" : ""}
        </Link>
      ) : (
        <span style={{ opacity: 0.5 }}>
          🔒 {lesson.title}
        </span>
      )}
    </li>
  );
})}
    </ul>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CourseLesson } from "@/lib/data";

type ContinueCourseButtonProps = {
  courseSlug: string;
  lessons: CourseLesson[];
};

export function ContinueCourseButton({
  courseSlug,
  lessons,
}: ContinueCourseButtonProps) {
  const [nextLessonSlug, setNextLessonSlug] = useState<string>("");

  useEffect(() => {
    const key = `progress-${courseSlug}`;
    const completed: string[] = JSON.parse(localStorage.getItem(key) || "[]");

    const nextLesson =
      lessons.find((lesson) => !completed.includes(lesson.slug)) ?? lessons[0];

    setNextLessonSlug(nextLesson?.slug ?? "");
  }, [courseSlug, lessons]);

  if (!nextLessonSlug) {
    return null;
  }

  return (
    <Link
      href={`/courses/${courseSlug}/learn/${nextLessonSlug}`}
      className="button"
    >
      Continue course
    </Link>
  );
}
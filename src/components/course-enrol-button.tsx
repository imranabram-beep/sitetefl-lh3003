"use client";

import Link from "next/link";
import { useEnrolment } from "@/hooks/useEnrolment";
import type { Course } from "@/lib/data";

export function CourseEnrolButton({ course }: { course: Course }) {
  const { isLoaded, isEnrolled } = useEnrolment();

  const firstUnit = course.units[0];
  const firstModule = firstUnit?.modules[0];
  const firstLessonHref =
    firstUnit && firstModule
      ? `/courses/${course.slug}/units/${firstUnit.slug}/${firstModule.slug}`
      : `/courses/${course.slug}`;

  if (!isLoaded) {
    return (
      <button className="button" disabled style={{ opacity: 0.5 }}>
        Loading…
      </button>
    );
  }

  if (isEnrolled(course.slug)) {
    return (
      <Link href={firstLessonHref} className="button">
        Continue learning →
      </Link>
    );
  }

  return (
    <>
      <Link href={`/checkout?course=${course.slug}`} className="button">
        Enrol now — {course.price ?? "£149"}
      </Link>
      <Link href={firstLessonHref} className="button ghost">
        Preview free lesson
      </Link>
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { LessonCompleteButton } from "@/components/lesson-complete-button";
import { useProgress } from "@/lib/use-progress";

type Props = {
  courseSlug: string;
  unitSlug: string;
  moduleSlug: string;
  nextLessonSlug?: string;
};

export function ModuleCompleteAction({
  courseSlug,
  unitSlug,
  moduleSlug,
  nextLessonSlug,
}: Props) {
  const router = useRouter();
  const { isLoaded, getModuleProgress, markLessonComplete } = useProgress();

  if (!isLoaded) {
    return (
      <button type="button" disabled className="button" style={{ opacity: 0.5 }}>
        Loading progress…
      </button>
    );
  }

  const { completed } = getModuleProgress(courseSlug, unitSlug, moduleSlug);

  const handleComplete = () => {
    markLessonComplete(courseSlug, unitSlug, moduleSlug);
    if (nextLessonSlug) {
      setTimeout(() => {
        router.push(`/courses/${courseSlug}/units/${unitSlug}/${nextLessonSlug}`);
      }, 600);
    }
  };

  return <LessonCompleteButton completed={completed} onClick={handleComplete} />;
}

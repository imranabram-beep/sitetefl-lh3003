"use client";

import { useProgress } from "@/lib/use-progress";

type Props = {
  courseSlug: string;
  unitSlug: string;
  moduleSlug: string;
};

export function QuizPassAction({
  courseSlug,
  unitSlug,
  moduleSlug,
}: Props) {
  const { isLoaded, getModuleProgress, markQuizPassed } = useProgress();

  if (!isLoaded) {
    return (
      <button
        type="button"
        disabled
        style={{
          marginTop: "12px",
          padding: "10px 16px",
          background: "#999",
          color: "#fff",
          borderRadius: "999px",
          border: "none",
          cursor: "default",
        }}
      >
        Loading quiz status...
      </button>
    );
  }

  const moduleProgress = getModuleProgress(courseSlug, unitSlug, moduleSlug);
  const quizPassed = moduleProgress.quizPassed;

  return (
    <button
      type="button"
      onClick={() => markQuizPassed(courseSlug, unitSlug, moduleSlug)}
      disabled={quizPassed}
      style={{
        marginTop: "12px",
        padding: "10px 16px",
        background: quizPassed ? "#999" : "#0f4c3a",
        color: "#fff",
        borderRadius: "999px",
        border: "none",
        cursor: quizPassed ? "default" : "pointer",
      }}
    >
      {quizPassed ? "Quiz Passed" : "Mark Quiz as Passed"}
    </button>
  );
}
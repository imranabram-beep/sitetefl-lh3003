"use client";

import { useEffect, useState } from "react";
import type { LessonActivity } from "@/lib/data";
import { LessonQuiz } from "@/components/lesson-quiz";
import { ActivityTimer } from "@/components/activity-timer";
import { ActivitySort } from "@/components/activity-sort";
import { ActivityClickReveal } from "@/components/activity-click-reveal";
import { LessonCompleteButton } from "@/components/lesson-complete-button";

type Props = {
  courseSlug: string;
  lessonSlug: string;
  activity: LessonActivity;
};

export function LessonActions({ courseSlug, lessonSlug, activity }: Props) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    const key = `activity-pass-${courseSlug}-${lessonSlug}`;
    setPassed(localStorage.getItem(key) === "true");
  }, [courseSlug, lessonSlug]);

  function handlePass() {
    const key = `activity-pass-${courseSlug}-${lessonSlug}`;
    localStorage.setItem(key, "true");
    setPassed(true);
  }

  const isQuiz =
    activity.type === "quiz_multiple_choice" ||
    activity.type === "quiz_true_false";

  // ── Timer activity ──────────────────────────────────────────────
  if (activity.type === "activity_timer") {
    return (
      <div className="lesson-actions-shell">
        <ActivityTimer
          title={activity.title ?? "Activity"}
          prompt={activity.prompt}
          durationSeconds={activity.durationSeconds}
          onComplete={handlePass}
        />
        <div className="lesson-actions-footer" style={{ marginTop: "1rem" }}>
          <LessonCompleteButton courseSlug={courseSlug} lessonSlug={lessonSlug} />
        </div>
      </div>
    );
  }

  // ── Sort activity ───────────────────────────────────────────────
  if (activity.type === "activity_sort") {
    return (
      <div className="lesson-actions-shell">
        <ActivitySort
          title={activity.title ?? "Activity"}
          instruction={activity.instruction}
          items={activity.items}
          correctOrder={activity.correctOrder}
          onComplete={handlePass}
        />
        <div className="lesson-actions-footer" style={{ marginTop: "1rem" }}>
          {passed ? (
            <LessonCompleteButton courseSlug={courseSlug} lessonSlug={lessonSlug} />
          ) : (
            <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
              Get the order correct to unlock completion.
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Click reveal activity ───────────────────────────────────────
  if (activity.type === "activity_click_reveal") {
    return (
      <div className="lesson-actions-shell">
        <ActivityClickReveal
          title={activity.title ?? "Activity"}
          description={activity.description}
          instruction={activity.instruction ?? "Click each item to reveal its definition."}
          items={activity.items.map((item) => ({
            id: item.id,
            text: item.text,
            // ClickRevealItem uses isCorrect flag — for teacher roles we use
            // a separate reveal field if present, otherwise show the text
            reveal: (item as { reveal?: string }).reveal ?? item.text,
          }))}
          onComplete={handlePass}
        />
        <div className="lesson-actions-footer" style={{ marginTop: "1rem" }}>
          <LessonCompleteButton courseSlug={courseSlug} lessonSlug={lessonSlug} />
        </div>
      </div>
    );
  }

  // ── Quiz / dropdown (existing) ──────────────────────────────────
  return (
    <div className="lesson-actions-shell">
      <LessonQuiz activity={activity} onPass={handlePass} />
      {isQuiz ? (
        passed ? (
          <div className="lesson-actions-footer">
            <LessonCompleteButton courseSlug={courseSlug} lessonSlug={lessonSlug} />
          </div>
        ) : (
          <div className="quiz-fail" style={{ marginTop: "16px" }}>
            Pass the quiz before marking this lesson complete.
          </div>
        )
      ) : (
        <div className="lesson-actions-footer">
          <LessonCompleteButton courseSlug={courseSlug} lessonSlug={lessonSlug} />
        </div>
      )}
    </div>
  );
}

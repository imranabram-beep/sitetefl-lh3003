"use client";

import { useProgress } from "@/lib/use-progress";
import { makeKey } from "@/hooks/useProgress";
import type { Course } from "@/lib/data";

type Props = {
  course: Course;
};

export default function CourseProgressSummary({ course }: Props) {
  const { isLoaded, completedKeys } = useProgress();

  if (!isLoaded) {
    return (
      <section className="course-progress-card">
        <h3>Your progress</h3>
        <p>Loading progress…</p>
      </section>
    );
  }

  const allModules = course.units.flatMap((unit) =>
    unit.modules.map((mod) => ({ unit, mod }))
  );
  const totalModules = allModules.length;
  const completedModules = allModules.filter(({ unit, mod }) =>
    completedKeys.includes(makeKey(course.slug, unit.slug, mod.slug))
  ).length;

  const percent =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <section className="course-progress-card">
      <div className="course-progress-top">
        <div>
          <h3>Your progress</h3>
          <p>
            {completedModules} of {totalModules} modules complete
          </p>
        </div>
        <strong className="course-progress-percent">{percent}%</strong>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {course.units.length > 0 && (
        <div className="unit-progress-list">
          {course.units.map((unit) => {
            const unitTotal = unit.modules.length;
            const unitCompleted = unit.modules.filter((mod) =>
              completedKeys.includes(makeKey(course.slug, unit.slug, mod.slug))
            ).length;
            const unitPercent =
              unitTotal > 0 ? Math.round((unitCompleted / unitTotal) * 100) : 0;

            return (
              <div className="unit-progress-item" key={unit.slug}>
                <div className="unit-progress-head">
                  <span>{unit.title}</span>
                  <span>
                    {unitCompleted}/{unitTotal}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${unitPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

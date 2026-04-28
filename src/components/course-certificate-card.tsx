/* eslint-disable */
"use client";

import { useProgress } from "@/lib/use-progress";
import { makeKey } from "@/hooks/useProgress";

type Props = {
  course: any;
};

export default function CourseCertificateCard({ course }: Props) {
  const { isLoaded, completedKeys } = useProgress();

  if (!isLoaded) {
    return (
      <section className="course-certificate-card">
        <h3>Certificate</h3>
        <p>Checking certificate status...</p>
      </section>
    );
  }

  const allModules = course.units.flatMap((unit: any) =>
    unit.modules.map((mod: any) => ({ unit, mod }))
  );
  const totalModules = allModules.length;

  const completedModules = allModules.filter(({ unit, mod }) =>
    completedKeys.includes(makeKey(course.slug, unit.slug, mod.slug))
  ).length;

  // Certificate requirement: 80% of modules completed
  const certificateRequirement = Math.ceil(totalModules * 0.8);
  const certProgress = Math.min(
    (completedModules / certificateRequirement) * 100,
    100
  );
  const isComplete = completedModules >= certificateRequirement;
  const lessonsNeeded = Math.max(0, certificateRequirement - completedModules);

  // Determine achievements earned
  const achievements = {
    firstLesson: completedModules >= 1,
    unitMaster: completedModules >= Math.ceil(totalModules / 4),
    halfway: completedModules >= Math.ceil(totalModules / 2),
    complete: isComplete,
  };

  return (
    <section className="course-certificate-card">
      <div style={{ marginBottom: "1.5rem" }}>
        <h3>🎓 Course Certificate</h3>
        <p>
          {isComplete
            ? "🎉 Congratulations! You've earned your certificate. Download it now to showcase your achievement."
            : lessonsNeeded === 0
              ? "You're almost there! Complete a few more lessons to unlock your certificate."
              : `Complete ${lessonsNeeded} more ${lessonsNeeded === 1 ? "lesson" : "lessons"} to earn your certificate.`}
        </p>
      </div>

      <div className="cert-progress-container">
        <div className="cert-progress-bar">
          <div
            className="cert-progress-fill"
            style={{ width: `${certProgress}%` }}
          />
        </div>
        <div className="cert-progress-text">
          <span>
            {completedModules} of {certificateRequirement} modules
          </span>
          <span className="cert-progress-percent">{Math.round(certProgress)}%</span>
        </div>
      </div>

      <div style={{ marginTop: "1.25rem" }}>
        {isComplete ? (
          <button type="button" className="button" style={{ width: "100%" }}>
            📥 Download Certificate
          </button>
        ) : (
          <button
            type="button"
            className="button ghost"
            disabled
            style={{ width: "100%", opacity: 0.6, cursor: "not-allowed" }}
          >
            🔒 Certificate Locked
          </button>
        )}
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h4>Achievements</h4>
        <div className="achievements-grid">
          <div className={`achievement-badge ${achievements.firstLesson ? "earned" : "locked"}`}>
            <span className="achievement-icon">🎬</span>
            <p className="achievement-label">First Step</p>
            <p className="achievement-hint">1 lesson done</p>
          </div>

          <div className={`achievement-badge ${achievements.unitMaster ? "earned" : "locked"}`}>
            <span className="achievement-icon">🎯</span>
            <p className="achievement-label">Unit Master</p>
            <p className="achievement-hint">~{Math.ceil(totalModules / 4)} done</p>
          </div>

          <div className={`achievement-badge ${achievements.halfway ? "earned" : "locked"}`}>
            <span className="achievement-icon">⚡</span>
            <p className="achievement-label">Halfway There</p>
            <p className="achievement-hint">50% done</p>
          </div>

          <div className={`achievement-badge ${achievements.complete ? "earned" : "locked"}`}>
            <span className="achievement-icon">🏆</span>
            <p className="achievement-label">Certified</p>
            <p className="achievement-hint">Course done</p>
          </div>
        </div>
      </div>
    </section>
  );
}
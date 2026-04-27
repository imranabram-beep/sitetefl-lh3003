import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data";

import { LessonLockGuard } from "@/components/lesson-lock-guard";
import { EnrolmentGate } from "@/components/enrolment-gate";
import { LessonNavigationButtons } from "@/components/lesson-navigation-buttons";
import { ModuleCompleteAction } from "@/components/module-complete-action";
import { QuizPassAction } from "@/components/quiz-pass-action";
import { LessonActions } from "@/components/lesson-actions";

type Props = {
  params: Promise<{
    slug: string;
    unitSlug: string;
    moduleSlug: string;
  }>;
};

export default async function ModulePage({ params }: Props) {
  const { slug, unitSlug, moduleSlug } = await params;

  const course = getCourse(slug);
  if (!course) return notFound();

  const unit = course.units.find((u) => u.slug === unitSlug);
  if (!unit) return notFound();

  const moduleIndex = unit.modules.findIndex((m) => m.slug === moduleSlug);
  if (moduleIndex === -1) return notFound();

  const module = unit.modules[moduleIndex];
  const prev = unit.modules[moduleIndex - 1];
  const next = unit.modules[moduleIndex + 1];

  const moduleLabel =
    module.kind === "lesson"
      ? "Lesson"
      : module.kind === "activity"
        ? "Activity"
        : "Quiz";

  return (
    <EnrolmentGate course={course} unitSlug={unitSlug} moduleSlug={moduleSlug}>
    <LessonLockGuard course={course} unitSlug={unitSlug} moduleSlug={moduleSlug}>
      <main className="lesson-shell">
        <section className="detail-hero">
          <div className="container narrow">
            <div className="lesson-header-meta">
              <p className="lesson-course">Course: {course.title}</p>
              <p className="lesson-unit">{unit.title}</p>
            </div>

            <div className="home-section-stack">
              <div>
                <p className="eyebrow">{moduleLabel}</p>
                <h1>{module.title}</h1>
              </div>

              <p className="lead">
                {module.overview ??
                  `${moduleLabel} content designed to help learners progress step by step through this unit.`}
              </p>

              <div className="meta-row">
                <span className="pill">{moduleLabel}</span>
                {module.duration ? <span className="pill">{module.duration}</span> : null}
                {module.video ? <span className="pill">Video lesson</span> : null}
                {module.activity ? <span className="pill">Interactive task</span> : null}
              </div>
            </div>
          </div>
        </section>

        <section className="lesson-content">
          <div className="container narrow">
            <div className="lesson-content-inner">
              {module.video ? (
                <div className="light-panel lesson-panel">
                  <div className="lesson-video-wrap">
                    <video className="lesson-video" controls>
                      <source src={module.video.videoSrc} type="video/mp4" />
                    </video>

                    <div className="lesson-video-actions">
                      <span>▶ Watch the lesson</span>
                      {module.video.transcript?.length ? (
                        <span>📄 Transcript included below</span>
                      ) : null}
                      {module.video.downloadable ? (
                        <span>⬇ Download available</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {module.contentBlocks?.length ? (
                <div className="light-panel lesson-panel">
                  <div className="lesson-copy">
                    {module.contentBlocks.map((block, i) => {
                      if (block.type === "text") {
                        return <p key={i}>{block.content}</p>;
                      }
                      if (block.type === "info") {
                        return (
                          <div key={i} className="lesson-info-box">
                            <strong>{block.title}</strong>
                            {block.content.map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                          </div>
                        );
                      }
                      if (block.type === "bullets") {
                        return (
                          <ul key={i}>
                            {block.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.type === "activity_intro") {
                        return (
                          <div key={i} className="lesson-activity-intro">
                            <strong>{block.title}</strong>
                            <p>{block.content}</p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ) : null}

              {module.video?.transcript?.length ? (
                <div className="light-panel lesson-panel lesson-transcript-panel">
                  <h3>Transcript</h3>
                  <div className="lesson-copy">
                    {module.video.transcript.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ) : null}

              {module.activity ? (
                <div className="quiz-card lesson-panel">
                  <LessonActions
                    courseSlug={course.slug}
                    lessonSlug={module.slug}
                    activity={module.activity}
                  />
                </div>
              ) : null}

              <div className="lesson-complete-wrap">
                <ModuleCompleteAction
                  courseSlug={course.slug}
                  unitSlug={unit.slug}
                  moduleSlug={module.slug}
                  nextLessonSlug={next?.slug}
                />

                {module.kind === "quiz" ? (
                  <QuizPassAction
                    courseSlug={course.slug}
                    unitSlug={unit.slug}
                    moduleSlug={module.slug}
                  />
                ) : null}
              </div>

              <div className="lesson-nav">
                <div className="lesson-nav-side">
                  {prev ? (
                    <>
                      <span className="lesson-nav-label">Previous lesson</span>
                      <span className="lesson-nav-title">{prev.title}</span>
                    </>
                  ) : (
                    <span className="lesson-nav-empty">Start of unit</span>
                  )}
                </div>

                <div className="lesson-nav-middle">
                  <LessonNavigationButtons
                    courseSlug={course.slug}
                    unitSlug={unit.slug}
                    lessonSlug={module.slug}
                    previousLessonSlug={prev?.slug}
                    nextLessonSlug={next?.slug}
                  />
                </div>

                <div className="lesson-nav-side next">
                  {next ? (
                    <>
                      <span className="lesson-nav-label">Next lesson</span>
                      <span className="lesson-nav-title">{next.title}</span>
                    </>
                  ) : (
                    <span className="lesson-nav-empty">End of unit</span>
                  )}
                </div>
              </div>

              <div className="lesson-back-link">
                <Link href={`/courses/${course.slug}`} className="button ghost">
                  Back to course overview
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LessonLockGuard>
    </EnrolmentGate>
  );
}

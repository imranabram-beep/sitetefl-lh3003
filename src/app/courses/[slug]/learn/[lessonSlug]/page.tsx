import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data";
import type { LessonActivity } from "@/lib/data";
import { LessonActions } from "@/components/lesson-actions";
import { LessonNavigationButtons } from "@/components/lesson-navigation-buttons";

type LessonPageProps = {
  params: {
    slug: string;
    lessonSlug: string;
  };
};

type LessonPageLesson = {
  slug: string;
  title: string;
  content?: string;
  videoSrc?: string;
  transcript?: string[];
  quiz: LessonActivity;
};

type CourseWithLessons = {
  slug: string;
  title: string;
  lessons: LessonPageLesson[];
};

export default function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonSlug } = params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const courseWithLessons = course as unknown as CourseWithLessons;
  const lessons = courseWithLessons.lessons ?? [];

  const lessonIndex = lessons.findIndex(
    (lesson: LessonPageLesson) => lesson.slug === lessonSlug
  );

  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = lessons[lessonIndex];
  const previousLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : undefined;
  const nextLesson =
    lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : undefined;

  return (
    <main>
      <section
        className="section hero detail-hero"
        style={{ paddingTop: "24px", paddingBottom: "16px" }}
      >
        <div className="container">
          <p className="eyebrow">Course lesson</p>
          <h1>{lesson.title}</h1>
          <p className="lead">{courseWithLessons.title}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "16px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 0.6fr",
              gap: "14px",
              alignItems: "start",
            }}
          >
            <article className="card" style={{ padding: "0" }}>
              <h2 style={{ marginBottom: "8px", padding: "12px 12px 0 12px" }}>
                Lesson
              </h2>

              <p
                style={{
                  marginBottom: "12px",
                  fontSize: "14px",
                  opacity: 0.8,
                  padding: "0 12px",
                }}
              >
                {lesson.content}
              </p>

              {lesson.videoSrc ? (
                <div style={{ padding: "12px" }}>
                  <video
                    controls
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                      background: "#000",
                    }}
                  >
                    <source src={lesson.videoSrc} type="video/mp4" />
                  </video>
                </div>
              ) : null}
            </article>

            <aside className="card light-panel" style={{ padding: "14px" }}>
              <h3 style={{ marginBottom: "10px", fontSize: "16px" }}>
                Navigation
              </h3>

              <LessonNavigationButtons
                courseSlug={courseWithLessons.slug}
                lessonSlug={lesson.slug}
                previousLessonSlug={previousLesson?.slug}
                nextLessonSlug={nextLesson?.slug}
              />
            </aside>
          </div>

          <article
            className="card"
            style={{
              padding: "18px",
              marginTop: "12px",
              maxWidth: "900px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Transcript</h3>

            {lesson.transcript && lesson.transcript.length > 0 ? (
              lesson.transcript.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  style={{
                    marginTop: index === 0 ? 0 : "10px",
                    lineHeight: 1.6,
                    fontSize: "15px",
                  }}
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p>No transcript available.</p>
            )}
          </article>

          <article
            className="card"
            style={{ padding: "16px", marginTop: "12px" }}
          >
            <LessonActions
              courseSlug={courseWithLessons.slug}
              lessonSlug={lesson.slug}
              activity={lesson.quiz}
            />
          </article>
        </div>
      </section>
    </main>
  );
}
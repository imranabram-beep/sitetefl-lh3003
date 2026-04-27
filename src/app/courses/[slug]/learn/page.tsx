import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data";
import { CourseProgress } from "@/components/course-progress";
import { CourseLessonList } from "@/components/course-lesson-list";
import { ContinueCourseButton } from "@/components/continue-course-button";

type LearnPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  return (
    <main>
      <section className="section hero detail-hero">
        <div className="container">
          <p className="eyebrow">Course learning area</p>
          <h1>{course.title}</h1>
          <p className="lead">
            Welcome to your course space. This is a simple starter learning
            page where students can view the course structure and begin working
            through the modules.
          </p>
    <CourseProgress
  courseSlug={course.slug}
  totalLessons={(course.lessons ?? []).length}
/>
        </div>
      </section>

      <section className="section">
        <div className="container detail-columns">
          <article className="card">
            <h2>Course modules</h2>
       <CourseLessonList
  courseSlug={course.slug}
  lessons={course.lessons ?? []}
/>
          </article>

          <aside className="card light-panel">
            <h3>Quick actions</h3>
            <div className="action-row" style={{ marginTop: "16px" }}>
              <Link href={`/courses/${course.slug}`} className="button ghost">
                Back to course
              </Link>
              <Link href="/courses" className="button ghost">
                All courses
              </Link>
          <ContinueCourseButton
  courseSlug={course.slug}
  lessons={course.lessons ?? []}
/>
            </div>
          </aside>
        </div>

        <div className="container" style={{ marginTop: "24px" }}>
          <article className="card">
            <h2>Course introduction</h2>
            <p>{course.intro}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
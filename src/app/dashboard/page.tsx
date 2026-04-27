import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { courses } from "@/lib/data";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const firstName = user.firstName ?? "there";

  return (
    <main>
      <section className="section detail-hero">
        <div className="container">
          <p className="eyebrow">My dashboard</p>
          <h1>Welcome back, {firstName} 👋</h1>
          <p className="lead" style={{ marginTop: "8px" }}>
            Your courses and progress are below.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <h2 style={{ marginBottom: "1.5rem" }}>Available courses</h2>
          <div className="card-grid">
            {courses.map((course) => (
              <article key={course.slug} className="card course-list-card">
                <span className="pill">TEFL course</span>
                <h3>{course.title}</h3>
                <p>{course.shortDescription ?? course.description}</p>
                <div className="course-list-meta">
                  <p>{course.units.length} units</p>
                  <p>{course.units.reduce((t, u) => t + u.modules.length, 0)} modules</p>
                  {course.price && <p>{course.price}</p>}
                </div>
                <div className="action-row" style={{ marginTop: "1rem" }}>
                  <Link href={`/courses/${course.slug}`} className="button">
                    View course
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

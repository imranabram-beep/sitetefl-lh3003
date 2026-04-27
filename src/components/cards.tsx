import Link from "next/link";
import type { Course, Destination } from "@/lib/data";

export function CourseCard({ course }: { course: Course }) {
  const moduleCount = course.units.reduce(
    (total, unit) => total + unit.modules.length,
    0,
  );

  return (
    <article className="card course-card">
      <div className="card-inner">
        <div className="course-card-top">
          <span className="pill">{course.level ?? "TEFL course"}</span>
          {course.featured ? <span className="pill">Featured</span> : null}
        </div>

        <div className="course-card-body">
          <h3>{course.title}</h3>
          <p>{course.shortDescription ?? course.description}</p>
        </div>

        <div className="meta-row">
          {course.duration ? <span>{course.duration}</span> : null}
          {course.certificate ? <span>{course.certificate}</span> : null}
          <span>{moduleCount} modules</span>
        </div>

        <div className="price-row">
          <strong>{course.price ?? "Contact us"}</strong>
        </div>

        <div className="card-actions">
          <Link href={`/courses/${course.slug}`} className="button">
            View course
          </Link>
        </div>
      </div>
    </article>
  );
}

export function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <article className="card destination-card">
      <div className="card-inner">
        <p className="eyebrow">{destination.region}</p>
        <h3>{destination.country}</h3>
        <p>{destination.overview}</p>

        <div className="stack-list compact">
          <span><strong>Salary:</strong> {destination.salary}</span>
          <span><strong>Visa:</strong> {destination.visa}</span>
          <span><strong>Demand:</strong> {destination.demand}</span>
          <span><strong>Cost:</strong> {destination.cost}</span>
        </div>

        <div className="card-actions">
          <Link
            href={`/destinations/${destination.slug}`}
            className="button ghost"
          >
            Explore market
          </Link>
        </div>
      </div>
    </article>
  );
}
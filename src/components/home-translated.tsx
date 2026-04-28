/* eslint-disable */
"use client";

import { useLocaleContext } from "@/components/locale-provider";

export function HomeDestLabel() {
  const { t } = useLocaleContext();
  return <p className="hp-dest-strip-label">{t("home_destinations_label")}</p>;
}

export function HomeCoursesEyebrow() {
  const { t } = useLocaleContext();
  return <p className="eyebrow">{t("home_courses_eyebrow")}</p>;
}

export function HomeStatsBar() {
  const { t } = useLocaleContext();
  const stats = [
    { value: "205k+", label: t("home_stats_teachers") },
    { value: "320+",  label: t("home_stats_schools") },
    { value: "24 hrs",label: t("home_stats_support") },
    { value: "4.8/5", label: t("home_stats_rating") },
  ];
  return (
    <div className="hp-stats-bar">
      <div className="container hp-stats-inner">
        {stats.map((stat, i) => (
          <div key={stat.label} className="hp-stat-item-wrap">
            <div className="hp-stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
            {i < stats.length - 1 && <div className="hp-stat-div" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeCourseEnrolBtn({ slug }: { slug: string }) {
  const { t } = useLocaleContext();
  return (
    <a href={`/courses/${slug}`} className="button hp-btn-gold hp-btn-sm">
      {t("course_enrol_now")}
    </a>
  );
}

export function HomeViewAllCourses() {
  const { t } = useLocaleContext();
  return (
    <a href="/courses" className="button ghost">
      {t("common_view_all")} {t("nav_courses").toLowerCase()}
    </a>
  );
}

export function HomeViewAllDestinations() {
  const { t } = useLocaleContext();
  return (
    <a href="/destinations" className="button ghost">
      {t("common_view_all")} {t("nav_destinations").toLowerCase()}
    </a>
  );
}

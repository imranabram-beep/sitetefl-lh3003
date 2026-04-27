import type { MetadataRoute } from "next";
import { courses, destinations } from "@/lib/data";
import { CITIES } from "@/lib/cities";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teflseaacademy.com";

const staticRoutes = [
  "",
  "/courses",
  "/blog",
  "/jobs",
  "/destinations",
  "/teach-online",
  "/become-an-english-teacher-in-asia",
  "/online-tefl-course-south-east-asia",
  "/tefl-course-thailand",
  "/tefl-course-vietnam",
  "/tefl-course-cambodia",
  "/tefl-course-malaysia",
  "/tefl-course-indonesia",
  "/tefl-course-philippines",
  "/tefl-course-laos",
  "/tefl-course-brunei",
  "/tefl-course-china",
  "/tefl-course-taiwan",
  "/blog/how-to-become-an-english-teacher-in-thailand",
  "/blog/best-tefl-course-for-south-east-asia",
  "/blog/teach-english-online-from-the-philippines",
  "/blog/tefl-requirements-by-country-in-asia",
  "/blog/how-to-become-an-english-teacher-in-vietnam",
  "/blog/do-you-need-a-degree-to-teach-english-in-asia",
  "/blog/teach-english-online-from-malaysia",
  "/blog/what-jobs-can-you-get-after-a-tefl-course",
  "/blog/is-tefl-worth-it-in-asia",
  "/blog/tefl-salary-guide-asia",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency:
      route === "" || route === "/courses" || route === "/blog" || route === "/jobs"
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/courses" || route === "/blog" || route === "/jobs" || route === "/destinations"
        ? 0.9
        : 0.8,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${SITE_URL}/courses/${course.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const destinationSlugSet = new Set<string>();
  for (const d of destinations) destinationSlugSet.add(d.slug);
  for (const c of CITIES) destinationSlugSet.add(c.slug);

  const destinationEntries: MetadataRoute.Sitemap = Array.from(destinationSlugSet).map((slug) => ({
    url: `${SITE_URL}/destinations/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...courseEntries, ...destinationEntries];
}

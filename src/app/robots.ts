import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teflseaacademy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/courses",
          "/blog",
          "/jobs",
          "/destinations",
          "/teach-online",
          "/online-tefl-course-south-east-asia",
          "/become-an-english-teacher-in-asia",
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
        ],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/api/",
          "/checkout/",
          "/login/",
          "/sign-in/",
          "/sign-up/",
          "/courses/*/learn/",
          "/courses/*/units/",
          "/enrolment-success/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

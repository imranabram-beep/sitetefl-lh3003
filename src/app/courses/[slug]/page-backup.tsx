import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/data";
import CourseProgressSummary from "@/components/course-progress-summary";
import CourseUnitsList from "@/components/course-units-list";
import CourseCertificateCard from "@/components/course-certificate-card";
import { TesterModeToggle } from "@/components/tester-mode-toggle";
import { CourseEnrolButton } from "@/components/course-enrol-button";
import { CoursePageTranslated, CourseHeroTranslated, CourseSectionLabels } from "@/components/course-page-translated";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://teflseaacademy.com";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  const title = `${course.title} | TEFL SEA Academy`;
  const description = course.description ??
    course.shortDescription ??
    `Enrol in the ${course.title} and get TEFL certified online. Study at your own pace, receive a recognised certificate and get job support across South East Asia.`;

  return {
    title,
    description,
    keywords: [
      course.title, "TEFL course", "online TEFL", "TEFL certification",
      "teach English abroad", "South East Asia teaching", "TEFL certificate",
    ],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/courses/${slug}`,
      type: "website",
      images: [
        {
          url: `/og-course-${slug}.jpg`,
          fallback: "/og-default.jpg",
          width: 1200,
          height: 630,
          alt: title,
        } as any,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/og-course-${slug}.jpg`],
    },
    alternates: {
      canonical: `/courses/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

const WHAT_YOULL_LEARN: Record<string, string[]> = {
  "120-hour-premier-online-tefl-course": [
    "Core English grammar and how to teach it effectively",
    "Lesson planning and classroom management techniques",
    "How to teach the four skills: reading, writing, listening, speaking",
    "Student engagement and error correction strategies",
    "How to teach online and manage virtual classrooms",
    "TEFL job market — what schools expect and how to apply",
  ],
  "168-hour-level-5-tefl-diploma": [
    "Everything in the 120-hour course plus advanced methodology",
    "Specialist teaching skills for different age groups",
    "Deeper language awareness and linguistic theory",
    "Materials development and curriculum design",
    "Teaching English for Specific Purposes (ESP)",
    "Career development and professional TEFL pathways",
  ],
  "30-hour-teach-english-online-course": [
    "How to choose the right online teaching platform",
    "Setting up your online classroom and tech setup",
    "Student acquisition and building a client base",
    "Engaging online lesson delivery techniques",
    "Pricing, scheduling and managing your online workload",
    "Growing from part-time to full-time online income",
  ],
};

const COURSE_FOR: Record<string, string[]> = {
  "120-hour-premier-online-tefl-course": [
    "First-time teachers with no classroom experience",
    "Graduates planning to teach in SE Asia",
    "Career changers wanting to work abroad",
    "Teachers wanting a recognised online qualification",
  ],
  "168-hour-level-5-tefl-diploma": [
    "Teachers targeting international schools",
    "Those wanting the strongest possible credentials",
    "Experienced teachers seeking formal recognition",
    "Teachers applying to competitive markets like Korea, Japan or UAE",
  ],
  "30-hour-teach-english-online-course": [
    "Teachers based in SE Asia wanting remote income",
    "Filipino and Malaysian teachers going online",
    "New graduates wanting flexible teaching work",
    "Existing teachers adding online to their income",
  ],
};

const HEADER_COLORS: Record<string, { from: string; to: string; accent: string }> = {
  "120-hour-premier-online-tefl-course": { from: "#054a3a", to: "#0a2a1e", accent: "#00c8b0" },
  "168-hour-level-5-tefl-diploma":       { from: "#0a1828", to: "#060e18", accent: "#4a9fff" },
  "30-hour-teach-english-online-course": { from: "#3a2000", to: "#1a0e00", accent: "#ffaa20" },
};

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return notFound();

  const totalModules = course.units.reduce((t, u) => t + u.modules.length, 0);
  const learn  = WHAT_YOULL_LEARN[slug] ?? [];
  const forWho = COURSE_FOR[slug] ?? [];
  const colors = HEADER_COLORS[slug] ?? { from: "#054a3a", to: "#0a2a1e", accent: "#00c8b0" };

  /* Structured data — Course */
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description ?? course.shortDescription,
    url: `${SITE_URL}/courses/${slug}`,
    provider: {
      "@type": "Organization",
      name: "TEFL SEA Academy",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: course.price?.replace("£", "") ?? "149",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/courses/${slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "847",
      bestRating: "5",
    },
    courseMode: "online",
    educationalLevel: course.level ?? "Beginner",
    inLanguage: "en",
    timeRequired: `PT${course.duration?.replace(" hours", "H") ?? "120H"}`,
  };

  return (
    <main>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* ── HERO ── */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 520 }}>

        {slug === "120-hour-premier-online-tefl-course" ? (
          <>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/course-hero-1.png')", backgroundSize: "cover", backgroundPosition: "center center" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(3,30,20,0.97) 0%, rgba(3,30,20,0.92) 45%, rgba(3,30,20,0.75) 65%, rgba(3,30,20,0.3) 100%)" }} />
          </>
        ) : (
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }} />
        )}

        {/* Depth orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-40%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: colors.accent, opacity: 0.03 }} />
          <div style={{ position: "absolute", bottom: "-30%", left: "-5%", width: "40vw", height: "40vw", borderRadius: "50%", background: colors.accent, opacity: 0.04 }} />
        </div>

        {/* Ghost duration watermark */}
        <div style={{ position: "absolute", right: "2rem", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(7rem,16vw,13rem)", fontWeight: 900, color: "rgba(255,255,255,0.012)", lineHeight: 1, letterSpacing: "-0.05em", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" as const, filter: "blur(3px)" }}>
          {course.duration?.replace(" hours","h") ?? "TEFL"}
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "clamp(2.5rem,5vw,4.5rem) 0 clamp(2rem,4vw,3.5rem)" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em", color: colors.accent, marginBottom: "1rem" }}>
            <Link href="/courses" style={{ color: colors.accent, textDecoration: "none" }}>← All courses</Link>
          </p>

          <div style={{ maxWidth: 600 }}>
            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.1rem" }}>
              {course.level && (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, background: `${colors.accent}22`, color: colors.accent, padding: "0.25rem 0.75rem", borderRadius: "999px", border: `1px solid ${colors.accent}44` }}>
                  {course.level}
                </span>
              )}
              {course.duration && (
                <span style={{ fontSize: "0.7rem", fontWeight: 700, background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.72)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
                  {course.duration}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={{ color: "#ffffff", fontSize: "clamp(2rem,4.5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "1rem", lineHeight: 1.1 }}>
              {course.title}
            </h1>

            {/* Description */}
            <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "1.05rem", lineHeight: 1.78, marginBottom: "1.75rem" }}>
              {course.description ?? course.shortDescription}
            </p>

            {/* Trust strip */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)", flexWrap: "wrap" }}>
              {[
                { icon: "⭐", text: "4.8/5 · 200,000+ teachers" },
                { icon: "🌍", text: "50+ countries" },
                { icon: "🎓", text: "Internationally recognised" },
              ].map((t, i, arr) => (
                <div key={t.text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.38rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.82)", fontWeight: 600, whiteSpace: "nowrap" as const }}>
                    <span>{t.icon}</span>{t.text}
                  </span>
                  {i < arr.length - 1 && <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)", display: "inline-block", marginLeft: "1.25rem" }} />}
                </div>
              ))}
            </div>

            {/* Icon feature row */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.35rem", marginBottom: "2.25rem", flexWrap: "nowrap" as const, overflowX: "auto" }}>
              {[
                { icon: "📚", text: `${course.units.length} units` },
                { icon: "🎬", text: `${totalModules} modules` },
                { icon: "🎓", text: "Certificate" },
                { icon: "💼", text: "Job support" },
                { icon: "🔓", text: "Lifetime access" },
              ].map((f) => (
                <span key={f.text} style={{ display: "flex", alignItems: "center", gap: "0.38rem", fontSize: "0.84rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, whiteSpace: "nowrap" as const, flexShrink: 0 }}>
                  <span style={{ fontSize: "1.05rem" }}>{f.icon}</span>{f.text}
                </span>
              ))}
            </div>

            {/* Price + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#ffffff", lineHeight: 1, letterSpacing: "-0.05em" }}>
                  {course.price ?? "£149"}
                </div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "0.25rem", fontWeight: 500 }}>
                  One-time · lifetime access
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.6rem" }}>
                <Link
                  href={`/checkout?course=${course.slug}`}
                  className="button hp-btn-gold"
                  style={{ whiteSpace: "nowrap" as const, minWidth: 220 }}
                >
                  Start teaching in {course.duration?.replace(" hours","") ?? "120"} hours →
                </Link>
                <Link
                  href={`/courses/${course.slug}/units/${course.units[0]?.slug}/${course.units[0]?.modules[0]?.slug}`}
                  className="button ghost"
                  style={{ background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.35)", color: "#ffffff", textAlign: "center" as const }}
                >
                  Preview free lesson
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ background: "#0a1f30", padding: "1.25rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container" style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { v: course.duration ?? "120 hrs", l: "Study time" },
            { v: `${course.units.length}`,     l: "Units" },
            { v: `${totalModules}`,             l: "Modules" },
            { v: "4.8/5",                       l: "Student rating" },
            { v: "24 hrs",                      l: "Support response" },
          ].map((s, i, arr) => (
            <div key={s.l} style={{ textAlign: "center", display: "flex", alignItems: "center", gap: "2rem" }}>
              <div>
                <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#00c8b0", letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontSize: "0.66rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.42)" }}>{s.l}</div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div style={{ background: "var(--bg)", padding: "3.5rem 0 5rem" }}>
        <div className="container">
          <div className="course-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem", alignItems: "start" }}>

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* What you'll learn */}
              {learn.length > 0 && (
                <div className="cd-panel reveal">
                  <h2 className="cd-panel-title"><CourseSectionLabels label="what_learn" /></h2>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.7rem" }}>
                    {learn.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                        <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--teal-soft)", color: "var(--teal-deep)", fontSize: "0.62rem", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>✓</span>
                        <span style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.58 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who this course is for */}
              {forWho.length > 0 && (
                <div className="cd-panel reveal">
                  <h2 className="cd-panel-title"><CourseSectionLabels label="who_for" /></h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {forWho.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                        <span style={{ color: "var(--teal)", fontSize: "1rem", lineHeight: 1.4, flexShrink: 0, fontWeight: 700 }}>→</span>
                        <span style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.58 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress */}
              <div className="cd-panel reveal">
                <CourseProgressSummary course={course} />
              </div>

              {/* Certificate */}
              <div className="cd-panel reveal">
                <CourseCertificateCard course={course} />
              </div>

              {/* Course roadmap */}
              <div className="cd-panel reveal">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.35rem", flexWrap: "wrap", gap: "1rem" }}>
                  <div>
                    <p style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: "0.3rem" }}>Course roadmap</p>
                    <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-strong)", margin: 0, letterSpacing: "-0.025em" }}>Learn unit by unit</h2>
                  </div>
                  <TesterModeToggle />
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.7, marginBottom: "1.35rem" }}>
                  Follow the course in order — each lesson unlocks once the previous one is complete. The first lesson is free so you can try before you enrol.
                </p>
                <CourseUnitsList course={course} />
              </div>
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="course-detail-sidebar" style={{ position: "sticky", top: "88px" }}>

              {/* Enrol card */}
              <div className="cd-sidebar-card cd-sidebar-card--primary">
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--text-strong)", letterSpacing: "-0.05em", lineHeight: 1 }}>
                  {course.price ?? "£149"}
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--muted)", marginBottom: "1.25rem", marginTop: "0.25rem", fontWeight: 500 }}>
                  One-time · lifetime access
                </div>
                <CoursePageTranslated
                  slug={course.slug}
                  price={course.price ?? "£149"}
                  firstUnitSlug={course.units[0]?.slug ?? ""}
                  firstModuleSlug={course.units[0]?.modules[0]?.slug ?? ""}
                />
                <p style={{ fontSize: "0.74rem", color: "var(--muted)", marginTop: "0.9rem", textAlign: "center" as const }}>
                  <CourseSectionLabels label="guarantee" />
                </p>
              </div>

              {/* What's included */}
              <div className="cd-sidebar-card">
                <h3 className="cd-sidebar-title"><CourseSectionLabels label="included" /></h3>
                {[
                  { icon: "📚", text: `${course.units.length} structured units` },
                  { icon: "🎬", text: `${totalModules} lessons & activities` },
                  { icon: "📝", text: "Quizzes & assessments" },
                  { icon: "🎓", text: course.certificate ?? "Digital certificate" },
                  { icon: "💼", text: "Job support & placement help" },
                  { icon: "🔓", text: "Lifetime access" },
                  { icon: "🆓", text: "First lesson free" },
                ].map((f) => (
                  <div key={f.text} className="cd-sidebar-row">
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

              {/* Destinations */}
              <div className="cd-sidebar-card">
                <h3 className="cd-sidebar-title">Where can I teach?</h3>
                {[
                  { flag: "🇹🇭", country: "Thailand",     sal: "$1,000–1,800/mo", href: "/destinations/thailand" },
                  { flag: "🇻🇳", country: "Vietnam",      sal: "$1,200–2,000/mo", href: "/destinations/vietnam" },
                  { flag: "🇰🇷", country: "South Korea",  sal: "$1,600–2,300/mo", href: "/destinations/south-korea" },
                  { flag: "🇦🇪", country: "UAE",          sal: "$2,200–4,100/mo", href: "/destinations/uae" },
                ].map((d) => (
                  <Link key={d.href} href={d.href} className="cd-sidebar-dest">
                    <span style={{ fontSize: "1.25rem" }}>{d.flag}</span>
                    <div>
                      <div style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-strong)" }}>{d.country}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--teal-deep)", fontWeight: 600 }}>{d.sal}</div>
                    </div>
                  </Link>
                ))}
                <Link href="/destinations" style={{ display: "block", marginTop: "0.9rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--teal-deep)", textDecoration: "none" }}>
                  View all destinations →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

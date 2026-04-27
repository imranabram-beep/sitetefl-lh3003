import type { Metadata } from "next";
import Link from "next/link";
import { BlogThumbnail } from "@/components/blog-image-display";
import {
  TeflCoursesIllustration,
  ThailandIllustration,
  VietnamIllustration,
  DegreeQuestionIllustration,
  RequirementsIllustration,
  CareerPathsIllustration,
  WorthItIllustration,
  OnlineTeachingIllustration,
  SalaryGuideIllustration,
} from "@/components/blog-illustrations";

export const metadata: Metadata = {
  title: "TEFL Blog & Guides | Teaching English in Asia",
  description:
    "Salary guides, country requirements, career advice and how-to articles for English teachers in Asia. TEFL requirements, salary comparisons and destination guides.",
  openGraph: {
    title: "TEFL Blog & Guides | TEFL SEA Academy",
    description:
      "Salary guides, country requirements, career advice and how-to articles for English teachers in Asia.",
    images: [{ url: "/og-blog.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/blog" },
};

const POSTS = [
  { slug: "best-tefl-course-for-south-east-asia",          category: "TEFL Guide",           title: "Best TEFL Courses for South East Asia (2026)",           sub: "Compare courses and find the right certification for your goals and budget.",                   readTime: "6 min", featured: true },
  { slug: "how-to-become-an-english-teacher-in-thailand",  category: "Country Guide",         title: "How to Become an English Teacher in Thailand",           sub: "Requirements, salaries, visa routes and job search tips for Thailand.",                       readTime: "7 min", featured: true },
  { slug: "how-to-become-an-english-teacher-in-vietnam",   category: "Country Guide",         title: "How to Become an English Teacher in Vietnam",            sub: "Everything you need to know about teaching in Vietnam in 2026.",                             readTime: "6 min", featured: false },
  { slug: "tefl-salary-guide-asia",                        category: "Salary Guide",          title: "TEFL Salary Guide for Asia (2026)",                      sub: "Compare what English teachers earn across SE Asia, East Asia and the Middle East.",           readTime: "8 min", featured: false },
  { slug: "do-you-need-a-degree-to-teach-english-in-asia", category: "TEFL Guide",            title: "Can You Teach English in Asia Without a Degree?",        sub: "Honest country-by-country breakdown of degree requirements.",                                readTime: "5 min", featured: false },
  { slug: "tefl-requirements-by-country-in-asia",          category: "Country Requirements",  title: "TEFL Requirements by Country in Asia",                   sub: "TEFL hours, degree requirements, visa routes and salary — country by country.",               readTime: "8 min", featured: false },
  { slug: "what-jobs-can-you-get-after-a-tefl-course",     category: "Career Guide",          title: "What Jobs Can You Get After a TEFL Course?",             sub: "From language centres to international schools, online platforms and corporate training.",    readTime: "6 min", featured: false },
  { slug: "is-tefl-worth-it-in-asia",                      category: "TEFL Guide",            title: "Is TEFL Worth It in Asia? (Honest 2026 Answer)",         sub: "Costs, earning potential, career outcomes and who TEFL is right for.",                       readTime: "5 min", featured: false },
  { slug: "teach-english-online-from-the-philippines",     category: "Online Teaching",       title: "How to Teach English Online from the Philippines",       sub: "Platform guide, earnings expectations and setup tips for Filipino online teachers.",          readTime: "6 min", featured: false },
  { slug: "teach-english-online-from-malaysia",            category: "Online Teaching",       title: "How to Teach English Online from Malaysia",              sub: "Platform guide and earnings expectations for Malaysian and expat online teachers.",           readTime: "5 min", featured: false },
];

// Map slugs to illustration components
const ILLUSTRATION_MAP: Record<string, any> = {
  "best-tefl-course-for-south-east-asia": TeflCoursesIllustration,
  "how-to-become-an-english-teacher-in-thailand": ThailandIllustration,
  "how-to-become-an-english-teacher-in-vietnam": VietnamIllustration,
  "tefl-salary-guide-asia": SalaryGuideIllustration,
  "do-you-need-a-degree-to-teach-english-in-asia": DegreeQuestionIllustration,
  "tefl-requirements-by-country-in-asia": RequirementsIllustration,
  "what-jobs-can-you-get-after-a-tefl-course": CareerPathsIllustration,
  "is-tefl-worth-it-in-asia": WorthItIllustration,
  "teach-english-online-from-the-philippines": OnlineTeachingIllustration,
  "teach-english-online-from-malaysia": OnlineTeachingIllustration,
};

const CATEGORY_STYLE: Record<string, { bg: string; color: string }> = {
  "TEFL Guide":           { bg: "var(--teal-soft)",            color: "var(--teal-deep)" },
  "Country Guide":        { bg: "rgba(0,120,200,0.1)",          color: "#005f90" },
  "Country Requirements": { bg: "rgba(100,60,180,0.1)",         color: "#5030a0" },
  "Salary Guide":         { bg: "var(--gold-soft)",             color: "var(--gold-deep)" },
  "Career Guide":         { bg: "rgba(200,60,60,0.1)",          color: "#a03030" },
  "Online Teaching":      { bg: "rgba(60,120,200,0.1)",         color: "#305090" },
};

export default function BlogIndexPage() {
  const featured = POSTS.filter((p) => p.featured);
  const rest     = POSTS.filter((p) => !p.featured);

  return (
    <main>

      {/* ── HERO ── */}
      <section style={{
        backgroundImage: "url('/images/Blog/Hero/hero-blog.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        padding: "5rem 0 4rem",
        minHeight: "760px",
        position: "relative",
        overflow: "visible",
      }}>
        {/* Left-to-right gradient overlay (matching Jobs page) */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(to right, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0) 75%)",
          zIndex: 1,
          pointerEvents: "none",
        }} aria-hidden="true" />

        {/* Bottom fade-to-white gradient (matching Jobs page) */}
        <div style={{
          position: "absolute",
          bottom: "-50px",
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.9) 80%, #ffffff 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }} aria-hidden="true" />

        {/* Decorative blur circles */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(154,236,219,0.15) 0%, transparent 65%)",
          filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
        }} aria-hidden="true" />

        {/* Left decorative elements */}
        <div style={{
          position: "absolute", top: "5%", left: "-2%",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
          filter: "blur(50px)", pointerEvents: "none", zIndex: 0,
        }} aria-hidden="true" />

        {/* Books decoration - left bottom */}
        <div style={{
          position: "absolute", bottom: "-10px", left: "3%",
          width: "100px", height: "120px", opacity: 0.25, zIndex: 0, pointerEvents: "none",
        }}>
          <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
            <rect x="10" y="20" width="25" height="70" fill="#17a697" rx="2" opacity="0.7" />
            <rect x="20" y="10" width="25" height="70" fill="#2db5ac" rx="2" opacity="0.6" />
            <rect x="30" y="0" width="25" height="70" fill="#0f766e" rx="2" opacity="0.8" />
          </svg>
        </div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <p className="hp-eyebrow hp-eyebrow-teal">Guides &amp; Articles</p>
          <h1 style={{
            color: "#1a1a1a", fontSize: "clamp(2.2rem,5vw,3.6rem)",
            fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08,
            marginBottom: "1rem", maxWidth: "640px",
          }}>TEFL Blog</h1>
          <p style={{
            color: "rgba(26,26,26,0.7)", fontSize: "1.05rem", lineHeight: 1.78,
            maxWidth: "520px", margin: 0,
          }}>
            Salary guides, country requirements, career advice and how-to
            articles for English teachers in Asia.
          </p>
        </div>
      </section>

      {/* ── FEATURED ARTICLES ── */}
      <section className="section" style={{
        paddingBottom: "2.5rem",
        background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)"
      }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>Featured articles</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
            marginBottom: "3rem",
          }} className="reveal-stagger">
            {featured.map((p) => {
              const cat = CATEGORY_STYLE[p.category] || { bg: "#f0f0f0", color: "#555" };
              const IllustrationComponent = ILLUSTRATION_MAP[p.slug];
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="blog-card blog-card--featured"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ marginBottom: "1rem", height: "180px" }}>
                    {IllustrationComponent && (
                      <BlogThumbnail illustration={<IllustrationComponent />} />
                    )}
                  </div>
                  <div className="blog-card-meta">
                    <span className="blog-category" style={{ background: cat.bg, color: cat.color }}>
                      {p.category}
                    </span>
                    <span className="blog-read-time">{p.readTime} read</span>
                  </div>
                  <h2 className="blog-card-title blog-card-title--lg">{p.title}</h2>
                  <p className="blog-card-sub">{p.sub}</p>
                  <span className="blog-card-link">Read article →</span>
                </Link>
              );
            })}
          </div>

          {/* ── ALL ARTICLES ── */}
          <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>All articles</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1.25rem",
          }} className="reveal-stagger">
            {rest.map((p) => {
              const cat = CATEGORY_STYLE[p.category] || { bg: "#f0f0f0", color: "#555" };
              const IllustrationComponent = ILLUSTRATION_MAP[p.slug];
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="blog-card blog-card--featured"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0.75rem",
                  }}
                >
                  <div style={{ marginBottom: "0.5rem", height: "90px" }}>
                    {IllustrationComponent && (
                      <BlogThumbnail illustration={<IllustrationComponent />} />
                    )}
                  </div>
                  <div className="blog-card-meta" style={{ padding: "0", margin: "0 0 0.3rem 0", flexDirection: "column", alignItems: "flex-start", gap: "0.1rem" }}>
                    <span className="blog-category" style={{ background: cat.bg, color: cat.color, fontSize: "0.55rem", padding: "0.15rem 0.4rem" }}>
                      {p.category}
                    </span>
                    <span className="blog-read-time" style={{ fontSize: "0.55rem" }}>{p.readTime} read</span>
                  </div>
                  <h2 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0d1f2d", margin: "0.2rem 0", lineHeight: 1.15 }}>{p.title}</h2>
                  <p style={{ fontSize: "0.7rem", color: "#4a5868", margin: "0.2rem 0", lineHeight: 1.3, flexGrow: 1 }}>{p.sub}</p>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#17a697", marginTop: "0.3rem" }}>Read article →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}

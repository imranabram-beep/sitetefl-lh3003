import type { Metadata } from "next/";
import Link from "next/link";
import Image from "next/image";
import { courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "TEFL Courses | Online Certification for South East Asia",
  description:
    "Browse our TEFL course catalog. 120-hour Premier, Level 5 Diploma and 30-hour Online specialist certifications. Internationally recognised, study at your own pace.",
  openGraph: {
    title: "TEFL Courses | TEFL SEA Academy",
    description:
      "Choose your TEFL certification path. From 120-hour to Level 5 Diploma — every course built for teaching in South East Asia.",
    images: [{ url: "/og-courses.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/courses" },
};

type ColorKey = "teal" | "navy" | "gold";

type CourseMeta = {
  colorKey: ColorKey;
  featured: boolean;
  benefits: string[];
  installment: string;
  outcome: string;
  hireRate: string;
  tag?: string;
};

type DisplayOverride = Partial<{
  title: string;
  duration: string;
  level: string;
  price: string;
  ghost: string;
  tag: string;
  shortDescription: string;
}>;

const COURSE_META: Record<string, CourseMeta> = {
  "120-hour-premier-online-tefl-course": {
    colorKey: "teal",
    featured: true,
    tag: "Most popular",
    benefits: [
      "Grammar, lesson planning & classroom skills",
      "Video lessons, quizzes & activities",
      "TEFL job market training included",
      "Internationally recognised certificate",
    ],
    installment: "or 3 × £50",
    outcome: "Start earning within 4–6 weeks",
    hireRate: "94% hired within 3 months",
  },
  "168-hour-level-5-tefl-diploma": {
    colorKey: "navy",
    featured: false,
    tag: "Advanced qualification",
    benefits: [
      "Everything in 120hr + advanced methodology",
      "300-hour professional teaching pathway",
      "Specialist units for different age groups",
      "Stronger preparation for higher-tier schools",
    ],
    installment: "or 3 × £100",
    outcome: "Qualify for higher-paying roles abroad",
    hireRate: "97% hired within 3 months",
  },
  "30-hour-teach-english-online-course": {
    colorKey: "gold",
    featured: false,
    tag: "Best for online teachers",
    benefits: [
      "Platform guide: VIPKid, iTalki & more",
      "Online classroom setup & tech toolkit",
      "Build a client base & set your own hours",
      "Earn from anywhere — no visa needed",
    ],
    installment: "One payment",
    outcome: "Start teaching online within 2–3 weeks",
    hireRate: "Flexible — go fully independent",
  },
};

const UNIT_COUNTS: Record<string, number> = {
  "120-hour-premier-online-tefl-course": 4,
  "168-hour-level-5-tefl-diploma": 6,
  "30-hour-teach-english-online-course": 2,
};

const DISPLAY_ORDER = [
  "30-hour-teach-english-online-course",
  "120-hour-premier-online-tefl-course",
  "168-hour-level-5-tefl-diploma",
];

const DISPLAY_OVERRIDES: Record<string, DisplayOverride> = {
  "168-hour-level-5-tefl-diploma": {
    title: "300-Hour Advanced TEFL Diploma",
    duration: "300 hours",
    level: "Advanced",
    price: "£299",
    ghost: "300h",
    tag: "Advanced qualification",
    shortDescription:
      "A deeper qualification path with grammar, methodology, classroom planning, and practical teaching preparation.",
  },
};

const COURSE_ILLUSTRATIONS: Record<string, string> = {
  "30-hour-teach-english-online-course":
    "/images/Courses/Placeholder/Course-PH2.svg",
  "120-hour-premier-online-tefl-course":
    "/images/Courses/Placeholder/Course-PH2.svg",
  "168-hour-level-5-tefl-diploma":
    "/images/Courses/Placeholder/Course-PH3.svg",
};

const HERO_COPY = {
  eyebrow: "All TEFL courses",
  title: "Find the right TEFL track for your goals.",
  description:
    "Three courses. Every level. Each one designed to get you classroom-ready and employer-recognised across South East Asia.",
};

const FAQS = [
  {
    q: "Are these courses internationally recognised?",
    a: "Yes. Our certificates are accepted by schools and language centres across South East Asia, including Thailand, Vietnam, Cambodia, Indonesia and Malaysia. The advanced diploma is also suitable for more competitive markets such as South Korea, Japan and international schools.",
  },
  {
    q: "How long does it take to complete?",
    a: "The 30-hour Online course can be completed in 2–3 weeks. The 120-hour course typically takes 4–6 weeks studying part-time. The 300-hour Advanced Diploma takes longer and is designed for learners who want a deeper qualification pathway. There's no fixed schedule — study at your own pace.",
  },
  {
    q: "Do I need teaching experience?",
    a: "No prior experience is required. Our courses are designed for beginners through to career changers. The 120-hour Premier and the Advanced Diploma both include practical classroom methodology from the ground up.",
  },
  {
    q: "What job support do you offer?",
    a: "Every course includes access to our job board, destination guides, CV review service and direct introductions to 320+ partner schools across the region. Our team responds to support emails within 24 hours.",
  },
];

function getIllustrationTint(colorKey: ColorKey) {
  if (colorKey === "gold") {
    return {
      outer: "linear-gradient(135deg, #fff8e8 0%, #fef3c7 100%)",
      inner: "linear-gradient(135deg, #fffdf7 0%, #fff6dd 100%)",
      ring: "rgba(180, 83, 9, 0.12)",
    };
  }

  if (colorKey === "navy") {
    return {
      outer: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
      inner: "linear-gradient(135deg, #f8fbff 0%, #eef5ff 100%)",
      ring: "rgba(29, 78, 216, 0.12)",
    };
  }

  return {
    outer: "linear-gradient(135deg, #ecfeff 0%, #ccfbf1 100%)",
    inner: "linear-gradient(135deg, #f7fffe 0%, #ecfdfa 100%)",
    ring: "rgba(13, 148, 136, 0.12)",
  };
}

function HeroSection() {
  return (
    <section
      className="page-hero"
      style={{
        position: "relative",
        minHeight: "760px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        isolation: "isolate",
        background: "#dff3f3",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          src="/images/Courses/Hero/Course-Hero.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(90deg, rgba(248,252,252,0.70) 0%, rgba(248,252,252,0.52) 22%, rgba(248,252,252,0.22) 42%, rgba(248,252,252,0.06) 62%, rgba(248,252,252,0.10) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "-50px",
          height: "200px",
          zIndex: 3,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.9) 80%, #ffffff 100%)",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 4,
          width: "100%",
          paddingTop: "9rem",
          paddingBottom: "7rem",
        }}
      >
        <div
          style={{
            maxWidth: "560px",
            padding: "2rem 2rem 2.1rem",
            borderRadius: "28px",
            background: "rgba(255,255,255,0.36)",
            border: "1px solid rgba(255,255,255,0.28)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow: "0 20px 60px rgba(15,23,42,0.10)",
          }}
        >
          <p
            className="hp-eyebrow hp-eyebrow-teal"
            style={{
              marginBottom: "1rem",
              background: "rgba(255,255,255,0.52)",
              borderColor: "rgba(15,118,110,0.10)",
              color: "#0f766e",
            }}
          >
            {HERO_COPY.eyebrow}
          </p>

          <h1
            style={{
              color: "#111827",
              fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
              fontWeight: 900,
              lineHeight: 0.94,
              letterSpacing: "-0.055em",
              margin: 0,
              maxWidth: "10ch",
              textShadow: "0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            {HERO_COPY.title}
          </h1>

          <p
            style={{
              color: "rgba(17,24,39,0.78)",
              fontSize: "1.04rem",
              lineHeight: 1.75,
              marginTop: "1.2rem",
              marginBottom: "1.55rem",
              maxWidth: "48ch",
            }}
          >
            {HERO_COPY.description}
          </p>

          <div
            style={{
              display: "flex",
              gap: "0.85rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/courses/120-hour-premier-online-tefl-course"
              className="button"
              style={{
                background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(34, 201, 154, 0.15)",
              }}
            >
              Start your journey →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CourseCard({
  slug,
}: {
  slug: string;
}) {
  const course = courses.find((c) => c.slug === slug);
  if (!course) return null;

  const meta = COURSE_META[course.slug];
  if (!meta) return null;

  const totalModules =
    course.units?.reduce(
      (total, unit) => total + (unit.modules?.length ?? 0),
      0
    ) ?? 0;

  const display = DISPLAY_OVERRIDES[course.slug] ?? {};
  const displayTitle = display.title ?? course.title;
  const displayDuration = display.duration ?? course.duration;
  const displayLevel = display.level ?? course.level;
  const displayPrice = display.price ?? course.price;
  const displayGhost = display.ghost ?? course.duration?.replace(" hours", "h");
  const displayTag = display.tag ?? meta.tag;
  const displayDescription =
    display.shortDescription ?? course.shortDescription;
  const illustrationTint = getIllustrationTint(meta.colorKey);
  const illustrationSrc = COURSE_ILLUSTRATIONS[course.slug];
  const unitCount = UNIT_COUNTS[course.slug] ?? course.units?.length ?? "—";

  return (
    <div
      className={[
        "prem-card",
        meta.featured ? "prem-card--featured" : "",
        meta.colorKey === "gold" ? "prem-card--gold" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        height: "100%",
        borderRadius: "28px",
        overflow: "hidden",
      }}
    >
      {meta.featured && <div className="prem-card-popular">Most Popular</div>}

      <div
        className="prem-card-inner"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={`prem-card-header prem-card-header--${meta.colorKey}`}>
          <div className="prem-card-glow" aria-hidden="true" />
          <span className="prem-card-ghost" aria-hidden="true">
            {displayGhost}
          </span>
          <span className="prem-card-level">{displayLevel}</span>
          <span className="prem-card-duration">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="6.5"
                cy="6.5"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.5 3.5v3l2 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {displayDuration}
          </span>
        </div>

        <div
          className="prem-card-body"
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingBottom: "1.4rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "-58px auto 1.15rem",
            }}
          >
            <div
              style={{
                width: "170px",
                height: "170px",
                borderRadius: "50%",
                background: illustrationTint.outer,
                border: `1px solid ${illustrationTint.ring}`,
                boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: illustrationTint.inner,
                  border: "6px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={illustrationSrc}
                  alt={displayTitle}
                  width={800}
                  height={800}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              minHeight: "252px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {displayTag && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background:
                    meta.colorKey === "teal"
                      ? "var(--teal-soft)"
                      : meta.colorKey === "gold"
                      ? "var(--gold-soft)"
                      : "rgba(13,31,45,0.08)",
                  color:
                    meta.colorKey === "teal"
                      ? "var(--teal-deep)"
                      : meta.colorKey === "gold"
                      ? "var(--gold-deep)"
                      : "var(--navy)",
                  padding: "0.22rem 0.68rem",
                  borderRadius: "999px",
                  marginBottom: "0.7rem",
                  alignSelf: "flex-start",
                }}
              >
                {displayTag}
              </span>
            )}

            <h2
              className="prem-card-title"
              style={{
                fontSize: "1.12rem",
                minHeight: "60px",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {displayTitle}
            </h2>

            <p
              className="prem-card-desc"
              style={{
                minHeight: "96px",
                marginBottom: "1rem",
              }}
            >
              {displayDescription}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom: "1px solid var(--line)",
                fontSize: "0.8rem",
                color: "var(--muted)",
                fontWeight: 600,
                minHeight: "66px",
                alignContent: "flex-start",
              }}
            >
              <span>📚 {unitCount} units</span>
              <span>📝 {totalModules || "—"} modules</span>
              <span>🎓 Certificate included</span>
            </div>
          </div>

          <div style={{ minHeight: "158px", marginBottom: "1rem" }}>
            <ul className="prem-card-benefits">
              {meta.benefits.map((benefit) => (
                <li key={benefit}>
                  <span className="prem-card-check" aria-hidden="true">
                    ✓
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: "auto" }}>
            <div className="prem-card-divider" />

            <div
              className="prem-card-price-row"
              style={{
                minHeight: "56px",
                alignItems: "flex-start",
              }}
            >
              <span className="prem-card-price">{displayPrice}</span>
              <span className="prem-card-price-sub">
                one-time
                <br />
                lifetime access
              </span>
            </div>

            <div
              className="prem-card-installment"
              style={{ minHeight: "36px", marginBottom: "0.95rem" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="2.5"
                  width="10"
                  height="7"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path d="M1 5h10" stroke="currentColor" strokeWidth="1.3" />
                <path
                  d="M4 8h1M7 8h1"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              {meta.installment === "One payment"
                ? "One payment — pay over time"
                : `${meta.installment} — pay over time`}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "#22c99a",
                background: "rgba(34,201,154,0.08)",
                border: "1px solid rgba(34,201,154,0.2)",
                borderRadius: "8px",
                padding: "0.45rem 0.75rem",
                minHeight: "38px",
                marginBottom: "1rem",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6.5l2.5 2.5 5.5-5"
                  stroke="#22c99a"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {meta.hireRate}
            </div>

            <Link
              href={`/courses/${course.slug}`}
              className={`prem-card-cta prem-card-cta--${
                meta.colorKey === "teal"
                  ? "teal"
                  : meta.colorKey === "gold"
                  ? "gold"
                  : "navy"
              }`}
              style={{ marginBottom: "0.8rem" }}
            >
              View course details →
            </Link>

            <div className="prem-card-outcome" style={{ minHeight: "38px" }}>
              <span
                style={{
                  color: "#22c99a",
                  fontWeight: 900,
                  fontSize: "0.8rem",
                }}
              >
                ✓
              </span>
              <strong>{meta.outcome}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComparisonSection() {
  return (
    <section className="section alt">
      <div className="container" style={{ maxWidth: 860 }}>
        <div className="reveal">
          <p className="eyebrow">Quick comparison</p>
          <h2 style={{ marginBottom: "1.75rem" }}>
            Which course is right for you?
          </h2>
        </div>

        <div
          className="reveal"
          style={{
            background: "#fff",
            border: "1.5px solid var(--line)",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            boxShadow: "var(--shadow)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.88rem",
            }}
          >
            <thead>
              <tr style={{ background: "var(--navy)", color: "#fff" }}>
                <th
                  style={{
                    padding: "1rem 1.25rem",
                    textAlign: "left",
                    fontWeight: 800,
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    padding: "1rem 1.25rem",
                    textAlign: "center",
                    fontWeight: 800,
                    color: "var(--gold)",
                  }}
                >
                  30-Hr Online
                </th>
                <th
                  style={{
                    padding: "1rem 1.25rem",
                    textAlign: "center",
                    fontWeight: 800,
                    color: "var(--teal)",
                  }}
                >
                  120-Hour
                </th>
                <th
                  style={{
                    padding: "1rem 1.25rem",
                    textAlign: "center",
                    fontWeight: 800,
                    color: "#6aadff",
                  }}
                >
                  300-Hour
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Price", "£59", "£149", "£299"],
                ["Study hours", "30 hrs", "120 hrs", "300 hrs"],
                ["Certificate", "✓", "✓", "✓ Advanced"],
                ["Job support", "✓", "✓", "✓"],
                ["Thailand / Vietnam", "—", "✓", "✓"],
                ["Korea / Japan", "—", "✓", "✓ Best"],
                ["Online teaching", "✓ Specialist", "✓", "✓"],
                ["Instalment plan", "One payment", "3 × £50", "3 × £100"],
              ].map(([feature, c1, c2, c3], index) => (
                <tr
                  key={feature}
                  style={{
                    borderTop: "1px solid var(--line)",
                    background:
                      index % 2 === 0 ? "#fff" : "var(--surface-soft)",
                  }}
                >
                  <td
                    style={{
                      padding: "0.85rem 1.25rem",
                      fontWeight: 600,
                      color: "var(--text-strong)",
                    }}
                  >
                    {feature}
                  </td>
                  <td
                    style={{
                      padding: "0.85rem 1.25rem",
                      textAlign: "center",
                      color: "var(--text)",
                      fontWeight: c1.startsWith("✓") ? 700 : 400,
                    }}
                  >
                    {c1}
                  </td>
                  <td
                    style={{
                      padding: "0.85rem 1.25rem",
                      textAlign: "center",
                      color: "var(--text)",
                      fontWeight: c2.startsWith("✓") ? 700 : 400,
                    }}
                  >
                    {c2}
                  </td>
                  <td
                    style={{
                      padding: "0.85rem 1.25rem",
                      textAlign: "center",
                      color: "var(--text)",
                      fontWeight: c3.startsWith("✓") ? 700 : 400,
                    }}
                  >
                    {c3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section
      className="section"
      style={{ paddingTop: "3rem", paddingBottom: "5rem" }}
    >
      <div className="container" style={{ maxWidth: 1200 }}>
        <div className="reveal" style={{ marginBottom: "2rem" }}>
          <p className="eyebrow">Common questions</p>
          <h2>Before you enrol</h2>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              style={{
                background: "#fff",
                border: "1.5px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                padding: "1.35rem 1.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--text-strong)",
                  marginBottom: "0.65rem",
                  letterSpacing: "-0.02em",
                }}
              >
                {faq.q}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  lineHeight: 1.72,
                  margin: 0,
                }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CoursesPage() {
  return (
    <main>
      <HeroSection />

      <section
        id="course-cards"
        className="section"
        style={{
          paddingTop: "0",
          marginTop: "-72px",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div className="container">
          <div className="course-cards-grid reveal-stagger">
            {DISPLAY_ORDER.map((slug) => (
              <CourseCard key={slug} slug={slug} />
            ))}
          </div>
        </div>
      </section>

      <ComparisonSection />
      <FAQSection />
    </main>
  );
}
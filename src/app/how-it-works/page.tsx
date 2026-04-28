/* eslint-disable */
import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/site-shell";
import "../how-it-works.css";

export const metadata: Metadata = {
  title: "How It Works | TEFL Course Process",
  description:
    "Follow our clear 4-step path from course enrolment to your first teaching role. Get classroom-ready in 4–6 weeks with accredited TEFL training.",
  keywords: ["TEFL certification process", "how to get TEFL certificate", "TEFL course steps", "teaching job abroad"],
};

export default function HowItWorksPage() {
  const steps = [
    {
      n: "01",
      title: "Choose your course",
      body: "Pick the TEFL pathway that suits your goals — 120-hour, Level 5 Diploma, or Online specialist.",
      details: [
        "Flexible scheduling options",
        "Learn at your own pace",
        "No fixed start or end dates",
        "Access lifetime course materials",
      ],
    },
    {
      n: "02",
      title: "Study online",
      body: "Complete video lessons, activities and quizzes at your own pace. No fixed schedule.",
      details: [
        "Interactive video lessons",
        "Practical activities & assignments",
        "Progress tracking",
        "Support from instructors",
      ],
    },
    {
      n: "03",
      title: "Get certified",
      body: "Pass your assessments and receive your TEFL certificate, recognised across Asia.",
      details: [
        "Rigorous assessment process",
        "Internationally recognised credentials",
        "Digital & physical certificate",
        "Job market ready within weeks",
      ],
    },
    {
      n: "04",
      title: "Land your job",
      body: "Use our destination guides, job board and placement support to secure your first role.",
      details: [
        "Access exclusive job board",
        "Destination-specific guides",
        "Placement support team",
        "Visa & relocation assistance info",
      ],
    },
  ];

  return (
    <main>
      {/* ── HERO ── */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)" }}>
        <div className="container" style={{ maxWidth: 820, textAlign: "center" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#00b09b",
            }}>
              Four-Step Path
            </span>
          </div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.033em",
            color: "#223548",
            margin: "0 0 1rem 0",
          }}>
            From sign-up to first day of school
          </h1>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "#3a5060",
            margin: 0,
          }}>
            A clear four-step path from course enrolment to your first teaching role abroad. Get classroom-ready in as little as 4–6 weeks.
          </p>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── STEPS SECTION ── */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.n} className="step-card">
                <span className="step-number">{step.n}</span>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                <ul className="step-details">
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── PATHWAYS SECTION ── */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#223548",
              margin: "0 0 1rem 0",
            }}>
              Choose your TEFL pathway
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "#3a5060",
              lineHeight: 1.7,
            }}>
              Each course is designed to be flexible, accredited-style, and job-market focused. Start within days, graduate within weeks.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}>
            <div style={{
              padding: "2rem",
              background: "white",
              border: "2px solid rgba(34, 201, 154, 0.2)",
              borderRadius: "12px",
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#223548", margin: "0 0 0.75rem 0" }}>
                120-Hour Beginner
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#3a5060", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                Perfect for absolute beginners. Grammar, lesson planning, classroom management.
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fd9000", margin: "0 0 1rem 0" }}>
                £149
              </p>
              <Link href="/courses/120-hour-premier-online-tefl-course" style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
                color: "white",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.3s ease",
              }}>
                Enrol now →
              </Link>
            </div>

            <div style={{
              padding: "2rem",
              background: "white",
              border: "2px solid rgba(15, 47, 47, 0.2)",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(34, 201, 154, 0.12)",
            }}>
              <div style={{
                display: "inline-block",
                padding: "0.4rem 0.75rem",
                background: "#fd9000",
                color: "white",
                fontSize: "0.65rem",
                fontWeight: 700,
                borderRadius: "6px",
                marginBottom: "1rem",
              }}>
                MOST POPULAR
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#223548", margin: "0 0 0.75rem 0" }}>
                168-Hour Level 5
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#3a5060", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                Advanced diploma. Specialist skills for international schools and competitive markets.
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fd9000", margin: "0 0 1rem 0" }}>
                £299
              </p>
              <Link href="/courses/168-hour-level-5-tefl-diploma" style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "linear-gradient(135deg, #0f766e 0%, #0d5c5c 100%)",
                color: "white",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}>
                Enrol now →
              </Link>
            </div>

            <div style={{
              padding: "2rem",
              background: "white",
              border: "2px solid rgba(253, 144, 0, 0.2)",
              borderRadius: "12px",
            }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#223548", margin: "0 0 0.75rem 0" }}>
                30-Hour Online
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#3a5060", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
                Specialist online teaching. Digital classroom tools and platform guides.
              </p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fd9000", margin: "0 0 1rem 0" }}>
                £59
              </p>
              <Link href="/courses/30-hour-teach-english-online-course" style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "#fd9000",
                color: "white",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}>
                Enrol now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── CTA SECTION ── */}
      <section style={{ padding: "4rem 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#223548",
            margin: "0 0 1rem 0",
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontSize: "1rem",
            color: "#3a5060",
            lineHeight: 1.7,
            margin: "0 0 2rem 0",
          }}>
            Enrol today and join thousands of teachers worldwide. You'll be classroom-ready in as little as 4–6 weeks.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/courses" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}>
              View all courses →
            </Link>
            <Link href="/destinations" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "white",
              color: "#00b09b",
              border: "2px solid #00b09b",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}>
              Explore destinations →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

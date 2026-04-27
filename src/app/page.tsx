import type { Metadata } from "next";
import Link from "next/link";
import { SectionIntro } from "@/components/site-shell";
import { Hero } from "@/components/Hero";
import { Pathfinder } from "@/components/Pathfinder";
import { SuccessStories } from "@/components/SuccessStories";
import { TrustSection } from "@/components/trust-section";
import { DreamSection } from "@/components/dream-section";
import { HomeQuickLinks } from "@/components/home-quick-links";
import { TeaserCTA } from "@/components/home-teaser-cta";
import {
  HomeDestLabel,
  HomeStatsBar,
  HomeViewAllCourses,
  HomeViewAllDestinations,
} from "@/components/home-translated";
import { CompactCourseCard } from "@/components/compact-course-card";
import { courses } from "@/lib/data";

export const metadata: Metadata = {
  title: "Online TEFL Courses | Start Teaching in South East Asia",
  description:
    "TEFL courses built for teachers heading to Thailand, Vietnam, South Korea and beyond. Accredited-style training, practical classroom modules, and job support across SE Asia.",
};

const COURSE_ILLUSTRATIONS: Record<string, string> = {
  "30-hour-teach-english-online-course":
    "/images/Courses/Placeholder/Course-PH2.svg",
  "120-hour-premier-online-tefl-course":
    "/images/Courses/Placeholder/Course-PH2.svg",
  "168-hour-level-5-tefl-diploma":
    "/images/Courses/Placeholder/Course-PH3.svg",
};

const CARD_META: Record<string, {
  colorKey: "teal" | "navy" | "gold";
  featured: boolean;
  benefits: string[];
  installment: string;
  outcome: string;
  ctaLabel: string;
}> = {
  "120-hour-premier-online-tefl-course": {
    colorKey: "teal",
    featured: true,
    benefits: [
      "Grammar, lesson planning & classroom skills",
      "Video lessons, activities & quizzes",
      "TEFL job market training included",
      "Internationally recognised certificate",
    ],
    installment: "or 3 × £50 — pay over time",
    outcome: "Start earning within 4–6 weeks of enrolling",
    ctaLabel: "Enrol now — £149",
  },
  "168-hour-level-5-tefl-diploma": {
    colorKey: "navy",
    featured: false,
    benefits: [
      "Everything in 120hr course + advanced units",
      "Level 5 — highest available qualification",
      "Specialist skills for international schools",
      "Strongest for Korea, Japan & competitive markets",
    ],
    installment: "or 3 × £100 — pay over time",
    outcome: "Qualify for higher-paying roles abroad",
    ctaLabel: "Enrol now — £299",
  },
  "30-hour-teach-english-online-course": {
    colorKey: "gold",
    featured: false,
    benefits: [
      "Platform guide: VIPKid, iTalki & more",
      "Online classroom setup & tech toolkit",
      "Build a client base & set your own hours",
      "Earn from anywhere in SE Asia",
    ],
    installment: "One-time payment — best value",
    outcome: "Start teaching online within 2–3 weeks",
    ctaLabel: "Enrol now — £59",
  },
};

const destinationStrip = [
  { flag: "🇹🇭", name: "Thailand",    salary: "THB 35–60k/mo" },
  { flag: "🇻🇳", name: "Vietnam",     salary: "USD 1,200–2,000/mo" },
  { flag: "🇰🇷", name: "South Korea", salary: "KRW 2.1–3.0m/mo" },
  { flag: "🇰🇭", name: "Cambodia",    salary: "USD 900–1,500/mo" },
  { flag: "🇮🇩", name: "Indonesia",   salary: "USD 1,000–2,000/mo" },
  { flag: "🇱🇦", name: "Laos",        salary: "USD 700–1,200/mo" },
  { flag: "🇯🇵", name: "Japan",       salary: "JPY 250–350k/mo" },
  { flag: "🇨🇳", name: "China",       salary: "CNY 12–25k/mo" },
  { flag: "🇲🇾", name: "Malaysia",    salary: "MYR 3,500–6,000/mo" },
  { flag: "🇹🇼", name: "Taiwan",      salary: "TWD 55–80k/mo" },
  { flag: "🇲🇲", name: "Myanmar",     salary: "USD 800–1,400/mo" },
  { flag: "🇵🇭", name: "Philippines", salary: "USD 700–1,200/mo" },
];

export default function HomePage() {
  const featuredCourses = courses.slice(0, 3);

  return (
    <main>

      {/* ── HERO ── */}
      <Hero />

      {/* ── STATS BAR ── */}
      <HomeStatsBar />

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── DESTINATION STRIP ── */}
      <div className="hp-dest-strip">
        <div className="container">
          <HomeDestLabel />
          <div className="hp-dest-chips reveal-stagger">
            {destinationStrip.map((d) => (
              <Link href="/destinations" key={d.name} className="hp-dest-chip">
                <span className="hp-chip-flag">{d.flag}</span>
                <span>
                  <span className="hp-chip-name">{d.name}</span>
                  <span className="hp-chip-sal">{d.salary}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

{/* ── PATHFINDER ── */}
<Pathfinder />

{/* ── SUCCESS STORIES ── */}
<SuccessStories />

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── PREMIUM COURSE CARDS ── */}
      <section className="section" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)",
      }}>
        <div className="container">
          <div className="section-heading reveal">
            <SectionIntro
              eyebrow="TEFL courses"
              title="Choose your certification path"
              body="From a focused 120-hour course to a full Level 5 diploma — each pathway is designed to get you classroom-ready and employer-recognised across SE Asia."
            />
          </div>

          <div className="course-cards-grid reveal-stagger">
            {featuredCourses.map((course) => {
              const meta = CARD_META[course.slug] ?? {
                colorKey: "teal" as const,
                featured: false,
                benefits: [],
                installment: "",
                outcome: "",
                ctaLabel: "Enrol now",
              };
              const illustration = COURSE_ILLUSTRATIONS[course.slug];
              return (
                <CompactCourseCard
                  key={course.slug}
                  slug={course.slug}
                  title={course.title}
                  shortDescription={course.shortDescription}
                  price={course.price}
                  duration={course.duration}
                  level={course.level}
                  illustration={illustration}
                  meta={meta}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STAGE 9 — PAYMENT SECTION
          Right after pricing — removes hesitation
      ══════════════════════════════════════════ */}
      {/* <PaymentSection /> */}

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── TRUST SECTION ── */}
      <TrustSection />

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── DREAM SECTION ── */}
      <DreamSection />

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── WHY ASIA ── */}
      <section className="hp-asia-banner" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)",
      }}>
        <div className="container hp-asia-inner">
          <div className="hp-asia-text reveal-left">
            <p className="hp-eyebrow hp-eyebrow-teal">Why teach in Asia?</p>
            <h2>Competitive salaries.<br />Low cost of living.<br />High demand for teachers.</h2>
            <p>South East Asia has one of the world&apos;s fastest-growing English learning markets. Schools in Thailand, Vietnam, Korea and beyond actively recruit TEFL-certified teachers — many offering housing support, visa assistance, and return flights.</p>
            <Link href="/jobs" className="button">Find live jobs</Link>
          </div>
          <div className="hp-asia-stats reveal-stagger">
            <div className="hp-asia-stat"><strong>320+</strong><span>Partner schools across SEA</span></div>
            <div className="hp-asia-stat"><strong>12 countries</strong><span>Active job placement</span></div>
            <div className="hp-asia-stat"><strong>24 hrs</strong><span>Job support response</span></div>
            <div className="hp-asia-stat"><strong>Included</strong><span>Job board with every course</span></div>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── DESTINATIONS TEASER ── */}
      <section className="section alt" style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)",
      }}>
        <div className="container">
          <div className="section-heading reveal">
            <SectionIntro
              eyebrow="Teach abroad"
              title="Where will you go?"
              body="Compare salaries, visa routes, demand levels and cost of living across 12+ teaching destinations in South East and East Asia."
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <TeaserCTA href="/destinations" label="Explore all destinations" />
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── HOW IT WORKS TEASER ── */}
      <section className="section alt">
        <div className="container">
          <div className="section-heading reveal">
            <SectionIntro
              eyebrow="Your journey"
              title="Four steps to your dream job"
              body="From course selection to your first day teaching abroad — a clear, proven path."
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <TeaserCTA href="/how-it-works" label="See the complete path" />
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── QUICK LINKS SECTION ── */}
      <HomeQuickLinks />

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── BOTTOM CTA — Stage 10 ── */}
      <section className="hp-cta-strip">
        <div className="container hp-cta-inner reveal">

          {/* Left — headline + reassurance */}
          <div>
            <h2>Ready to start your global<br />teaching journey?</h2>
            <p>Enrol today and be classroom-ready in as little as 4–6 weeks.</p>

            {/* SEA reassurance pills */}
            <div className="cta-reassurance">
              <span className="cta-reassurance-pill">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l2.5 2.5 5.5-5" stroke="#22c99a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Flexible payments available
              </span>
              <span className="cta-reassurance-pill">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l2.5 2.5 5.5-5" stroke="#22c99a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start with low upfront cost
              </span>
              <span className="cta-reassurance-pill">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l2.5 2.5 5.5-5" stroke="#22c99a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                30-day money-back guarantee
              </span>
            </div>
          </div>

          {/* Right — CTAs + trust */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0" }}>
            <div className="hp-cta-actions">
              <Link href="/courses" className="button">
                Start your journey
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: "0.4rem" }}>
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/sign-up" className="button ghost">
                Create free account
              </Link>
            </div>
            <div className="cta-trust-line">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4 5V3.5a2 2 0 014 0V5" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              No credit card required
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

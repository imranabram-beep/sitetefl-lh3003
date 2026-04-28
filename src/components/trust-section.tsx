/* eslint-disable */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const STATS = [
  { value: 205000, display: "205k+", label: "Teachers trained globally",    suffix: ""  },
  { value: 94,     display: "94%",   label: "Job placement within 3 months",suffix: "%" },
  { value: 12,     display: "12",    label: "Countries with active partners",suffix: ""  },
  { value: 4.8,    display: "4.8",   label: "Average student rating",       suffix: "★", isDecimal: true },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    flag: "🇹🇭",
    location: "Bangkok, Thailand",
    role: "Primary school teacher, 2 yrs",
    quote: "I went from zero teaching experience to landing a role in Bangkok within 3 weeks of getting certified. The job support team emailed schools on my behalf — that was the difference.",
    rating: 5,
    avatar: "PS",
    color: "#c97055",
    course: "120-Hour Premier",
    outcome: "Hired in 3 weeks",
  },
  {
    name: "Amir Halim",
    flag: "🇲🇾",
    location: "Kuala Lumpur, Malaysia",
    role: "Online English tutor",
    quote: "Coming from Malaysia, I was nervous about teaching online. The 30-hour course gave me a real structure for building lessons. I now have 18 regular students on iTalki.",
    rating: 5,
    avatar: "AH",
    color: "#4a7ac9",
    course: "30-Hr Online Course",
    outcome: "18 regular students",
  },
  {
    name: "Mei Lin",
    flag: "🇻🇳",
    location: "Ho Chi Minh City, Vietnam",
    role: "Language centre teacher",
    quote: "I studied while working full time and finished in 6 weeks. The methodology units were genuinely excellent — very practical. My centre uses techniques I learned directly from the course.",
    rating: 5,
    avatar: "ML",
    color: "#4aaa6a",
    course: "168-Hr Level 5 Diploma",
    outcome: "Promoted in 4 months",
  },
  {
    name: "James Thornton",
    flag: "🇰🇷",
    location: "Seoul, South Korea",
    role: "Hagwon teacher, 3 yrs",
    quote: "Korea is competitive — schools want Level 5 or higher. The diploma opened doors that the 120-hour wouldn't have. My salary package includes housing, flights and pension.",
    rating: 5,
    avatar: "JT",
    color: "#7a5ac9",
    course: "168-Hr Level 5 Diploma",
    outcome: "Full package inc. housing",
  },
  {
    name: "Nadia Santos",
    flag: "🇵🇭",
    location: "Philippines → Online",
    role: "Full-time online teacher",
    quote: "As a Filipino teacher, the online course was perfect. I teach 6 hours a day from home and earn more than my previous office job. The platform guide alone was worth the price.",
    rating: 5,
    avatar: "NS",
    color: "#c97055",
    course: "30-Hr Online Course",
    outcome: "Replaced full-time salary",
  },
  {
    name: "Tom Davies",
    flag: "🇨🇳",
    location: "Chengdu, China",
    role: "International school teacher",
    quote: "Customer support is genuinely responsive — I had questions about China visa requirements and got a detailed reply within a few hours. Felt supported the whole way through.",
    rating: 5,
    avatar: "TD",
    color: "#4a7ac9",
    course: "120-Hour Premier",
    outcome: "Placed in 5 weeks",
  },
];

const LOGOS = [
  { name: "The Guardian",   abbr: "The Guardian" },
  { name: "Forbes",         abbr: "Forbes" },
  { name: "BBC",            abbr: "BBC" },
  { name: "Lonely Planet",  abbr: "Lonely Planet" },
  { name: "Time Out",       abbr: "Time Out" },
];

const SUPPORT = [
  { icon: "💬", svgIcon: "M12 2C13.1 2 14 2.9 14 4v8c0 1.1-.9 2-2 2h-8l-4 4V4c0-1.1.9-2 2-2h12zm-2 8h-6v-2h6v2zm0-3H4v-2h8v2z", title: "24-hour job support",   body: "Email any question — visa, salary negotiation, school contracts — and get a reply within 24 hours." },
  { icon: "📋", svgIcon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm0 18H6V4h12v16zm-2-7H8v-2h4v2zm0-4H8V7h4v2z", title: "CV & cover letter help", body: "We review your teacher CV and tailor it for the country and school type you're targeting." },
  { icon: "🗺️", svgIcon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z", title: "Destination guides",    body: "Detailed salary data, visa requirements and hiring timelines for every major SEA market." },
  { icon: "🏢", svgIcon: "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 15h-2v-2h2v2zm0-4h-2V9h2v4z", title: "School introductions",  body: "Direct introductions to 320+ partner schools across Thailand, Vietnam, Korea and beyond." },
];

/* ─────────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────────── */
function useCountUp(target: number, isDecimal = false, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isDecimal, duration]);

  return { count, ref };
}

/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="trust-stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M7 1l1.55 3.14 3.47.5-2.51 2.45.59 3.45L7 8.77l-3.1 1.77.59-3.45L2 4.64l3.47-.5L7 1z"
            fill={i <= rating ? "#e09418" : "rgba(0,0,0,0.12)"}
          />
        </svg>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   STAT ITEM
───────────────────────────────────────────── */
function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const { count, ref } = useCountUp(stat.value, stat.isDecimal);

  const display = stat.isDecimal
    ? count.toFixed(1) + stat.suffix
    : stat.value >= 1000
    ? (count / 1000).toFixed(0) + "k+"
    : count + stat.suffix;

  return (
    <div className="trust-stat">
      <strong ref={ref as React.RefObject<HTMLElement>} className="trust-stat-value">
        {display}
      </strong>
      <span className="trust-stat-label">{stat.label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function TrustSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="trust-section" aria-label="Social proof and trust indicators">

      {/* ── Background layers ── */}
      <div className="trust-bg-orb trust-bg-orb--1" aria-hidden="true" />
      <div className="trust-bg-orb trust-bg-orb--2" aria-hidden="true" />

      <div className="container trust-container">

        {/* ── Section label ── */}
        <div className="trust-header reveal">
          <p className="hp-eyebrow hp-eyebrow-teal">Trusted by teachers across Asia</p>
          <h2 className="trust-heading">Join 205,000+ teachers<br />who made the move.</h2>
          <p className="trust-subheading">
            Real outcomes. Real placements. Real support — from your first lesson to your first paycheque abroad.
          </p>
        </div>

        {/* ── Stats row — count-up ── */}
        <div className="trust-stats reveal-stagger">
          {STATS.map((s) => <StatItem key={s.label} stat={s} />)}
        </div>

        {/* ── "As seen in" logos ── */}
        <div className="trust-logos reveal">
          <span className="trust-logos-label">As featured in</span>
          <div className="trust-logos-row">
            {LOGOS.map((l) => (
              <div key={l.name} className="trust-logo" aria-label={l.name}>
                {l.abbr}
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials grid ── */}
        <div className="trust-testi-grid reveal-stagger">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`trust-testi-card ${i === 0 ? "trust-testi-card--featured" : ""}`}
            >
              {/* Header */}
              <div className="trust-testi-head">
                {/* Avatar */}
                <div
                  className="trust-avatar"
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>

                <div className="trust-testi-meta">
                  <span className="trust-testi-name">
                    {t.name} <span className="trust-testi-flag">{t.flag}</span>
                  </span>
                  <span className="trust-testi-loc">{t.location}</span>
                  <span className="trust-testi-role">{t.role}</span>
                </div>

                <Stars rating={t.rating} size={13} />
              </div>

              {/* Quote */}
              <blockquote className="trust-testi-quote">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Footer tags */}
              <div className="trust-testi-foot">
                <span className="trust-testi-course">{t.course}</span>
                <span className="trust-testi-outcome">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path d="M1.5 5.5l2.5 2.5 5.5-5" stroke="#22c99a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Support pillars ── */}
        <div className="trust-support reveal-stagger">
          {SUPPORT.map((s) => (
            <div key={s.title} className="trust-support-item">
              <span className="trust-support-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d={s.svgIcon} fill="#17a697" />
                </svg>
              </span>
              <div>
                <strong className="trust-support-title">{s.title}</strong>
                <p className="trust-support-body">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="trust-cta reveal">
          <Link href="/courses" className="button">
            Start your journey today
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: "0.4rem" }}>
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <p className="trust-cta-note">
            30-day money-back guarantee &nbsp;·&nbsp; Lifetime course access &nbsp;·&nbsp; Certificate included
          </p>
        </div>

      </div>
    </section>
  );
}

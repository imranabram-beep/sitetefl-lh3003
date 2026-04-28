/* eslint-disable */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   LOCATION CARDS — income + vibe per country
───────────────────────────────────────────── */
const LOCATIONS = [
  {
    flag: "🇹🇭",
    country: "Thailand",
    city: "Bangkok & Chiang Mai",
    salary: "£1,200–2,000",
    period: "/month",
    vibe: "Street food, temples & 30°C year-round",
    demand: "Very High",
    demandClass: "dvh",
    color: "#00836b",
    img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=75&auto=format&fit=crop",
  },
  {
    flag: "🇻🇳",
    country: "Vietnam",
    city: "Hanoi & Ho Chi Minh City",
    salary: "£1,000–1,700",
    period: "/month",
    vibe: "Fast-growing market, low cost of living",
    demand: "High",
    demandClass: "dh",
    color: "#005f8a",
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=75&auto=format&fit=crop",
  },
  {
    flag: "🇰🇷",
    country: "South Korea",
    city: "Seoul & Busan",
    salary: "£1,700–2,600",
    period: "/month",
    vibe: "Housing included, flights paid, high salaries",
    demand: "Very High",
    demandClass: "dvh",
    color: "#5a4aaa",
    img: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=75&auto=format&fit=crop",
  },
  {
    flag: "🇵🇭",
    country: "Philippines",
    city: "Online — teach from home",
    salary: "£500–1,400",
    period: "/month",
    vibe: "No visa needed. Work from your own home.",
    demand: "High",
    demandClass: "dh",
    color: "#7a4800",
    img: "https://images.unsplash.com/photo-1551406483-3731d1997540?w=800&q=75&auto=format&fit=crop",
  },
];

/* ─────────────────────────────────────────────
   LIFESTYLE PILLARS
───────────────────────────────────────────── */
const PILLARS = [
  {
    icon: "✈️",
    title: "Work from anywhere",
    body: "Teach in a classroom, a language centre, or from your laptop. Your certificate travels with you.",
  },
  {
    icon: "💰",
    title: "Earn above local average",
    body: "English teachers earn well above local salaries in every SEA market — often with housing on top.",
  },
  {
    icon: "🌏",
    title: "Build a global life",
    body: "Every country, every school, every city is a new chapter. Most teachers stay longer than they planned.",
  },
  {
    icon: "🕐",
    title: "Flexible by design",
    body: "School hours, private lessons, or online sessions — you choose how and when you teach.",
  },
];

/* ─────────────────────────────────────────────
   LOCATION CARD COMPONENT
───────────────────────────────────────────── */
function LocationCard({ loc, index }: { loc: typeof LOCATIONS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`dream-loc-card ${hovered ? "dream-loc-card--hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ "--loc-color": loc.color } as React.CSSProperties}
    >
      {/* Background image */}
      <div
        className="dream-loc-img"
        style={{ backgroundImage: `url(${loc.img})` }}
        aria-hidden="true"
      />

      {/* Gradient overlays */}
      <div className="dream-loc-overlay-dark"   aria-hidden="true" />
      <div className="dream-loc-overlay-color"  aria-hidden="true"
        style={{ background: `linear-gradient(160deg, ${loc.color}55 0%, transparent 60%)` }}
      />

      {/* Content */}
      <div className="dream-loc-content">
        {/* Top row */}
        <div className="dream-loc-top">
          <span className="dream-loc-flag">{loc.flag}</span>
          <span className={`dream-loc-demand dc-demand ${loc.demandClass}`}>{loc.demand} demand</span>
        </div>

        {/* Country + city */}
        <div className="dream-loc-place">
          <h3 className="dream-loc-country">{loc.country}</h3>
          <p className="dream-loc-city">{loc.city}</p>
        </div>

        {/* Salary — the number that makes people lean in */}
        <div className="dream-loc-salary">
          <span className="dream-loc-salary-value">{loc.salary}</span>
          <span className="dream-loc-salary-period">{loc.period}</span>
        </div>

        {/* Vibe line */}
        <p className="dream-loc-vibe">{loc.vibe}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export function DreamSection() {
  return (
    <section className="dream-section" aria-label="Lifestyle and income opportunities">

      {/* Ambient background shapes */}
      <div className="dream-orb dream-orb--1" aria-hidden="true" />
      <div className="dream-orb dream-orb--2" aria-hidden="true" />
      <div className="dream-orb dream-orb--3" aria-hidden="true" />

      <div className="container dream-container">

        {/* ── SPLIT HEADER ── */}
        <div className="dream-header reveal">
          <div className="dream-header-left">
            <p className="hp-eyebrow hp-eyebrow-teal">The life that comes with it</p>
            <h2 className="dream-headline">
              Work from anywhere.<br />
              <span className="dream-headline-em">Teach globally.</span>
            </h2>
          </div>
          <div className="dream-header-right">
            <p className="dream-intro">
              A TEFL certificate isn&apos;t just a qualification. It&apos;s the key to a
              different kind of life — one where your office has a view, your salary
              goes further, and every weekend is an adventure.
            </p>
            <Link href="/destinations" className="dream-explore-link">
              Compare all destinations
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── LOCATION CARDS GRID ── */}
        <div className="dream-locations reveal-stagger">
          {LOCATIONS.map((loc, i) => (
            <LocationCard key={loc.country} loc={loc} index={i} />
          ))}
        </div>

        {/* ── LIFESTYLE PILLARS ── */}
        <div className="dream-pillars reveal-stagger">
          {PILLARS.map((p) => (
            <div key={p.title} className="dream-pillar">
              <span className="dream-pillar-icon" aria-hidden="true">{p.icon}</span>
              <h4 className="dream-pillar-title">{p.title}</h4>
              <p className="dream-pillar-body">{p.body}</p>
            </div>
          ))}
        </div>

        {/* ── ASPIRATIONAL QUOTE STRIP ── */}
        <div className="dream-quote reveal">
          <blockquote className="dream-quote-text">
            &ldquo;I came for one year. I stayed for five. Thailand gave me a career,
            a community, and a life I couldn&apos;t have imagined at home.&rdquo;
          </blockquote>
          <cite className="dream-quote-attr">
            — Sarah M., teaching in Chiang Mai
            <span className="dream-quote-flag">🇹🇭</span>
          </cite>
        </div>

        {/* ── CTA ROW ── */}
        <div className="dream-cta reveal">
          <Link href="/courses" className="button">
            Start your journey
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: "0.4rem" }}>
              <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}

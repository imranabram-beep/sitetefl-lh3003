"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export function SeoHero({
  eyebrow,
  h1,
  sub,
  badge,
}: {
  eyebrow: string;
  h1: string;
  sub: string;
  badge?: string;
}) {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #d4eff5 0%, #c8f7f0 100%)",
        color: "#1a1a1a",
        padding: "4.5rem 0",
      }}
    >
      <div className="container" style={{ maxWidth: 980 }}>
        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#22d3ee",
            margin: "0 0 1rem",
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
            margin: "0 0 1rem",
            color: "#fff",
            maxWidth: 760,
          }}
        >
          {h1}
        </h1>
        <p
          style={{
            fontSize: "1.02rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.76)",
            margin: 0,
            maxWidth: 720,
          }}
        >
          {sub}
        </p>
        {badge ? (
          <div
            style={{
              marginTop: "1.25rem",
              display: "inline-flex",
              padding: "0.45rem 0.9rem",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.92)",
              fontSize: "0.82rem",
              fontWeight: 700,
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function BlogHero({
  category,
  h1,
  sub,
  readTime,
}: {
  category: string;
  h1: string;
  sub: string;
  readTime: string;
}) {
  return (
    <section
      style={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        backgroundImage: "url('/images/Blog/Hero/hero-blog.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#1a1a1a",
        padding: "5rem 0 4rem",
        minHeight: "760px",
        overflow: "visible",
      }}
    >
      {/* Left-to-right gradient overlay (matching Jobs page) */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0) 75%)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

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
      }} />

      {/* Floating books decoration - left side */}
      <div style={{
        position: "absolute",
        top: "12%",
        left: "1%",
        width: "110px",
        height: "140px",
        opacity: 0.5,
        zIndex: 2,
        pointerEvents: "none",
      }}>
        <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <rect x="5" y="10" width="20" height="50" fill="#17a697" rx="2" opacity="0.9" />
          <rect x="10" y="5" width="20" height="50" fill="#2db5ac" rx="2" opacity="0.7" />
          <rect x="15" y="0" width="20" height="50" fill="#0f766e" rx="2" opacity="0.8" />
          <line x1="10" y1="15" x2="30" y2="15" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
          <line x1="12" y1="28" x2="32" y2="28" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Floating plant decoration - right side */}
      <div style={{
        position: "absolute",
        bottom: "8%",
        right: "2%",
        width: "100px",
        height: "130px",
        opacity: 0.45,
        zIndex: 2,
        pointerEvents: "none",
      }}>
        <svg viewBox="0 0 50 80" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <ellipse cx="25" cy="70" rx="12" ry="8" fill="#10b981" opacity="0.8" />
          <path d="M 25 70 Q 15 55 12 35 Q 10 20 25 10 Q 40 20 38 35 Q 35 55 25 70" fill="#10b981" />
          <ellipse cx="20" cy="45" rx="6" ry="12" fill="#059669" opacity="0.8" />
          <ellipse cx="30" cy="30" rx="5" ry="10" fill="#059669" opacity="0.8" />
          <ellipse cx="25" cy="20" rx="4" ry="8" fill="#34d399" opacity="0.6" />
        </svg>
      </div>

      <div className="container" style={{ maxWidth: 980, position: "relative", zIndex: 4 }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#22d3ee",
              margin: 0,
            }}
          >
            {category}
          </p>
          <span style={{ fontSize: "0.72rem", color: "#22d3ee", fontWeight: 700 }}>•</span>
          <p
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#22d3ee",
              margin: 0,
            }}
          >
            {readTime}
          </p>
        </div>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
            margin: "0 0 1rem",
            color: "#fff",
            maxWidth: 760,
          }}
        >
          {h1}
        </h1>
        <p
          style={{
            fontSize: "1.02rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.76)",
            margin: 0,
            maxWidth: 720,
          }}
        >
          {sub}
        </p>
      </div>
    </section>
  );
}

export function StatBar({
  stats,
}: {
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <section style={{ background: "transparent", padding: "1.25rem 0" }}>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1rem",
          maxWidth: 980,
        }}
      >
        {stats.map((stat) => (
          <div
            key={`${stat.value}-${stat.label}`}
            style={{
              textAlign: "center",
              padding: "0.75rem",
              borderRadius: 16,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <div
              style={{
                color: "#00b09b",
                fontWeight: 900,
                fontSize: "1.15rem",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                color: "#223548",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: "0.2rem",
                fontWeight: 700,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SeoH2({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "1.75rem",
        lineHeight: 1.2,
        letterSpacing: "-0.03em",
        margin: "2rem 0 0.8rem",
        color: "#0d1f2d",
      }}
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        margin: "0 0 1rem",
        fontSize: "1rem",
        lineHeight: 1.8,
        color: "#4a5868",
      }}
    >
      {children}
    </p>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ paddingLeft: "1.2rem", margin: "0 0 1.1rem" }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            marginBottom: "0.6rem",
            lineHeight: 1.7,
            color: "#334155",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function CourseCTA({
  heading,
  sub,
  className,
}: {
  heading: string;
  sub: string;
  className?: string;
}) {
  return (
    <section
      className={className || undefined}
      style={!className ? {
        margin: "2rem 0",
        padding: "2.5rem",
        borderRadius: 16,
        background: "linear-gradient(135deg, #12263a 0%, #0d3528 100%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "2rem",
        flexWrap: "wrap",
      } : undefined}
    >
      <div className={className ? "blog-cta-content" : undefined} style={!className ? undefined : { flex: 1 }}>
        <h3 style={!className ? { margin: "0 0 0.5rem", color: "#fff", fontSize: "1.35rem", fontWeight: 800 } : { margin: "0 0 0.5rem" }}>
          {heading}
        </h3>
        <p style={!className ? { margin: 0, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 600 } : { margin: 0 }}>
          {sub}
        </p>
      </div>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
        <Link
          href="/courses"
          className={className ? "blog-cta-button" : undefined}
          style={!className ? {
            display: "inline-flex",
            minHeight: 44,
            alignItems: "center",
            padding: "0.75rem 1.5rem",
            borderRadius: 8,
            background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(34, 201, 154, 0.15)",
          } : undefined}
        >
          View TEFL Courses
        </Link>
      </div>
    </section>
  );
}

export function FAQBlock({
  faqs,
  useBlogStyling,
}: {
  faqs: Array<{ q: string; a: string }>;
  useBlogStyling?: boolean;
}) {
  if (useBlogStyling) {
    return (
      <section className="blog-faq-section">
        <h2 className="blog-faq-heading">Frequently asked questions</h2>
        <div className="blog-faq-items">
          {faqs.map((faq) => (
            <div key={faq.q} className="blog-faq-item">
              <h3 className="blog-faq-question">{faq.q}</h3>
              <p className="blog-faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <SeoH2>Frequently asked questions</SeoH2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {faqs.map((faq) => (
          <div
            key={faq.q}
            style={{
              background: "#fff",
              border: "1px solid #dce5ef",
              borderRadius: 18,
              padding: "1.1rem 1.2rem",
            }}
          >
            <h3
              style={{
                margin: "0 0 0.5rem",
                fontSize: "1rem",
                color: "#0d1f2d",
              }}
            >
              {faq.q}
            </h3>
            <p style={{ margin: 0, lineHeight: 1.75, color: "#4a5868" }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RelatedLinks({
  links,
  useBlogStyling,
}: {
  links: Array<{ href: string; label: string; desc: string }>;
  useBlogStyling?: boolean;
}) {
  if (useBlogStyling) {
    return (
      <section className="blog-related-section">
        <h2 className="blog-related-heading">Related guides</h2>
        <div className="blog-related-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="blog-related-link"
            >
              <strong className="blog-related-link-label">{link.label}</strong>
              <span className="blog-related-link-desc">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: "2rem" }}>
      <SeoH2>Related guides</SeoH2>
      <div style={{ display: "grid", gap: "0.9rem" }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: "block",
              textDecoration: "none",
              background: "#fff",
              border: "1px solid #dce5ef",
              borderRadius: 18,
              padding: "1rem 1.1rem",
              color: "inherit",
            }}
          >
            <strong style={{ display: "block", color: "#0d1f2d", marginBottom: "0.2rem" }}>
              {link.label}
            </strong>
            <span style={{ color: "#64748b", lineHeight: 1.7 }}>{link.desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SalaryTable({
  rows,
}: {
  rows: Array<{ country: string; flag: string; salary: string; usd: string; demand: string }>;
}) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "1.5rem",
      }}>
        <thead>
          <tr style={{ borderBottom: "2px solid rgba(34, 201, 154, 0.2)" }}>
            <th style={{
              textAlign: "left",
              padding: "0.75rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#223548",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>Country</th>
            <th style={{
              textAlign: "left",
              padding: "0.75rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#223548",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>Local Currency</th>
            <th style={{
              textAlign: "left",
              padding: "0.75rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#223548",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>USD Equivalent</th>
            <th style={{
              textAlign: "left",
              padding: "0.75rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#223548",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>Demand</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.country} style={{
              borderBottom: "1px solid rgba(34, 201, 154, 0.1)",
            }}>
              <td style={{
                padding: "1rem 0.75rem",
                fontSize: "0.95rem",
                color: "#223548",
                fontWeight: 500,
              }}>
                <span style={{ marginRight: "0.5rem" }}>{row.flag}</span>{row.country}
              </td>
              <td style={{
                padding: "1rem 0.75rem",
                fontSize: "0.95rem",
                color: "#3a5060",
              }}>
                {row.salary}
              </td>
              <td style={{
                padding: "1rem 0.75rem",
                fontSize: "0.95rem",
                color: "#3a5060",
                fontWeight: 600,
              }}>
                {row.usd}
              </td>
              <td style={{
                padding: "1rem 0.75rem",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}>
                <span style={{
                  display: "inline-block",
                  padding: "0.3rem 0.75rem",
                  background: row.demand === "Very High" ? "rgba(253, 144, 0, 0.15)" : "rgba(34, 201, 154, 0.1)",
                  color: row.demand === "Very High" ? "#fd9000" : "#00b09b",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}>
                  {row.demand}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

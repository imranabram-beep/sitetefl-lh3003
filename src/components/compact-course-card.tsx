"use client";

import Link from "next/link";
import Image from "next/image";

type ColorKey = "teal" | "navy" | "gold";

type CourseMeta = {
  colorKey: ColorKey;
  featured: boolean;
  benefits: string[];
  installment: string;
  outcome: string;
  ctaLabel: string;
};

interface CompactCourseCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  price: string;
  duration?: string;
  level?: string;
  illustration?: string;
  meta: CourseMeta;
}

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

export function CompactCourseCard({
  slug,
  title,
  shortDescription,
  price,
  duration,
  level,
  illustration,
  meta,
}: CompactCourseCardProps) {
  const illustrationTint = getIllustrationTint(meta.colorKey);
  const displayGhost = duration?.replace(" hours", "h") || "";

  return (
    <div
      className={[
        "prem-card",
        "prem-card--compact",
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
          <span className="prem-card-level">{level}</span>
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
            {duration}
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
          {/* Illustration */}
          {illustration && (
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
                  {illustration && (
                    <Image
                      src={illustration}
                      alt={title}
                      width={200}
                      height={200}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Title */}
          <h3
            className="prem-card-title"
            style={{
              marginBottom: "0.5rem",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="prem-card-desc" style={{ marginBottom: "1rem" }}>
            {shortDescription}
          </p>

          {/* Footer - Price, CTA, Outcome */}
          <div style={{ marginTop: "auto" }}>
            <div className="prem-card-divider" />

            <div
              className="prem-card-price-row"
              style={{
                minHeight: "56px",
                alignItems: "flex-start",
              }}
            >
              <span className="prem-card-price">{price}</span>
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
              {meta.installment}
            </div>

            <Link
              href={`/courses/${slug}`}
              className={`prem-card-cta prem-card-cta--${
                meta.colorKey === "teal"
                  ? "teal"
                  : meta.colorKey === "gold"
                  ? "gold"
                  : "navy"
              }`}
              style={{ marginBottom: "0.8rem" }}
            >
              {meta.ctaLabel}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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

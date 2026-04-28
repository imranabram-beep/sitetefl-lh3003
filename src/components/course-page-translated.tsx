/* eslint-disable */
"use client";

import Link from "next/link";
import { useLocaleContext } from "@/components/locale-provider";

export function CoursePageTranslated({
  slug, price, firstUnitSlug, firstModuleSlug
}: {
  slug: string;
  price: string;
  firstUnitSlug: string;
  firstModuleSlug: string;
}) {
  const { t } = useLocaleContext();

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.65rem" }}>
      <Link
        href={`/checkout?course=${slug}`}
        style={{ display:"block", textAlign:"center", padding:"0.85rem 1.5rem", background:"linear-gradient(135deg,#c8940a,#a06800)", borderRadius:"999px", color:"#ffffff", textDecoration:"none", fontSize:"0.95rem", fontWeight:800 }}
      >
        {t("course_enrol_now")} — {price}
      </Link>
      <Link
        href={`/courses/${slug}/units/${firstUnitSlug}/${firstModuleSlug}`}
        style={{ display:"block", textAlign:"center", padding:"0.8rem 1.5rem", background:"transparent", borderRadius:"999px", border:"1.5px solid #dbe4ec", color:"#223548", textDecoration:"none", fontSize:"0.9rem", fontWeight:700 }}
      >
        {t("course_preview")}
      </Link>
    </div>
  );
}

export function CourseHeroTranslated({
  slug, price, duration, firstUnitSlug, firstModuleSlug, accentColor
}: {
  slug: string;
  price: string;
  duration: string;
  firstUnitSlug: string;
  firstModuleSlug: string;
  accentColor: string;
}) {
  const { t } = useLocaleContext();

  return (
    <>
      {/* Instant access badge */}
      <span style={{ fontSize: "0.72rem", fontWeight: 700, background: "rgba(255,200,0,0.15)", color: "#ffd060", padding: "0.25rem 0.7rem", borderRadius: "999px", border: "1px solid rgba(255,200,0,0.2)" }}>
        {t("course_instant")}
      </span>

      {/* Trust strip */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.82)", fontWeight: 600, whiteSpace: "nowrap" as const }}>
          <span>⭐</span> {t("course_trust_rating")}
        </div>
        <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.82)", fontWeight: 600, whiteSpace: "nowrap" as const }}>
          <span>🌍</span> {t("course_trust_countries")}
        </div>
        <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.82)", fontWeight: 600, whiteSpace: "nowrap" as const }}>
          <span>🎓</span> {t("course_trust_recognised")}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" as const }}>
        <div>
          <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#ffffff", lineHeight: 1 }}>{price}</div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginTop: "0.2rem" }}>{t("course_lifetime")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.5rem" }}>
          <Link
            href={`/checkout?course=${slug}`}
            style={{ display: "inline-block", padding: "0.85rem 1.75rem", background: "linear-gradient(135deg,#c8940a,#a06800)", borderRadius: "999px", color: "#ffffff", textDecoration: "none", fontSize: "0.95rem", fontWeight: 800, whiteSpace: "nowrap" as const }}
          >
            {t("course_start_cta")} {duration} →
          </Link>
          <Link
            href={`/courses/${slug}/units/${firstUnitSlug}/${firstModuleSlug}`}
            style={{ display: "inline-block", padding: "0.6rem 1.25rem", background: "rgba(255,255,255,0.08)", borderRadius: "999px", border: "1.5px solid rgba(255,255,255,0.45)", color: "#ffffff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, textAlign: "center" as const }}
          >
            {t("course_preview")}
          </Link>
        </div>
      </div>
    </>
  );
}

export function CourseSectionLabels({ label }: { label: "what_learn" | "who_for" | "included" | "back" | "guarantee" }) {
  const { t } = useLocaleContext();
  const map = {
    what_learn: t("course_what_learn"),
    who_for:    t("course_who_for"),
    included:   t("course_included"),
    back:       t("course_back"),
    guarantee:  t("course_guarantee"),
  };
  return <span>{map[label]}</span>;
}

"use client";

import Link from "next/link";
import { useLocaleContext } from "@/components/locale-provider";

export function DestBackLink() {
  const { t } = useLocaleContext();
  return (
    <Link href="/destinations" style={{ color: "#00c8b0", textDecoration: "none" }}>
      {t("dest_back")}
    </Link>
  );
}

export function DestTeachIn({ city }: { city: string }) {
  const { t } = useLocaleContext();
  return <>{t("dest_teach_in")} {city}</>;
}

export function DestDemandBadge({ demand }: { demand: string }) {
  const { t } = useLocaleContext();
  const DEMAND_COLOR: Record<string, string> = {
    "Very High": "#007850", "High": "#005f90", "Medium": "#7a5000", "Low": "#555555",
  };
  const DEMAND_BG: Record<string, string> = {
    "Very High": "rgba(0,160,100,0.1)", "High": "rgba(0,120,200,0.1)",
    "Medium": "rgba(140,90,0,0.08)", "Low": "rgba(100,100,100,0.08)",
  };
  const label = demand === "Very High" ? t("dest_very_high")
    : demand === "High" ? t("dest_high")
    : demand === "Medium" ? t("dest_medium")
    : t("dest_low");

  return (
    <span style={{
      background: DEMAND_BG[demand] ?? "transparent",
      color: DEMAND_COLOR[demand] ?? "#fff",
      padding: "0.15rem 0.6rem",
      borderRadius: "4px",
    }}>{label}</span>
  );
}

export function DestSectionLabel({ label }: {
  label: "highlights" | "visa" | "why" | "sectors" | "other_cities" | "ready" | "find_jobs" | "salary" | "demand"
}) {
  const { t } = useLocaleContext();
  const map: Record<string, string> = {
    highlights:   t("dest_highlights"),
    visa:         t("dest_visa"),
    why:          t("dest_why"),
    sectors:      t("dest_sectors"),
    other_cities: t("dest_more_cities"),
    ready:        t("dest_ready"),
    find_jobs:    t("dest_find_jobs"),
    salary:       t("dest_salary"),
    demand:       t("dest_demand"),
  };
  return <>{map[label]}</>;
}

export function DestCTA({ country, city, countryParam }: { country: string; city: string; countryParam: string }) {
  const { t } = useLocaleContext();
  return (
    <div style={{ background: "linear-gradient(135deg,#12263a,#0d3528)", borderRadius: "16px", padding: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" as const }}>
      <div>
        <h3 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.4rem" }}>
          {t("dest_ready")} {country}?
        </h3>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>
          Get TEFL certified and find teaching jobs in {city} today.
        </p>
      </div>
      <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" as const }}>
        <Link href={`/jobs?country=${countryParam}`} className="button hp-btn-gold">
          {t("dest_find_jobs")} {country} →
        </Link>
        <Link href="/courses" className="button ghost hp-btn-ghost-nav">
          {t("common_view_all")} TEFL courses
        </Link>
      </div>
    </div>
  );
}

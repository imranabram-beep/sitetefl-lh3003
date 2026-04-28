/* eslint-disable */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CITIES, DEMAND_STYLE } from "@/lib/cities";
import { useLocaleContext } from "@/components/locale-provider";

// ── Region/subregion structure ─────────────────────────
const REGION_CONFIG = [
  { id: "asia",     label: "Asia",     emoji: "🌏",
    subs: ["South-Eastern Asia","Eastern Asia","Southern Asia","Western Asia","Central Asia"] },
  { id: "europe",   label: "Europe",   emoji: "🏰",
    subs: ["Western Europe","Northern Europe","Southern Europe","Eastern Europe"] },
  { id: "americas", label: "Americas", emoji: "🌎",
    subs: ["Northern America","South America","Central America","Caribbean"] },
  { id: "africa",   label: "Africa",   emoji: "🌍",
    subs: ["Northern Africa","Eastern Africa","Western Africa","Southern Africa","Middle Africa"] },
  { id: "oceania",  label: "Oceania",  emoji: "🌊",
    subs: ["Australia and New Zealand","Melanesia","Polynesia","Micronesia"] },
];

const DEMAND_COLOR: Record<string,string> = {
  "Very High":"#007850","High":"#005f90","Medium":"#7a5000","Low":"#555555",
};
const DEMAND_BG: Record<string,string> = {
  "Very High":"rgba(0,160,100,0.11)","High":"rgba(0,120,200,0.11)",
  "Medium":"rgba(140,90,0,0.09)","Low":"rgba(100,100,100,0.09)",
};

export function DestinationsClient() {
  const { t } = useLocaleContext();
  const [activeRegion, setActiveRegion] = useState("asia");
  const [activeSub,    setActiveSub]    = useState("South-Eastern Asia");
  const [search,       setSearch]       = useState("");

  const region = REGION_CONFIG.find((r) => r.id === activeRegion)!;

  const filtered = useMemo(() => {
    let list = CITIES.filter((c) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        return c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q);
      }
      return c.subregion === activeSub;
    });
    // Capitals first, then alphabetical
    return list.sort((a, b) => {
      if (a.isCapital && !b.isCapital) return -1;
      if (!a.isCapital && b.isCapital) return 1;
      return a.city.localeCompare(b.city);
    });
  }, [activeSub, search]);

  const handleRegion = (id: string) => {
    const r = REGION_CONFIG.find((x) => x.id === id)!;
    setActiveRegion(id);
    setActiveSub(r.subs[0]);
    setSearch("");
  };

  const subCounts = useMemo(() =>
    Object.fromEntries(
      region.subs.map((s) => [s, CITIES.filter((c) => c.subregion === s).length])
    ),
    [region]
  );

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{ background: "#12263a", padding: "3.5rem 0 3rem" }}>
        <div className="container">
          <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.12em", color: "#00c8b0", marginBottom: "0.75rem" }}>
            Teach abroad
          </p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.85rem" }}>
            {t("dest_title")}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "560px", marginBottom: "1.75rem" }}>
            Browse teaching destinations across 518 cities and 234 countries. Compare salaries, demand levels and visa routes — then search live jobs.
          </p>
          {/* Search */}
          <div style={{ position: "relative", maxWidth: "400px" }}>
            <input
              type="text"
              placeholder={t("dest_search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", height: "46px", padding: "0 1rem 0 2.75rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", color: "#ffffff", fontSize: "0.9rem", outline: "none", fontFamily: "inherit" }}
            />
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.45)", fontSize: "1rem", pointerEvents: "none" }}>🔍</span>
          </div>
        </div>
      </div>

      {/* ── REGION TABS ── */}
      {!search && (
        <div style={{ background: "#ffffff", borderBottom: "2px solid #dbe4ec", position: "sticky", top: "80px", zIndex: 10 }}>
          <div className="container">
            <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none" as const }}>
              {REGION_CONFIG.map((r) => (
                <button key={r.id} onClick={() => handleRegion(r.id)} style={{
                  all: "unset" as any,
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.85rem 1.1rem",
                  borderBottom: activeRegion === r.id ? "3px solid #00b09b" : "3px solid transparent",
                  color: activeRegion === r.id ? "#007a6a" : "#7a8898",
                  fontSize: "0.85rem", fontWeight: 600, fontFamily: "inherit",
                  cursor: "pointer", whiteSpace: "nowrap" as const,
                  transition: "color 0.15s",
                }}>
                  <span>{r.emoji}</span>{r.label}
                  <span style={{ fontSize: "0.7rem", background: activeRegion === r.id ? "rgba(0,176,155,0.12)" : "rgba(0,0,0,0.06)", color: activeRegion === r.id ? "#007a6a" : "#9aa8b8", borderRadius: "999px", padding: "0.1rem 0.45rem", fontWeight: 700 }}>
                    {CITIES.filter((c) => REGION_CONFIG.find((x) => x.id === r.id)!.subs.includes(c.subregion)).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUBREGION TABS ── */}
      {!search && (
        <div style={{ background: "#f4f7fb", borderBottom: "1px solid #dbe4ec", padding: "0" }}>
          <div className="container">
            <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", scrollbarWidth: "none" as const, padding: "0.75rem 0" }}>
              {region.subs.map((s) => (
                <button key={s} onClick={() => setActiveSub(s)} style={{
                  all: "unset" as any,
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.45rem 0.9rem",
                  background: activeSub === s ? "#12263a" : "#ffffff",
                  border: `1px solid ${activeSub === s ? "#12263a" : "#dbe4ec"}`,
                  borderRadius: "999px",
                  color: activeSub === s ? "#ffffff" : "#7a8898",
                  fontSize: "0.8rem", fontWeight: 600, fontFamily: "inherit",
                  cursor: "pointer", whiteSpace: "nowrap" as const,
                  transition: "all 0.15s",
                }}>
                  {s}
                  <span style={{ fontSize: "0.68rem", opacity: 0.7 }}>({subCounts[s]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CITY GRID ── */}
      <div style={{ background: "#f4f7fb", padding: "2rem 0 4rem" }}>
        <div className="container">
          {search && (
            <p style={{ fontSize: "0.82rem", color: "#7a8898", marginBottom: "1.25rem" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
            </p>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#7a8898" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔍</div>
              <p style={{ fontWeight: 700, color: "#223548", marginBottom: "0.4rem" }}>No cities found</p>
              <p style={{ fontSize: "0.88rem" }}>Try a different city or country name</p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px,1fr))", gap: "0.75rem" }}>
            {filtered.map((c) => {
              const ds = DEMAND_STYLE[c.demand] || DEMAND_STYLE["Low"];
              return (
                <Link
                  key={c.slug}
                  href={`/destinations/${c.slug}`}
                  style={{ background: "#ffffff", border: `1px solid ${c.priority ? "#dbe4ec" : "#e8eef4"}`, borderRadius: "12px", padding: "1rem 1rem 0.9rem", textDecoration: "none", display: "flex", flexDirection: "column" as const, position: "relative", transition: "border-color 0.15s, box-shadow 0.15s, transform 0.15s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor="#00b09b"; el.style.boxShadow="0 4px 18px rgba(0,176,155,0.12)"; el.style.transform="translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor=c.priority?"#dbe4ec":"#e8eef4"; el.style.boxShadow="none"; el.style.transform="translateY(0)"; }}
                >
                  {/* Country top-right */}
                  <span style={{ position: "absolute", top: 8, right: 9, fontSize: "0.63rem", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.05em", color: "#9aa8b8", lineHeight: 1.3, textAlign: "right" as const, maxWidth: "55%" }}>
                    {c.country}
                  </span>
                  {/* Capital dot */}
                  {c.isCapital && (
                    <span style={{ position: "absolute", top: 8, left: 10, width: 6, height: 6, borderRadius: "50%", background: "#00b09b" }} title="Capital city" />
                  )}
                  {/* City name — large, no flag */}
                  <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#223548", lineHeight: 1.2, marginBottom: "0.28rem", marginTop: "0.2rem", paddingRight: "2.5rem" }}>
                    {c.city}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#7a8898", marginBottom: "0.65rem", lineHeight: 1.3 }}>
                    {c.salary}
                  </div>
                  <span style={{ display: "inline-block", fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: "4px", textTransform: "uppercase" as const, letterSpacing: "0.05em", background: ds.bg, color: ds.color, alignSelf: "flex-start", marginTop: "auto" }}>
                    {c.demand === "Very High" ? t("dest_very_high") : c.demand === "High" ? t("dest_high") : c.demand === "Medium" ? t("dest_medium") : t("dest_low")}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Stats footer */}
          <div style={{ marginTop: "2rem", padding: "1rem", background: "rgba(18,38,58,0.04)", borderRadius: "10px", textAlign: "center" }}>
            <p style={{ fontSize: "0.78rem", color: "#7a8898" }}>
              Showing {filtered.length} of <strong style={{ color: "#223548" }}>518 cities</strong> across <strong style={{ color: "#223548" }}>234 countries</strong> ·
              {" "}<span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00b09b", display: "inline-block" }} />Capital city</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

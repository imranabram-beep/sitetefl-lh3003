"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { useLocaleContext } from "@/components/locale-provider";

// ── Region/subregion structure ─────
const REGION_CONFIG = [
  {
    id: "asia",
    label: "Asia",
    emoji: "🌏",
    subs: [
      { name: "South-Eastern Asia" },
      { name: "Eastern Asia" },
      { name: "Southern Asia" },
      { name: "Western Asia" },
      { name: "Central Asia" },
    ],
  },
  {
    id: "europe",
    label: "Europe",
    emoji: "🏰",
    subs: [
      { name: "Western Europe" },
      { name: "Northern Europe" },
      { name: "Southern Europe" },
      { name: "Eastern Europe" },
    ],
  },
  {
    id: "americas",
    label: "Americas",
    emoji: "🌎",
    subs: [
      { name: "Northern America" },
      { name: "Central America" },
      { name: "South America" },
      { name: "Caribbean" },
    ],
  },
  {
    id: "africa",
    label: "Africa",
    emoji: "🌍",
    subs: [
      { name: "Northern Africa" },
      { name: "Western Africa" },
      { name: "Eastern Africa" },
      { name: "Southern Africa" },
      { name: "Middle Africa" },
    ],
  },
  {
    id: "oceania",
    label: "Oceania",
    emoji: "🌊",
    subs: [
      { name: "Australia and New Zealand" },
      { name: "Melanesia" },
      { name: "Polynesia" },
      { name: "Micronesia" },
    ],
  },
];

// Color gradients for each region (culturally meaningful colors)
const REGION_GRADIENTS: Record<string, { color: string; lightBg: string }> = {
  asia: { color: "#e63946", lightBg: "rgba(230, 57, 70, 0.08)" },      // Red = luck, prosperity, good fortune
  europe: { color: "#0088cc", lightBg: "rgba(0, 136, 204, 0.08)" },    // Blue = stability, trust
  americas: { color: "#ff9500", lightBg: "rgba(255, 149, 0, 0.08)" },  // Orange = energy
  africa: { color: "#d4a500", lightBg: "rgba(212, 165, 0, 0.08)" },    // Gold = prosperity, warmth
  oceania: { color: "#00b09b", lightBg: "rgba(0, 176, 155, 0.08)" },   // Teal = ocean, calm
};

// Icon mapping for regions and subregions
const ICON_MAP: Record<string, string> = {
  // Regions
  asia: "/images/Destination/Icons/regions/asia.svg",
  europe: "/images/Destination/Icons/regions/europe.svg",
  americas: "/images/Destination/Icons/regions/americas.svg",
  africa: "/images/Destination/Icons/regions/africa.svg",
  oceania: "/images/Destination/Icons/regions/oceania.svg",
  // Asia subregions
  "South-Eastern Asia": "/images/Destination/Icons/regions/southeast-asia.svg",
  "Eastern Asia": "/images/Destination/Icons/regions/eastern-asia.svg",
  "Southern Asia": "/images/Destination/Icons/regions/southern-asia.svg",
  "Western Asia": "/images/Destination/Icons/regions/western-asia.svg",
  "Central Asia": "/images/Destination/Icons/regions/central-asia.svg",
  // Europe subregions
  "Western Europe": "/images/Destination/Icons/regions/western-europe.svg",
  "Northern Europe": "/images/Destination/Icons/regions/northern-europe.svg",
  "Southern Europe": "/images/Destination/Icons/regions/southern-europe.svg",
  "Eastern Europe": "/images/Destination/Icons/regions/eastern-europe.svg",
  // Americas subregions
  "Northern America": "/images/Destination/Icons/regions/northern-america.svg",
  "Central America": "/images/Destination/Icons/regions/central-america.svg",
  "South America": "/images/Destination/Icons/regions/south-america.svg",
  "Caribbean": "/images/Destination/Icons/regions/caribbean.svg",
  // Africa subregions
  "Northern Africa": "/images/Destination/Icons/regions/northern-africa.svg",
  "Western Africa": "/images/Destination/Icons/regions/western-africa.svg",
  "Eastern Africa": "/images/Destination/Icons/regions/eastern-africa.svg",
  "Southern Africa": "/images/Destination/Icons/regions/southern-africa.svg",
  "Middle Africa": "/images/Destination/Icons/regions/middle-africa.svg",
  // Oceania subregions
  "Australia and New Zealand": "/images/Destination/Icons/regions/australia-newzealand.svg",
  "Melanesia": "/images/Destination/Icons/regions/melanesia.svg",
  "Polynesia": "/images/Destination/Icons/regions/polynesia.svg",
  "Micronesia": "/images/Destination/Icons/regions/micronesia.svg",
};

export function DestinationsMap() {
  const { t } = useLocaleContext();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubregion, setSelectedSubregion] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // Count cities by subregion
  const subCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    REGION_CONFIG.forEach((region) => {
      region.subs.forEach((sub) => {
        counts[sub.name] = CITIES.filter((c) => c.subregion === sub.name).length;
      });
    });
    return counts;
  }, []);

  // Count cities by region
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    REGION_CONFIG.forEach((region) => {
      counts[region.id] = CITIES.filter((c) =>
        region.subs.some((sub) => sub.name === c.subregion)
      ).length;
    });
    return counts;
  }, []);

  // Get cities for selected subregion (or search globally if searching without subregion)
  const selectedCities = useMemo(() => {
    let list: typeof CITIES = [];

    // If subregion is selected, filter by subregion
    if (selectedSubregion) {
      list = CITIES.filter((c) => c.subregion === selectedSubregion);
    }
    // If search is active but no subregion, search globally across all cities
    else if (search.trim()) {
      list = CITIES;
    }
    // Otherwise, no cities to show
    else {
      return [];
    }

    // Apply search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.city.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.subregion.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => {
      if (a.isCapital && !b.isCapital) return -1;
      if (!a.isCapital && b.isCapital) return 1;
      return a.city.localeCompare(b.city);
    });
  }, [selectedSubregion, search]);

  // Get current region object
  const currentRegion = selectedRegion
    ? REGION_CONFIG.find((r) => r.id === selectedRegion)
    : null;

  return (
    <div>
      {/* ── HERO ── */}
      <div style={{
        position: "relative",
        padding: "6rem 2rem",
        overflow: "visible",
        minHeight: "750px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}>
        {/* Background Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('/images/Destination/Hero/Course-Hero.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
          }}
        />

        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(18, 38, 58, 0.35)",
            zIndex: 1,
          }}
        />

        {/* Bottom Fade Gradient */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: 0,
            right: 0,
            height: "250px",
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.8) 70%, #ffffff 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Glassmorph Content Card */}
        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "650px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "20px",
              padding: "3rem 3.5rem",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#00c8b0",
                marginBottom: "0.75rem",
                margin: "0 0 0.75rem 0",
              }}
            >
              Teach abroad
            </p>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: "0.85rem",
                margin: "0 0 0.85rem 0",
              }}
            >
              {t("dest_title")}
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.75)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                marginBottom: 0,
              }}
            >
              Explore 518 teaching destinations across 234 countries. Click a region to discover subregions and cities.
            </p>
          </div>
        </div>
      </div>

      {/* ── REGION CARDS VIEW ── */}
      {!selectedRegion ? (
        <>
        {/* Show region cards or search results */}
        {!search.trim() ? (
          <div style={{ background: "#ffffff", padding: "6rem 2rem", position: "relative", overflow: "hidden", minHeight: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Faded map background */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url(/images/Destination/Map/Map.svg)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.12,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "16px",
              }}
            >
              {REGION_CONFIG.map((region) => {
                const gradients =
                  REGION_GRADIENTS[region.id as keyof typeof REGION_GRADIENTS];
                const cityCount = regionCounts[region.id] || 0;

                return (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    style={{
                      all: "unset",
                      background: "#ffffff",
                      border: `2px solid ${gradients.color}`,
                      borderRadius: "16px",
                      padding: "32px 24px",
                      cursor: "pointer",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "scale(1.05)";
                      el.style.boxShadow = `0 12px 32px ${gradients.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "scale(1)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Background glow */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: gradients.lightBg,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {/* Icon image */}
                      <img
                        src={ICON_MAP[region.id]}
                        alt={region.label}
                        style={{
                          width: "100px",
                          height: "100px",
                          marginBottom: "12px",
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))",
                        }}
                      />
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: "#223548",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {region.label}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.95rem",
                          color: gradients.color,
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {cityCount} cities
                      </p>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#7a8898",
                          marginTop: "8px",
                          opacity: 0.8,
                        }}
                      >
                        {region.subs.length} subregions
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            </div>
          </div>
        ) : (
          // ── SEARCH RESULTS VIEW ──
          <div style={{ background: "#f8f9fb", padding: "3rem 2rem" }}>
            <div className="container">
              <div style={{ marginBottom: "32px" }}>
                <button
                  onClick={() => setSearch("")}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    padding: "8px 12px",
                    color: "#7a8898",
                    fontWeight: 600,
                    marginBottom: "12px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#223548";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#7a8898";
                  }}
                >
                  ← Clear Search
                </button>
                <h2
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "2.2rem",
                    fontWeight: 800,
                    color: "#223548",
                  }}
                >
                  Search Results
                </h2>
                <p
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "0.95rem",
                    color: "#7a8898",
                  }}
                >
                  {selectedCities.length} {selectedCities.length === 1 ? "city" : "cities"} found for "{search}"
                </p>
              </div>

              {/* Search Results Grid */}
              {selectedCities.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
                    gap: "12px",
                  }}
                >
                  {selectedCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/destinations/${city.slug}`}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #dbe4ec",
                        borderRadius: "12px",
                        padding: "12px",
                        textDecoration: "none",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#00b09b";
                        el.style.boxShadow = "0 4px 18px rgba(0,176,155,0.12)";
                        el.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "#dbe4ec";
                        el.style.boxShadow = "none";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      {/* Subregion label */}
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "9px",
                          fontSize: "0.63rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          color: "#9aa8b8",
                          lineHeight: 1.3,
                          textAlign: "right",
                          maxWidth: "55%",
                        }}
                      >
                        {city.subregion}
                      </span>
                      {/* Capital dot */}
                      {city.isCapital && (
                        <span
                          style={{
                            position: "absolute",
                            top: "8px",
                            left: "10px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#00b09b",
                          }}
                          title="Capital city"
                        />
                      )}
                      {/* City name */}
                      <div
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "#223548",
                          lineHeight: 1.2,
                          marginBottom: "4px",
                          marginTop: "4px",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {city.city}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#7a8898",
                          marginBottom: "8px",
                          lineHeight: 1.3,
                        }}
                      >
                        {city.country}
                      </div>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          background: "rgba(0,176,155,0.12)",
                          color: "#007850",
                          alignSelf: "flex-start",
                          marginTop: "auto",
                        }}
                      >
                        {city.demand}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "#7a8898",
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                    🔍
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      color: "#223548",
                      marginBottom: "4px",
                    }}
                  >
                    No cities found
                  </p>
                  <p style={{ fontSize: "0.88rem" }}>
                    Try a different city, country, or region name
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SEARCH FILTERS ── */}
        <div className="destinations-filters">
          <div className="container">
            <div className="destinations-filter-row">
              {/* Context badge */}
              <div className="destinations-filter-context">
                <span className="destinations-filter-context-flag">🌍</span>
                <span className="destinations-filter-context-name">Explore</span>
              </div>

              {/* Search input group */}
              <div className="destinations-filter-group destinations-filter-wide">
                <label className="destinations-filter-label">Search</label>
                <input
                  type="text"
                  className="destinations-filter-input"
                  placeholder="Search cities or countries..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Region dropdown */}
              <div className="destinations-filter-group">
                <label className="destinations-filter-label">Region</label>
                <select
                  className="destinations-filter-select"
                  value={selectedRegion || ""}
                  onChange={(e) => setSelectedRegion(e.target.value || null)}
                >
                  <option value="">All Regions</option>
                  <option value="asia">Asia</option>
                  <option value="europe">Europe</option>
                  <option value="americas">Americas</option>
                  <option value="africa">Africa</option>
                  <option value="oceania">Oceania</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="button destinations-search-btn">
                Find Destinations
              </button>
            </div>
          </div>
        </div>

        {/* Featured Cities Section */}
        <div style={{ background: "#ffffff", padding: "3rem 0" }}>
          <div className="container">
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#223548", marginBottom: "8px" }}>
              ⭐ Trending Destinations
            </h2>
            <p style={{ color: "#7a8898", marginBottom: "32px", fontSize: "0.95rem" }}>
              Top teaching destinations with highest demand
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" }}>
              {CITIES.filter((c) => c.demand === "Very High").slice(0, 10).map((city) => (
                <Link
                  key={city.slug}
                  href={`/destinations/${city.slug}`}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #dbe4ec",
                    borderRadius: "12px",
                    padding: "16px",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#00b09b";
                    el.style.boxShadow = "0 4px 16px rgba(0,176,155,0.12)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#dbe4ec";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#9aa8b8", marginBottom: "8px" }}>
                    {city.country}
                  </span>
                  <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#223548", margin: "0 0 6px 0" }}>
                    {city.city}
                  </h4>
                  <p style={{ fontSize: "0.8rem", color: "#7a8898", margin: "0 0 8px 0" }}>
                    {city.salary}
                  </p>
                  <span style={{
                    display: "inline-block",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    background: "#007850",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    marginTop: "auto",
                    width: "fit-content",
                  }}>
                    Very High Demand
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)", padding: "3rem 0" }}>
          <div className="container">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
              {/* Total Cities & Countries */}
              <div style={{
                background: "#ffffff",
                border: "1px solid #dbe4ec",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00b09b", marginBottom: "8px" }}>
                  518
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#223548", margin: "0 0 4px 0" }}>
                  Total Cities
                </h3>
                <p style={{ color: "#7a8898", fontSize: "0.9rem", margin: 0 }}>
                  Across 234 countries worldwide
                </p>
              </div>

              {/* Average Salary Range */}
              <div style={{
                background: "#ffffff",
                border: "1px solid #dbe4ec",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#ff9500", marginBottom: "8px" }}>
                  $1.2K - $3K
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#223548", margin: "0 0 4px 0" }}>
                  Monthly Average
                </h3>
                <p style={{ color: "#7a8898", fontSize: "0.9rem", margin: 0 }}>
                  Typical teaching salaries globally
                </p>
              </div>

              {/* Demand Distribution */}
              <div style={{
                background: "#ffffff",
                border: "1px solid #dbe4ec",
                borderRadius: "16px",
                padding: "32px 24px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#e63946", marginBottom: "12px" }}>
                  <span style={{ display: "block", marginBottom: "4px" }}>📊 Demand Levels</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#7a8898", lineHeight: "1.6" }}>
                  <div>🔴 Very High: {Math.round((CITIES.filter(c => c.demand === "Very High").length / CITIES.length) * 100)}%</div>
                  <div>🔵 High: {Math.round((CITIES.filter(c => c.demand === "High").length / CITIES.length) * 100)}%</div>
                  <div>🟡 Medium: {Math.round((CITIES.filter(c => c.demand === "Medium").length / CITIES.length) * 100)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <div style={{
          background: "linear-gradient(135deg, #12263a 0%, #1a3a52 100%)",
          padding: "4rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Accent elements */}
          <div style={{
            position: "absolute",
            top: "-50px",
            right: "-100px",
            width: "300px",
            height: "300px",
            background: "rgba(0, 176, 155, 0.1)",
            borderRadius: "50%",
            pointerEvents: "none",
          }} />

          <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <h2 style={{
              fontSize: "2.2rem",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "12px",
              letterSpacing: "-0.03em",
            }}>
              Ready to Transform Your Teaching Career?
            </h2>
            <p style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "600px",
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}>
              Browse thousands of teaching positions across our featured destinations. Find the perfect role that matches your experience and aspirations.
            </p>
            <button style={{
              background: "linear-gradient(135deg, #00b09b 0%, #00c8b0 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "16px 40px",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: "0 8px 24px rgba(0, 176, 155, 0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 12px 32px rgba(0, 176, 155, 0.4)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "0 8px 24px rgba(0, 176, 155, 0.3)";
            }}
            >
              Browse Live Jobs →
            </button>
          </div>
        </div>
        </>
      ) : !selectedSubregion ? (
        // ── SUBREGION CARDS VIEW ──
        <div style={{ background: "#f8f9fb", padding: "3rem 0" }}>
          <div className="container">
            {/* Back button + title */}
            <div
              style={{
                marginBottom: "32px",
                animation: "fadeInDown 0.4s ease",
              }}
            >
              <button
                onClick={() => {
                  setSelectedRegion(null);
                  setSearch("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "8px 12px",
                  color: "#7a8898",
                  fontWeight: 600,
                  marginBottom: "12px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#223548";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#7a8898";
                }}
              >
                ← Back
              </button>
              <h2
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#223548",
                }}
              >
                {currentRegion?.emoji} {currentRegion?.label}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.95rem",
                  color: "#7a8898",
                }}
              >
                Select a subregion to explore
              </p>
            </div>

            {/* Subregion cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "16px",
              }}
            >
              {currentRegion?.subs.map((sub, idx) => {
                const gradients =
                  REGION_GRADIENTS[
                    selectedRegion as keyof typeof REGION_GRADIENTS
                  ];
                const cityCount = subCounts[sub.name] || 0;

                return (
                  <button
                    key={sub.name}
                    onClick={() => setSelectedSubregion(sub.name)}
                    style={{
                      all: "unset",
                      background: "#ffffff",
                      border: `1px solid #dbe4ec`,
                      borderRadius: "12px",
                      padding: "20px 16px",
                      cursor: "pointer",
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      animation: `fadeInUp 0.4s ease ${idx * 0.05}s backwards`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-4px)";
                      el.style.borderColor = gradients.color;
                      el.style.boxShadow = `0 8px 24px ${gradients.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.borderColor = "#dbe4ec";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Top accent bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: gradients.color,
                        transition: "height 0.2s",
                      }}
                    />

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 1, paddingTop: "4px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      {/* Subregion icon */}
                      <img
                        src={ICON_MAP[sub.name] || ICON_MAP[selectedRegion!]}
                        alt={sub.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          marginBottom: "8px",
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.08))",
                        }}
                      />
                      <h4
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 700,
                          color: "#223548",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {sub.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: gradients.color,
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {cityCount} cities
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // ── CITIES VIEW ──
        <div style={{ background: "#f8f9fb", padding: "3rem 0" }}>
          <div className="container">
            {/* Back button + title + search */}
            <div
              style={{
                marginBottom: "32px",
              }}
            >
              <button
                onClick={() => {
                  setSelectedSubregion(null);
                  setSearch("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "8px 12px",
                  color: "#7a8898",
                  fontWeight: 600,
                  marginBottom: "12px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#223548";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#7a8898";
                }}
              >
                ← Back
              </button>
              <h2
                style={{
                  margin: "0 0 4px 0",
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#223548",
                }}
              >
                {selectedSubregion}
              </h2>
              <p
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "0.95rem",
                  color: "#7a8898",
                }}
              >
                {selectedCities.length} cities available
              </p>

              {/* Search input */}
              <div style={{ position: "relative", maxWidth: "400px" }}>
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    height: "44px",
                    padding: "0 1rem 0 2.5rem",
                    background: "#ffffff",
                    border: "1px solid #dbe4ec",
                    borderRadius: "8px",
                    color: "#223548",
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#00b09b";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#dbe4ec";
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#7a8898",
                    fontSize: "1rem",
                    pointerEvents: "none",
                  }}
                >
                  🔍
                </span>
              </div>
            </div>

            {/* Cities grid */}
            {selectedCities.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(155px,1fr))",
                  gap: "12px",
                }}
              >
                {selectedCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/destinations/${city.slug}`}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #dbe4ec",
                      borderRadius: "12px",
                      padding: "12px",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#00b09b";
                      el.style.boxShadow = "0 4px 18px rgba(0,176,155,0.12)";
                      el.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#dbe4ec";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Country label */}
                    <span
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "9px",
                        fontSize: "0.63rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        color: "#9aa8b8",
                        lineHeight: 1.3,
                        textAlign: "right",
                        maxWidth: "55%",
                      }}
                    >
                      {city.country}
                    </span>
                    {/* Capital dot */}
                    {city.isCapital && (
                      <span
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "10px",
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#00b09b",
                        }}
                        title="Capital city"
                      />
                    )}
                    {/* City name */}
                    <div
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "#223548",
                        lineHeight: 1.2,
                        marginBottom: "4px",
                        marginTop: "4px",
                        paddingRight: "2.5rem",
                      }}
                    >
                      {city.city}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "#7a8898",
                        marginBottom: "8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {city.salary}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        padding: "4px 8px",
                        borderRadius: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        background: "rgba(0,176,155,0.12)",
                        color: "#007850",
                        alignSelf: "flex-start",
                        marginTop: "auto",
                      }}
                    >
                      {city.demand}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "#7a8898",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>
                  🔍
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#223548",
                    marginBottom: "4px",
                  }}
                >
                  No cities found
                </p>
                <p style={{ fontSize: "0.88rem" }}>
                  Try a different city or country name
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

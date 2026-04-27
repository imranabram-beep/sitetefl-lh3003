import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/lib/data";
import { getCityBySlug, getCitiesByCountry, DEMAND_STYLE, CITIES } from "@/lib/cities";
import { DestBackLink, DestTeachIn, DestDemandBadge, DestSectionLabel, DestCTA } from "@/components/destination-translated";

// ── Metadata ───────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const full = getDestination(slug);
  const city = getCityBySlug(slug);
  const d = full || city;
  if (!d) return {};

  const cityName = full ? full.city : city!.city;
  const countryName = full ? full.country : city!.country;
  const overview = full
    ? full.overview
    : `Find TEFL and ESL English teaching jobs in ${cityName}, ${countryName}. Compare salaries, visa requirements and demand levels for English teachers.`;

  return {
    title: `Teach English in ${cityName}, ${countryName} | TEFL SEA Academy`,
    description: overview.slice(0, 160),
    keywords: [
      `teach english in ${cityName.toLowerCase()}`,
      `tefl jobs ${cityName.toLowerCase()}`,
      `esl teacher ${countryName.toLowerCase()}`,
      `english teacher salary ${cityName.toLowerCase()}`,
      `english teaching jobs ${cityName.toLowerCase()} ${countryName.toLowerCase()}`,
      `tefl ${countryName.toLowerCase()} requirements`,
    ],
    openGraph: {
      title: `Teach English in ${cityName}, ${countryName}`,
      description: overview.slice(0, 160),
      type: "website",
    },
  };
}

// ── Static params — ALL 518 cities ────────────────────
export async function generateStaticParams() {
  const destSlugs = destinations.map((d) => ({ slug: d.slug }));
  const citySlugs = CITIES
    .filter((c) => !destinations.find((d) => d.slug === c.slug))
    .map((c) => ({ slug: c.slug }));
  return [...destSlugs, ...citySlugs];
}

// ── Helpers ────────────────────────────────────────────
const DEMAND_COLOR: Record<string, string> = {
  "Very High": "#007850", "High": "#005f90", "Medium": "#7a5000", "Low": "#555555",
};
const DEMAND_BG: Record<string, string> = {
  "Very High": "rgba(0,160,100,0.1)", "High": "rgba(0,120,200,0.1)",
  "Medium": "rgba(140,90,0,0.08)", "Low": "rgba(100,100,100,0.08)",
};

// ── Page ───────────────────────────────────────────────
export default async function DestinationPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const full = getDestination(slug);
  const cityData = getCityBySlug(slug);

  if (!full && !cityData) notFound();

  // Priority city with full data
  if (full) {
    const siblings = getCitiesByCountry(full.slug)
      .filter((c) => c.slug !== slug)
      .slice(0, 4);

    return (
      <main>
        {/* HERO */}
        <div style={{ background: "#12263a", padding: "3.5rem 0 3rem" }}>
          <div className="container">
            <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#00c8b0", marginBottom: "0.6rem" }}>
              <DestBackLink />
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "3rem", lineHeight: 1 }}>{full.flag}</span>
              <div>
                <h1 style={{ color: "#ffffff", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.1 }}>
                  <DestTeachIn city={full.city} />
                </h1>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", margin: "0.3rem 0 0" }}>
                  {full.country} · {full.region}
                </p>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "620px", margin: 0 }}>
              {full.overview}
            </p>
          </div>
        </div>

        {/* STATS STRIP */}
        <div style={{ background: "#0a1f30", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem 0" }}>
          <div className="container" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {[
              { label: "Monthly salary", value: full.salary },
              { label: "USD equivalent", value: full.salaryUsd },
              { label: "Demand",         value: full.demand },
              { label: "Cost of living", value: full.cost },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "0.2rem" }}>{s.label}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                  {s.label === "Demand" ? <DestDemandBadge demand={s.value} /> : <span style={{ color: "#ffffff" }}>{s.value}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
          <div className="container">
            <div className="dest-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>

              {/* Highlights */}
              <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}><DestSectionLabel label="highlights" /></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {full.highlights.map((h) => (
                    <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(0,176,155,0.12)", color: "#007a6a", fontSize: "0.65rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: "0.9rem", color: "#3a5060", lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visa */}
              <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}><DestSectionLabel label="visa" /></h2>
                <div style={{ background: "#f4f7fb", borderRadius: "10px", padding: "1rem", marginBottom: "0.85rem" }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9aa8b8", marginBottom: "0.3rem" }}>Visa route</div>
                  <div style={{ fontSize: "0.9rem", color: "#223548", fontWeight: 600 }}>{full.visa}</div>
                </div>
                <div style={{ background: "#f4f7fb", borderRadius: "10px", padding: "1rem" }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9aa8b8", marginBottom: "0.3rem" }}>Best for</div>
                  <div style={{ fontSize: "0.9rem", color: "#223548", fontWeight: 600 }}>{full.bestFor}</div>
                </div>
              </div>
            </div>

            <div className="dest-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>

              {/* Reasons */}
              <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}><DestSectionLabel label="why" /> {full.country}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {full.reasons.map((r) => (
                    <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                      <span style={{ color: "#00b09b", fontSize: "1rem", lineHeight: 1.4, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: "0.88rem", color: "#3a5060", lineHeight: 1.55 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sectors */}
              <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem" }}>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}><DestSectionLabel label="sectors" /></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {full.sectors.map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0.85rem", background: "#f4f7fb", borderRadius: "8px" }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#12263a", color: "#00c8b0", fontSize: "0.65rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: "0.88rem", color: "#223548", fontWeight: 600 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other cities in this country */}
            {siblings.length > 0 && (
              <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem", marginBottom: "1.25rem" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}><DestSectionLabel label="other_cities" /> {full.country}</h2>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  {siblings.map((s) => (
                    <Link key={s.slug} href={`/destinations/${s.slug}`} style={{ background: "#f4f7fb", border: "1px solid #dbe4ec", borderRadius: "8px", padding: "0.6rem 1rem", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, color: "#223548" }}>
                      {s.city} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <DestCTA country={full.country} city={full.city} countryParam={encodeURIComponent(full.country)} />
          </div>
        </div>
      </main>
    );
  }

  // ── Template page for non-priority cities ─────────────
  const c = cityData!;
  const ds = DEMAND_STYLE[c.demand] || DEMAND_STYLE["Low"];
  const siblings = getCitiesByCountry(c.countrySlug)
    .filter((x) => x.slug !== slug)
    .slice(0, 6);

  return (
    <main>
      {/* HERO */}
      <div style={{ background: "#12263a", padding: "3.5rem 0 3rem" }}>
        <div className="container">
          <p style={{ fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "#00c8b0", marginBottom: "0.6rem" }}>
            <DestBackLink />
          </p>
          <h1 style={{ color: "#ffffff", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
            <DestTeachIn city={c.city} />
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: "1rem" }}>
            {c.country} · {c.subregion} · {c.region}
          </p>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "600px", margin: 0 }}>
            {c.city} is {c.isCapital ? `the capital of ${c.country} and ` : ""}a key destination for English teachers in {c.subregion}.
            Demand for TEFL-qualified teachers across {c.country} is <strong style={{ color: "#fff" }}>{c.demand.toLowerCase()}</strong> with
            typical salaries in the region of {c.salary}.
          </p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{ background: "#0a1f30", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem 0" }}>
        <div className="container" style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          {[
            { label: "Typical salary", value: c.salary },
            { label: "Salary note",    value: c.salaryNote },
            { label: "Demand",         value: c.demand },
            { label: "Region",         value: c.subregion },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "0.2rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                <span style={{
                  background: s.label === "Demand" ? DEMAND_BG[s.value] : "transparent",
                  color: s.label === "Demand" ? DEMAND_COLOR[s.value] : "#ffffff",
                  padding: s.label === "Demand" ? "0.15rem 0.6rem" : "0",
                  borderRadius: "4px",
                }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container">
          <div className="dest-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>

            {/* About */}
            <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}><DestTeachIn city={c.city} /></h2>
              <p style={{ fontSize: "0.9rem", color: "#3a5060", lineHeight: 1.7, marginBottom: "0.85rem" }}>
                {c.city} offers opportunities for TEFL-qualified English teachers across language schools, private academies and international institutions.
                {c.isCapital ? ` As the capital of ${c.country}, ${c.city} typically offers the highest concentration of teaching roles in the country.` : ""}
              </p>
              <p style={{ fontSize: "0.9rem", color: "#3a5060", lineHeight: 1.7 }}>
                Salaries in {c.city} typically range from {c.salary}. {c.salaryNote !== "Competitive" ? c.salaryNote + "." : ""}
                A recognised TEFL qualification significantly improves your chances of securing a well-paid role.
              </p>
            </div>

            {/* Requirements */}
            <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}>What you typically need</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  "Recognised TEFL/TESOL/CELTA certificate (120+ hours)",
                  "Bachelor's degree (required by most employers)",
                  "Native or near-native English proficiency",
                  "Valid passport and work authorisation for " + c.country,
                  "Clean criminal background check",
                  "Enthusiasm for teaching and cross-cultural communication",
                ].map((r) => (
                  <div key={r} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(0,176,155,0.12)", color: "#007a6a", fontSize: "0.65rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ fontSize: "0.85rem", color: "#3a5060", lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other cities */}
          {siblings.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid #dbe4ec", borderRadius: "16px", padding: "1.75rem", marginBottom: "1.25rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 800, color: "#223548", marginBottom: "1rem" }}>More cities in {c.country}</h2>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {siblings.map((s) => (
                  <Link key={s.slug} href={`/destinations/${s.slug}`} style={{ background: "#f4f7fb", border: "1px solid #dbe4ec", borderRadius: "8px", padding: "0.6rem 1rem", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, color: "#223548" }}>
                    {s.city} →
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ background: "linear-gradient(135deg,#12263a,#0d3528)", borderRadius: "16px", padding: "2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <h3 style={{ color: "#ffffff", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.4rem" }}>Ready to teach in {c.country}?</h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", margin: 0 }}>Get TEFL certified and search live teaching jobs in {c.city}.</p>
            </div>
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <Link href={`/jobs?country=${encodeURIComponent(c.country)}`} className="button hp-btn-gold">Find jobs in {c.country} →</Link>
              <Link href="/courses" className="button ghost hp-btn-ghost-nav">View TEFL courses</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

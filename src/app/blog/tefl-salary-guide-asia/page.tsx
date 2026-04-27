import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks, SalaryTable } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Salary Guide Asia | Compare Countries & Earnings 2026",
  description: "Compare TEFL teacher salaries across South East Asia and beyond. Thailand, Vietnam, Korea, Japan, UAE and more — where do teachers earn the most?",
  keywords: ["TEFL salary Asia","ESL teacher salary Asia","teach English salary Thailand Vietnam","how much do English teachers earn Asia","TEFL earnings comparison"],
};

export default function TeflSalaryGuideAsiaPage() {
  return (
    <main>
      <BlogHero
        category="Salary Guide · 2026"
        h1="TEFL Salary Guide for Asia (2026)"
        sub="How much can you actually earn teaching English in Asia? A honest country-by-country comparison including cost of living, savings potential and what affects your earnings."
        readTime="8 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">

          <SeoH2>South East Asia salaries</SeoH2>
          <SalaryTable rows={[
            { country:"Thailand",    flag:"🇹🇭", salary:"THB 35–60k/mo",      usd:"$1,000–1,800",  demand:"Very High" },
            { country:"Vietnam",     flag:"🇻🇳", salary:"USD 1,200–2,000/mo", usd:"$1,200–2,000",  demand:"Very High" },
            { country:"Cambodia",    flag:"🇰🇭", salary:"USD 900–1,500/mo",   usd:"$900–1,500",    demand:"High" },
            { country:"Indonesia",   flag:"🇮🇩", salary:"USD 1,000–2,000/mo", usd:"$1,000–2,000",  demand:"High" },
            { country:"Malaysia",    flag:"🇲🇾", salary:"MYR 3,500–6,000/mo", usd:"$750–1,300",    demand:"Medium" },
            { country:"Philippines", flag:"🇵🇭", salary:"USD 700–1,200/mo",   usd:"$700–1,200",    demand:"High" },
            { country:"Singapore",   flag:"🇸🇬", salary:"SGD 2,500–4,500/mo", usd:"$1,900–3,400",  demand:"High" },
          ]} />

          <SeoH2>East Asia salaries</SeoH2>
          <SalaryTable rows={[
            { country:"South Korea", flag:"🇰🇷", salary:"KRW 2.1–3.0m/mo",   usd:"$1,600–2,300",  demand:"High" },
            { country:"Japan",       flag:"🇯🇵", salary:"JPY 250–350k/mo",    usd:"$1,700–2,400",  demand:"High" },
            { country:"China",       flag:"🇨🇳", salary:"CNY 12–25k/mo",      usd:"$1,700–3,500",  demand:"Very High" },
            { country:"Taiwan",      flag:"🇹🇼", salary:"TWD 55–80k/mo",      usd:"$1,800–2,600",  demand:"Medium" },
          ]} />

          <SeoH2>Middle East salaries</SeoH2>
          <SalaryTable rows={[
            { country:"UAE",          flag:"🇦🇪", salary:"AED 8–15k/mo",   usd:"$2,200–4,100", demand:"High" },
            { country:"Qatar",        flag:"🇶🇦", salary:"QAR 6–14k/mo",   usd:"$1,600–3,800", demand:"High" },
            { country:"Saudi Arabia", flag:"🇸🇦", salary:"SAR 5–12k/mo",   usd:"$1,300–3,200", demand:"High" },
          ]} />

          <SeoH2>What actually affects your salary</SeoH2>
          {[
            { factor: "TEFL qualification level", impact: "High", detail: "A 120-hour certificate gets you into the market. A Level 5 Diploma or CELTA opens doors to international schools paying 40–80% more." },
            { factor: "School type", impact: "Very High", detail: "International schools pay 2–3x more than public schools or language centres. The trade-off is higher entry requirements and more competitive hiring." },
            { factor: "Location within country", impact: "Medium", detail: "Capital cities typically pay more but cost more too. Smaller cities often offer better savings ratios." },
            { factor: "Experience", impact: "High", detail: "Most markets have a clear salary progression — entry, mid and senior levels. Two years of experience typically increases earning potential by 20–40%." },
            { factor: "Nationality", impact: "Variable", detail: "Some markets (particularly China and Korea) historically paid premiums for native English speakers from specific countries. This is changing but still a factor in some schools." },
          ].map((r) => (
            <div key={r.factor} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 10, padding: "1rem 1.25rem", marginBottom: "0.65rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 800, color: "#223548" }}>{r.factor}</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, background: r.impact === "Very High" ? "rgba(0,160,100,0.1)" : "rgba(0,120,200,0.1)", color: r.impact === "Very High" ? "#007850" : "#005f90", padding: "0.12rem 0.5rem", borderRadius: 4 }}>Impact: {r.impact}</span>
                </div>
                <p style={{ fontSize: "0.84rem", color: "#3a5060", lineHeight: 1.6, margin: 0 }}>{r.detail}</p>
              </div>
            </div>
          ))}

          <SeoH2>Where do teachers save the most?</SeoH2>
          <P>Salary alone does not tell the full story. Vietnam is consistently rated one of the best markets for savings — competitive USD salaries combined with very low living costs mean teachers routinely save USD 600–1,000/month. South Korea and Korea also offer exceptional savings because housing is typically included in the employment package.</P>
          <P>The UAE offers the highest raw salaries but the high cost of living in Dubai and Abu Dhabi reduces the savings advantage compared to SE Asia.</P>

          <CourseCTA className="blog-cta-section" heading="Earn more with the right TEFL qualification" sub="A recognised 120-hour TEFL certificate opens access to better-paying roles across all Asian markets." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Which Asian country pays English teachers the most?", a: "In raw USD terms, the UAE pays the most — AED 8,000–15,000/month tax-free is approximately $2,200–4,100. In SE Asia, Vietnam and Thailand offer the best salary-to-cost ratios." },
            { q: "Can I save money teaching in Asia?", a: "Yes — particularly in Vietnam, Thailand, Cambodia and South Korea. Teachers in Vietnam commonly save $600–1,000/month. Korea's housing benefit makes it one of the best markets for building savings." },
            { q: "Does a better TEFL qualification mean higher pay?", a: "Yes, significantly. A Level 5 TEFL Diploma or CELTA opens access to international schools that pay 40–80% more than language centres. Even within language centres, higher credentials translate to better starting salaries." },
            { q: "How often do TEFL salaries increase?", a: "Most markets have annual increments for returning teachers. International schools typically offer structured salary scales. Language centres are more variable but experienced teachers regularly negotiate increases." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/tefl-course-thailand", label: "TEFL Course for Thailand", desc: "Get certified for Thailand's market" },
            { href: "/tefl-course-vietnam", label: "TEFL Course for Vietnam", desc: "Get certified for Vietnam's market" },
            { href: "/destinations", label: "All Destination Guides", desc: "Full salary and market data by country" },
            { href: "/become-an-english-teacher-in-asia", label: "Become an English Teacher in Asia", desc: "Complete 2026 career guide" },
            { href: "/jobs", label: "Browse Live Vacancies", desc: "Search jobs by country and salary" },
          ]} />
        </div>
      </div>
    </main>
  );
}

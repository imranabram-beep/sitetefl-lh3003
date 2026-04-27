import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Requirements by Country in Asia | 2026 Guide",
  description: "A country-by-country breakdown of TEFL and teaching requirements across Asia. Visas, degree requirements, salary ranges and how to apply.",
  keywords: ["TEFL requirements Asia","teach English requirements by country","ESL visa requirements Asia","TEFL country guide","teaching requirements Thailand Vietnam Korea"],
};

export default function TeflRequirementsCountryPage() {
  return (
    <main>
      <BlogHero
        category="Country Requirements Guide"
        h1="TEFL Requirements by Country in Asia (2026)"
        sub="Every Asian teaching market has different requirements. Here is a clear, up-to-date breakdown of what each country expects — TEFL hours, degree requirements, visa routes and salary."
        readTime="8 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">
          <SeoH2>South East Asia requirements</SeoH2>
          {[
            { flag:"🇹🇭", country:"Thailand",    tefl:"120 hrs min", degree:"Required for work permit", visa:"Non-Immigrant B → Teaching Licence", salary:"THB 35–60k/mo", difficulty:"Moderate" },
            { flag:"🇻🇳", country:"Vietnam",     tefl:"120 hrs min", degree:"Required for work permit", visa:"Work permit + Temporary Residence Card", salary:"USD 1,200–2,000/mo", difficulty:"Moderate" },
            { flag:"🇰🇭", country:"Cambodia",    tefl:"120 hrs min", degree:"Not always required", visa:"Ordinary visa → Business/Work permit", salary:"USD 900–1,500/mo", difficulty:"Easy" },
            { flag:"🇮🇩", country:"Indonesia",   tefl:"120 hrs min", degree:"Required for KITAS", visa:"KITAS sponsored by employer", salary:"USD 1,000–2,000/mo", difficulty:"Moderate" },
            { flag:"🇲🇾", country:"Malaysia",    tefl:"120 hrs min", degree:"Usually required", visa:"Employment Pass", salary:"MYR 3,500–6,000/mo", difficulty:"Moderate" },
            { flag:"🇵🇭", country:"Philippines", tefl:"120 hrs min", degree:"Varies by role", visa:"AEP (Alien Employment Permit)", salary:"USD 700–1,200/mo", difficulty:"Easy–Moderate" },
          ].map((c) => (
            <div key={c.country} style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:12, padding:"1.25rem", marginBottom:"0.85rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.85rem" }}>
                <span style={{ fontSize:"1.6rem" }}>{c.flag}</span>
                <span style={{ fontSize:"1rem", fontWeight:800, color:"#223548" }}>{c.country}</span>
                <span style={{ marginLeft:"auto", fontSize:"0.7rem", fontWeight:700, background: c.difficulty==="Easy" ? "rgba(0,160,100,0.1)" : c.difficulty==="Moderate" ? "rgba(0,120,200,0.1)" : "rgba(140,90,0,0.1)", color: c.difficulty==="Easy" ? "#007850" : c.difficulty==="Moderate" ? "#005f90" : "#7a5000", padding:"0.15rem 0.6rem", borderRadius:4 }}>{c.difficulty}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                {[["TEFL required",c.tefl],["Degree",c.degree],["Visa route",c.visa],["Typical salary",c.salary]].map(([l,v]) => (
                  <div key={l} style={{ background:"#f4f7fb", borderRadius:8, padding:"0.6rem 0.75rem" }}>
                    <div style={{ fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase" as const, color:"#9aa8b8", letterSpacing:"0.08em", marginBottom:"0.2rem" }}>{l}</div>
                    <div style={{ fontSize:"0.82rem", fontWeight:700, color:"#223548" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <SeoH2>East Asia requirements</SeoH2>
          {[
            { flag:"🇰🇷", country:"South Korea",  tefl:"120 hrs (EPIK requires it)", degree:"Required — from English-speaking country", visa:"E-2 teaching visa", salary:"KRW 2.1–3.0m/mo + housing", difficulty:"Moderate" },
            { flag:"🇯🇵", country:"Japan",         tefl:"120 hrs min", degree:"Required", visa:"Instructor visa", salary:"JPY 250–350k/mo", difficulty:"Moderate" },
            { flag:"🇨🇳", country:"China",         tefl:"120 hrs min", degree:"Required", visa:"Z work visa", salary:"CNY 12–25k/mo", difficulty:"Moderate" },
            { flag:"🇹🇼", country:"Taiwan",        tefl:"120 hrs min", degree:"Usually required", visa:"Resident visa + ARC", salary:"TWD 55–80k/mo", difficulty:"Easy–Moderate" },
          ].map((c) => (
            <div key={c.country} style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:12, padding:"1.25rem", marginBottom:"0.85rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.85rem" }}>
                <span style={{ fontSize:"1.6rem" }}>{c.flag}</span>
                <span style={{ fontSize:"1rem", fontWeight:800, color:"#223548" }}>{c.country}</span>
                <span style={{ marginLeft:"auto", fontSize:"0.7rem", fontWeight:700, background:"rgba(0,120,200,0.1)", color:"#005f90", padding:"0.15rem 0.6rem", borderRadius:4 }}>{c.difficulty}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem" }}>
                {[["TEFL required",c.tefl],["Degree",c.degree],["Visa route",c.visa],["Typical salary",c.salary]].map(([l,v]) => (
                  <div key={l} style={{ background:"#f4f7fb", borderRadius:8, padding:"0.6rem 0.75rem" }}>
                    <div style={{ fontSize:"0.62rem", fontWeight:700, textTransform:"uppercase" as const, color:"#9aa8b8", letterSpacing:"0.08em", marginBottom:"0.2rem" }}>{l}</div>
                    <div style={{ fontSize:"0.82rem", fontWeight:700, color:"#223548" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <CourseCTA className="blog-cta-section" heading="Meet the requirements — get TEFL certified" sub="Our 120-hour course meets the TEFL requirements for every country listed above." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Which Asian country has the easiest teaching requirements?", a: "Cambodia is the most accessible — degree not always required, visa process simpler, and a 120-hour TEFL certificate is often sufficient to find a role." },
            { q: "Do requirements change frequently?", a: "Vietnam and China have both tightened requirements in recent years. We update this guide annually. Always verify current requirements with the relevant embassy or hiring school before applying." },
            { q: "What happens if I work without the right visa?", a: "Working without appropriate authorisation carries serious risks including fines, deportation and a ban from re-entry. Always ensure your employer provides proper work authorisation." },
            { q: "How long does visa processing take?", a: "Korea's E-2 visa typically takes 3–6 weeks. Thailand's Non-B conversion can be done in-country. Vietnam's work permit takes 4–8 weeks. Factor this into your timeline when planning your move." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/become-an-english-teacher-in-asia", label: "Become an English Teacher in Asia", desc: "Complete step-by-step guide" },
            { href: "/destinations", label: "All Destination Guides", desc: "Full details for every country" },
            { href: "/online-tefl-course-south-east-asia", label: "Get TEFL Certified", desc: "Start your 120-hour course" },
            { href: "/jobs", label: "Browse Live Vacancies", desc: "Search by country" },
          ]} />
        </div>
      </div>
    </main>
  );
}

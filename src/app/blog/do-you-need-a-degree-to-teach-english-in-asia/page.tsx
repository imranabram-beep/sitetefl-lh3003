import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "Teach English Without a Degree in Asia | TEFL Guide 2026",
  description: "Learn where you can teach English in Asia without a degree and how a TEFL certificate helps you get started. Honest country-by-country breakdown.",
  keywords: ["teach English no degree Asia","TEFL no degree","teach abroad without degree","ESL teacher no degree","TEFL certificate without degree"],
};

export default function NoDegreeAsiaBlogPage() {
  return (
    <main>
      <BlogHero
        category="TEFL Guide"
        h1="Can You Teach English in Asia Without a Degree?"
        sub="The degree question is the most common concern for new TEFL teachers. The honest answer: it depends on the country. Here is a clear breakdown of where you can and cannot teach without one."
        readTime="5 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">

          <SeoH2>The short answer</SeoH2>
          <P>A degree is required for formal teaching positions in Thailand, Vietnam, South Korea, Japan and China. These countries require it for work permits and visas. Without a degree, you cannot legally work as a teacher in these markets.</P>
          <P>However — Cambodia, Indonesia and the Philippines have more flexible entry routes where a TEFL certificate alone can open doors, particularly in language schools and NGO settings.</P>

          <SeoH2>Country by country breakdown</SeoH2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { flag:"🇰🇭", country:"Cambodia",    verdict:"Degree NOT required", color:"#007850", bg:"rgba(0,160,100,0.08)", detail:"The most accessible market in SE Asia. Many language centres and NGO programmes hire TEFL holders without a degree. Low cost of living and a welcoming environment make it popular with career changers." },
              { flag:"🇮🇩", country:"Indonesia",   verdict:"Often flexible",       color:"#005f90", bg:"rgba(0,120,200,0.08)", detail:"A degree is required for the formal KITAS work permit, but many schools — particularly in Bali — take a more flexible approach for shorter-term positions. A TEFL certificate significantly helps." },
              { flag:"🇵🇭", country:"Philippines", verdict:"Often flexible",       color:"#005f90", bg:"rgba(0,120,200,0.08)", detail:"Online teaching and BPO English training roles rarely require a degree. For classroom positions, requirements vary by school." },
              { flag:"🇹🇭", country:"Thailand",    verdict:"Degree required",      color:"#7a5000", bg:"rgba(140,90,0,0.08)", detail:"A degree is required for the Non-Immigrant B visa and teaching licence. Some schools work around this, but it is legally required for formal employment." },
              { flag:"🇻🇳", country:"Vietnam",     verdict:"Degree required",      color:"#7a5000", bg:"rgba(140,90,0,0.08)", detail:"Vietnam requires a degree for a work permit. Enforcement has tightened significantly in recent years. We do not recommend attempting to teach here without one." },
              { flag:"🇰🇷", country:"South Korea", verdict:"Degree required",      color:"#7a5000", bg:"rgba(140,90,0,0.08)", detail:"An E-2 teaching visa requires a degree from an English-speaking country. No exceptions." },
              { flag:"🇯🇵", country:"Japan",       verdict:"Degree required",      color:"#7a5000", bg:"rgba(140,90,0,0.08)", detail:"The JET programme and most Eikaiwa schools require a degree. Teaching without one in Japan is not feasible through formal channels." },
              { flag:"🇨🇳", country:"China",       verdict:"Degree required",      color:"#7a5000", bg:"rgba(140,90,0,0.08)", detail:"A Z visa requires a degree. Requirements have become stricter in recent years and are now consistently enforced." },
            ].map((c) => (
              <div key={c.country} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 12, padding: "1.1rem 1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.6rem", flexShrink: 0 }}>{c.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem", flexWrap: "wrap" as const }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#223548" }}>{c.country}</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, background: c.bg, color: c.color, padding: "0.15rem 0.6rem", borderRadius: 4 }}>{c.verdict}</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#3a5060", lineHeight: 1.6, margin: 0 }}>{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <SeoH2>What a TEFL certificate does for you without a degree</SeoH2>
          <P>Even in markets where a degree is required for formal work permits, a TEFL certificate still matters significantly. It demonstrates professional intent, improves your profile for any available roles, and is required by schools regardless of your degree status.</P>
          <P>In Cambodia and Indonesia — where degree requirements are more flexible — a 120-hour TEFL certificate is often the primary qualification schools look for. It can be the difference between getting hired or not.</P>

          <CourseCTA className="blog-cta-section" heading="Get TEFL certified — whatever your background" sub="Our 120-hour course opens doors in Cambodia, Indonesia, the Philippines and online teaching globally." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Is Cambodia genuinely accessible without a degree?", a: "Yes — Cambodia is the most realistic option in SE Asia for teachers without a degree. Language centres, NGO programmes and private schools regularly hire TEFL holders. The low cost of living means you can live comfortably on a modest salary." },
            { q: "Can I teach English online without a degree?", a: "Yes — most online teaching platforms do not require a degree. A TEFL certificate and strong English proficiency are usually sufficient. This is one of the most accessible routes for teachers without a degree." },
            { q: "Will requirements change in future?", a: "Requirements have generally been tightening, not loosening, across SE Asia. Vietnam and China have both enforced degree requirements more strictly in recent years. Cambodia remains the most flexible market but this could change." },
            { q: "Should I get a TEFL certificate even if I don't have a degree?", a: "Absolutely yes. In markets where you can teach without a degree, a TEFL certificate significantly improves your chances. For online teaching — which requires no degree — it is essential for accessing better-paying platforms and students." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/tefl-course-cambodia", label: "TEFL Course for Cambodia", desc: "Most accessible SE Asian market" },
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Get certified from anywhere" },
            { href: "/teach-online", label: "Teach English Online", desc: "No degree needed for most platforms" },
            { href: "/destinations/cambodia", label: "Cambodia Destination Guide", desc: "Full market guide for Cambodia" },
            { href: "/jobs", label: "Browse Teaching Jobs", desc: "Live vacancies across Asia" },
          ]} />
        </div>
      </div>
    </main>
  );
}

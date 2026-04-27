import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "Teach English Online from Malaysia | 2026 Guide",
  description: "How to build an online English teaching income from Malaysia. Platform guide, earnings expectations, internet setup and TEFL requirements for Malaysian teachers.",
  keywords: ["teach English online Malaysia","online English teacher Malaysia","work from home English teacher Malaysia","TEFL Malaysia online","online ESL jobs Malaysia"],
};

export default function TeachOnlineMalaysiaPage() {
  return (
    <main>
      <BlogHero
        category="Online Teaching · Malaysia"
        h1="How to Teach English Online from Malaysia"
        sub="Malaysia's excellent infrastructure, English-speaking population and central time zone make it one of SE Asia's best bases for building an online English teaching career."
        readTime="5 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">
          <SeoH2>Why Malaysia works for online teaching</SeoH2>
          <P>Malaysia has some of the best internet infrastructure in SE Asia, English is widely spoken and the country sits in a time zone (UTC+8) that overlaps well with peak demand hours from both Asian and European students. Kuala Lumpur in particular offers excellent co-working spaces and fast fibre connections for teachers who prefer working outside the home.</P>

          <SeoH2>Best platforms to use from Malaysia</SeoH2>
          {[
            { name:"Preply",   rate:"$10–30/hr", notes:"Best for building long-term students. Malaysian English accent well-received." },
            { name:"iTalki",   rate:"$8–25/hr",  notes:"Large platform with Malaysian and international student base." },
            { name:"Cambly",   rate:"~$10/hr",   notes:"No lesson planning, good for conversational practice sessions." },
            { name:"Palfish",  rate:"$10–18/hr", notes:"China-focused, high demand, requires TEFL certificate." },
          ].map((p) => (
            <div key={p.name} style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:10, padding:"1rem 1.25rem", marginBottom:"0.65rem", display:"flex", alignItems:"center", gap:"1.25rem" }}>
              <div style={{ minWidth:80, fontSize:"0.95rem", fontWeight:800, color:"#223548" }}>{p.name}</div>
              <div style={{ minWidth:90, fontSize:"0.88rem", fontWeight:700, color:"#007850" }}>{p.rate}</div>
              <div style={{ fontSize:"0.82rem", color:"#3a5060", lineHeight:1.5 }}>{p.notes}</div>
            </div>
          ))}

          <SeoH2>Malaysian teachers teaching internationally</SeoH2>
          <P>Online teaching from Malaysia is a growing income stream for both Malaysian nationals and expats based in KL. For Malaysians with strong English proficiency, teaching international students — particularly those in China, Korea and the Middle East — is a realistic way to earn USD-denominated income while living in Malaysia's low-cost environment.</P>
          <P>Earnings of MYR 3,000–6,000/month (USD 650–1,300) are achievable part-time for motivated teachers building a solid platform presence over 3–6 months.</P>

          <CourseCTA className="blog-cta-section" heading="Get certified and start teaching from Malaysia" sub="Our 120-hour TEFL course is accepted by all major online platforms." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Can Malaysian teachers teach on international platforms?", a: "Yes — all major platforms accept Malaysian teachers. English proficiency and a TEFL certificate are the primary requirements. Malaysians have a natural advantage with English being widely spoken domestically." },
            { q: "What internet speed do I need in Malaysia?", a: "10 Mbps upload minimum. Fibre coverage in KL, Penang and Johor Bahru is excellent. Rural areas may have variable quality — check your connection before committing to platform teaching." },
            { q: "Is online teaching taxable in Malaysia?", a: "Income earned from teaching online is generally subject to Malaysian income tax. Consult a local tax advisor if your earnings are significant. Most platforms pay in USD which requires conversion." },
            { q: "Can expats teach online from Malaysia?", a: "Yes — teaching online from Malaysia as an expat is generally straightforward provided you have appropriate visa status. Most online teaching is classified as work performed remotely for foreign entities." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/tefl-course-malaysia", label: "TEFL Course for Malaysia", desc: "Get certified for Malaysia's market" },
            { href: "/teach-online", label: "Teach English Online Guide", desc: "Full platform and setup guide" },
            { href: "/destinations/malaysia", label: "Malaysia Destination Guide", desc: "Full market overview" },
            { href: "/jobs", label: "Browse Teaching Jobs", desc: "Live vacancies in Malaysia and online" },
          ]} />
        </div>
      </div>
    </main>
  );
}

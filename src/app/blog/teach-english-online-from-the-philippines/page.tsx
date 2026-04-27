import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "Teach English Online from the Philippines | 2026 Guide",
  description: "How to build an online English teaching income from the Philippines. Platform comparison, setup tips, earnings expectations and TEFL requirements.",
  keywords: ["teach English online Philippines","online English teacher Philippines","online ESL Philippines","work from home English teacher Philippines","TEFL Philippines online"],
};

export default function TeachOnlinePhilippinesPage() {
  return (
    <main>
      <BlogHero
        category="Online Teaching · Philippines"
        h1="How to Teach English Online from the Philippines"
        sub="The Philippines is one of the best places in the world to build an online English teaching career. English is an official language, internet infrastructure is solid and the cost of living is low."
        readTime="6 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">
          <SeoH2>Why the Philippines is ideal for online teaching</SeoH2>
          <P>English is one of the official languages of the Philippines, which means Filipino teachers have a natural advantage — accent familiarity, language confidence and cultural understanding of English-language learning. Combined with a low cost of living and improving broadband infrastructure, the Philippines has become one of the world's largest sources of online English teachers.</P>

          <SeoH2>Top platforms for Filipino online teachers</SeoH2>
          {[
            { name:"Preply",   rate:"$8–25/hr",  notes:"Global platform, set your own rate, strong for building regular students" },
            { name:"iTalki",   rate:"$8–20/hr",  notes:"Large student base, community teachers and professional teachers tiers" },
            { name:"Cambly",   rate:"~$10.20/hr", notes:"Conversational English focus, per-minute billing, no lesson planning required" },
            { name:"Palfish",  rate:"$10–18/hr", notes:"Mobile-first platform, popular in China, requires TEFL certificate" },
            { name:"Verbling", rate:"$10–30/hr", notes:"Formal tutoring platform, higher rates, requires application" },
          ].map((p) => (
            <div key={p.name} style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:10, padding:"1rem 1.25rem", marginBottom:"0.65rem", display:"flex", alignItems:"center", gap:"1.25rem" }}>
              <div style={{ minWidth:80, fontSize:"0.95rem", fontWeight:800, color:"#223548" }}>{p.name}</div>
              <div style={{ minWidth:90, fontSize:"0.88rem", fontWeight:700, color:"#007850" }}>{p.rate}</div>
              <div style={{ fontSize:"0.82rem", color:"#3a5060", lineHeight:1.5 }}>{p.notes}</div>
            </div>
          ))}

          <SeoH2>What you need to get started</SeoH2>
          <P>Most platforms require a TEFL certificate and a stable internet connection as a minimum. Here is a practical checklist:</P>
          {["120-hour TEFL/TESOL certificate","Stable internet — minimum 10 Mbps upload","Laptop or desktop (not just a phone for most platforms)","Quiet, well-lit background for video lessons","Headset with microphone for clear audio","PayPal or Payoneer account for receiving payments"].map(item => (
            <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem", marginBottom:"0.5rem" }}>
              <span style={{ width:18, height:18, borderRadius:"50%", background:"rgba(0,176,155,0.12)", color:"#007a6a", fontSize:"0.62rem", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>✓</span>
              <span style={{ fontSize:"0.88rem", color:"#3a5060", lineHeight:1.55 }}>{item}</span>
            </div>
          ))}

          <SeoH2>Realistic earnings from the Philippines</SeoH2>
          <P>Part-time (15–20 hrs/week): USD 600–1,000/month. Full-time (30–35 hrs/week): USD 1,200–2,000/month. Building to these numbers takes 2–4 months as you build student reviews and repeat bookings. Most successful teachers combine 2–3 platforms initially, then consolidate once they build a regular student base.</P>

          <CourseCTA className="blog-cta-section" heading="Get TEFL certified and start teaching online" sub="Our 120-hour course is accepted by all major online teaching platforms." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Do online teaching platforms hire Filipino teachers?", a: "Yes — all major platforms including Preply, iTalki, Cambly and Palfish actively hire Filipino teachers. English being an official language in the Philippines is a significant advantage." },
            { q: "How much internet speed do I need for online teaching?", a: "A minimum of 10 Mbps upload speed is recommended for stable video lessons. Many teachers in Metro Manila, Cebu and Davao have access to sufficient speeds through fibre connections." },
            { q: "Can I teach online while also teaching in a local school?", a: "Yes — many Filipino teachers combine local school or BPO work with online platform teaching. The flexibility of online teaching makes it easy to schedule around existing commitments." },
            { q: "Is a TEFL certificate required for online platforms?", a: "Most reputable platforms require or strongly prefer a TEFL certificate. It also allows you to set higher rates — students pay more for certified teachers with professional credentials." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/tefl-course-philippines", label: "TEFL Course for the Philippines", desc: "Get certified to teach online" },
            { href: "/teach-online", label: "Teach English Online Guide", desc: "Full platform and setup guide" },
            { href: "/destinations/philippines", label: "Philippines Destination Guide", desc: "Full market overview" },
            { href: "/jobs", label: "Browse Online Teaching Jobs", desc: "Live vacancies including remote roles" },
          ]} />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "Is TEFL Worth It in Asia? | Honest 2026 Guide",
  description: "Is a TEFL course worth the investment in 2026? An honest look at costs, earning potential, career outcomes and who TEFL is right for.",
  keywords: ["is TEFL worth it","TEFL worth it Asia","is TEFL worth it 2026","TEFL return on investment","should I do TEFL"],
};

export default function IsTeflWorthItPage() {
  return (
    <main>
      <BlogHero
        category="TEFL Guide"
        h1="Is TEFL Worth It in Asia? (Honest 2026 Answer)"
        sub="The question every prospective teacher asks. Here is an honest breakdown of the costs, what you actually earn, and who TEFL is — and is not — the right choice for."
        readTime="5 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">

          <SeoH2>The honest answer</SeoH2>
          <P>Yes — for the right person. A 120-hour TEFL course typically costs £100–300. Most teachers recoup this in their first month of teaching. Over a two-year stint in Thailand or Vietnam, a TEFL certificate directly unlocks earning potential that pays back the course cost hundreds of times over.</P>
          <P>That said, TEFL is not for everyone. If you are not genuinely interested in teaching, working with people or living abroad, the certificate alone will not make it worthwhile. But if you want to live and work in SE Asia, East Asia or the Middle East — and earn while you do it — TEFL is one of the most effective qualifications you can have.</P>

          <SeoH2>The numbers: what TEFL actually costs vs earns</SeoH2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }}>
            <div style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:12, padding:"1.25rem" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase" as const, color:"#9aa8b8", marginBottom:"0.75rem", letterSpacing:"0.08em" }}>TEFL course cost</div>
              {[["120-hour Premier course","£149"],["Level 5 Diploma","£299"],["30-hr Online course","£59"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"0.45rem 0", borderBottom:"1px solid #f0f4f8" }}>
                  <span style={{ fontSize:"0.85rem", color:"#3a5060" }}>{l}</span>
                  <span style={{ fontSize:"0.85rem", fontWeight:700, color:"#223548" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:12, padding:"1.25rem" }}>
              <div style={{ fontSize:"0.72rem", fontWeight:700, textTransform:"uppercase" as const, color:"#9aa8b8", marginBottom:"0.75rem", letterSpacing:"0.08em" }}>Average monthly earnings</div>
              {[["Thailand language centre","~$1,200"],["Vietnam language centre","~$1,500"],["South Korea (housing incl.)","~$2,000"],["UAE (tax-free)","~$3,000"]].map(([l,v]) => (
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"0.45rem 0", borderBottom:"1px solid #f0f4f8" }}>
                  <span style={{ fontSize:"0.85rem", color:"#3a5060" }}>{l}</span>
                  <span style={{ fontSize:"0.85rem", fontWeight:700, color:"#007850" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <P>At $1,200/month in Thailand with low living costs, a teacher can realistically save $400–700/month. A £149 course investment is recovered in less than two weeks of work.</P>

          <SeoH2>Who TEFL is right for</SeoH2>
          {[
            { yes: true,  label: "Career changers wanting to live abroad" },
            { yes: true,  label: "Recent graduates wanting international experience" },
            { yes: true,  label: "Travellers who want to fund extended time in Asia" },
            { yes: true,  label: "Remote workers who want to add teaching income" },
            { yes: true,  label: "SE Asian locals wanting to teach internationally" },
            { yes: false, label: "People who dislike working with others" },
            { yes: false, label: "People looking for passive income (teaching is active work)" },
            { yes: false, label: "People expecting instant high salaries without experience" },
          ].map((r) => (
            <div key={r.label} style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.6rem 0", borderBottom:"1px solid #f0f4f8" }}>
              <span style={{ width:22, height:22, borderRadius:"50%", background: r.yes ? "rgba(0,160,100,0.12)" : "rgba(220,60,60,0.1)", color: r.yes ? "#007850" : "#c03030", fontSize:"0.75rem", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{r.yes ? "✓" : "✕"}</span>
              <span style={{ fontSize:"0.9rem", color:"#3a5060" }}>{r.label}</span>
            </div>
          ))}

          <CourseCTA className="blog-cta-section" heading="Ready to make the investment?" sub="The 120-hour course takes 4–6 weeks and pays for itself in your first month of teaching." />

          <FAQBlock useBlogStyling faqs={[
            { q: "How quickly can I start earning after a TEFL course?", a: "Most teachers find their first role within 4–8 weeks of completing their certificate. From starting your TEFL course to your first paycheck is typically 10–16 weeks." },
            { q: "Is TEFL demand growing or shrinking in 2026?", a: "Demand remains strong across SE Asia, the Middle East and East Asia. Vietnam, Thailand, Indonesia and the UAE are all active markets. Online teaching has also expanded the global market significantly." },
            { q: "Can TEFL lead to a long-term career?", a: "Yes — many TEFL teachers build careers spanning 10–20 years, progressing from language centres to international schools, teacher training roles, materials development and academic management." },
            { q: "What if I complete the course and decide not to teach?", a: "The communication, cross-cultural and planning skills developed in a TEFL course have value beyond the classroom. Many former TEFL teachers cite it as valuable for business, project management and client-facing roles." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/online-tefl-course-south-east-asia", label: "View TEFL Courses", desc: "Compare our course options" },
            { href: "/blog/what-jobs-can-you-get-after-a-tefl-course", label: "What Jobs Can You Get After TEFL?", desc: "Full career options guide" },
            { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide for Asia", desc: "What teachers actually earn" },
            { href: "/destinations", label: "Compare Destinations", desc: "Where to teach and what to earn" },
          ]} />
        </div>
      </div>
    </main>
  );
}

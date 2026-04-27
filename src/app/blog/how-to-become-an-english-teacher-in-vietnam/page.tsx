import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "How to Teach English in Vietnam | Requirements & Salary 2026",
  description: "Everything you need to know about becoming an English teacher in Vietnam — TEFL requirements, salary, visa routes and top cities.",
  keywords: ["how to teach English Vietnam","English teacher requirements Vietnam","TEFL Vietnam","ESL teacher Vietnam","teach abroad Vietnam"],
};

export default function HowToTeachVietnamPage() {
  return (
    <main>
      <BlogHero
        category="Country Guide · Vietnam"
        h1="How to Become an English Teacher in Vietnam (2026)"
        sub="Vietnam has one of the best salary-to-cost ratios in SE Asia. Here is everything you need to know about qualifications, cities, visa routes and how to find your first role."
        readTime="6 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">
          <SeoH2>Why Vietnam?</SeoH2>
          <P>Vietnam consistently ranks as one of the top TEFL destinations in SE Asia. Strong USD salaries, very low living costs and a vibrant city life make it a favourite for teachers who want to save money while having a great experience. Ho Chi Minh City and Hanoi are both world-class cities with thriving expat communities and year-round hiring.</P>

          <SeoH2>What qualifications do you need?</SeoH2>
          <P>Vietnam has tightened its requirements in recent years. Most schools and government authorities now require all of the following:</P>
          {["120-hour TEFL/TESOL certificate (minimum)","Bachelor's degree in any subject","Work permit (sponsored by your employer)","Apostilled degree certificate","Clean criminal background check"].map(item => (
            <div key={item} style={{ display:"flex", gap:"0.6rem", marginBottom:"0.5rem" }}>
              <span style={{ width:18, height:18, borderRadius:"50%", background:"rgba(0,176,155,0.12)", color:"#007a6a", fontSize:"0.62rem", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>✓</span>
              <span style={{ fontSize:"0.88rem", color:"#3a5060", lineHeight:1.55 }}>{item}</span>
            </div>
          ))}

          <SeoH2>HCMC vs Hanoi — which city is better?</SeoH2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.25rem" }}>
            {[
              { city:"Ho Chi Minh City", pros:["More job opportunities","Higher average salaries","Bigger expat community","More international feel"], cons:["Busier, more chaotic","Slightly higher living costs"] },
              { city:"Hanoi",            pros:["More traditional Vietnamese culture","Slightly lower cost of living","Strong teaching market","Better proximity to N. Vietnam travel"], cons:["Smaller job market","Cooler winters"] },
            ].map((c) => (
              <div key={c.city} style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:12, padding:"1.1rem" }}>
                <div style={{ fontSize:"0.95rem", fontWeight:800, color:"#223548", marginBottom:"0.75rem" }}>{c.city}</div>
                {c.pros.map(p => <div key={p} style={{ fontSize:"0.82rem", color:"#007850", marginBottom:"0.3rem" }}>+ {p}</div>)}
                {c.cons.map(p => <div key={p} style={{ fontSize:"0.82rem", color:"#7a8898", marginBottom:"0.3rem" }}>− {p}</div>)}
              </div>
            ))}
          </div>

          <SeoH2>Salary and savings in Vietnam</SeoH2>
          <P>Entry-level language centre roles pay USD 1,200–1,500/month. Experienced teachers at top centres earn USD 1,600–2,000/month. Monthly living costs in HCMC for rent, food and transport typically run USD 500–700, meaning most teachers save USD 600–1,000/month.</P>

          <CourseCTA className="blog-cta-section" heading="Ready to teach in Vietnam?" sub="Get TEFL certified online and start your Vietnam job search today." />

          <FAQBlock useBlogStyling faqs={[
            { q: "How strict is Vietnam about work permits?", a: "Very strict — enforcement has increased significantly since 2017. We strongly recommend ensuring your employer provides a proper work permit before you start teaching." },
            { q: "What is the work permit process in Vietnam?", a: "Your employer applies for a work permit on your behalf. You will need your apostilled degree, TEFL certificate, health check, background check and passport. The process typically takes 4–6 weeks." },
            { q: "Can I teach English online from Vietnam?", a: "Yes — Vietnam has good infrastructure in HCMC and Hanoi, and many teachers combine in-person school work with online platform teaching to maximise income." },
            { q: "Is it expensive to live in Vietnam?", a: "No — Vietnam is one of the most affordable countries in SE Asia. A comfortable lifestyle in HCMC costs USD 500–800/month, leaving most teachers with strong savings potential." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/tefl-course-vietnam", label: "TEFL Course for Vietnam", desc: "Get certified for Vietnam's market" },
            { href: "/destinations/vietnam", label: "Vietnam Destination Guide", desc: "Full salary, visa and market guide" },
            { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide for Asia", desc: "Compare Vietnam with other markets" },
            { href: "/jobs", label: "Teaching Jobs in Vietnam", desc: "Browse live vacancies" },
          ]} />
        </div>
      </div>
    </main>
  );
}

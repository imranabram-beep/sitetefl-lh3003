import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks, SalaryTable } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "Become an English Teacher in Asia | Complete 2026 Guide",
  description: "Learn how to become a certified English teacher in South East Asia. Requirements, salaries, visa routes and how a TEFL course helps you start your career abroad.",
  keywords: ["become English teacher Asia","how to teach English abroad Asia","how to become ESL teacher","English teaching requirements Asia","TEFL certification Asia"],
  openGraph: { title: "Become an English Teacher in Asia | Complete 2026 Guide", description: "Everything you need to know about becoming an English teacher in South East Asia in 2026.", type: "article" },
};

export default function BecomeEnglishTeacherAsiaPage() {
  return (
    <main>
      <SeoHero
        eyebrow="Guide · 2026"
        h1="How to Become an English Teacher in South East Asia"
        sub="A complete guide to starting your English teaching career in SE Asia — requirements, salaries, visa routes and which TEFL course gives you the best start."
      />
      <StatBar stats={[
        { value: "12 countries", label: "Covered" },
        { value: "205k+", label: "Teachers trained" },
        { value: "4–6 weeks", label: "To get certified" },
        { value: "24 hrs", label: "Job support response" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>What qualifications do you need?</SeoH2>
          <P>The core requirements to teach English in South East Asia are straightforward. Most markets expect the following:</P>
          <CheckList items={[
            "A recognised TEFL or TESOL certificate (120 hours minimum)",
            "A bachelor's degree in any subject (required for work permits in Thailand, Vietnam, Korea)",
            "Native or near-native English proficiency",
            "A clean criminal background check",
            "Enthusiasm for teaching and working in a cross-cultural environment",
          ]} />
          <P>Cambodia, Indonesia and the Philippines are more flexible and have accessible entry routes even for teachers without a degree. A TEFL certificate alone is sufficient for some roles in these markets.</P>

          <SeoH2>Salary comparison across SE Asia (2026)</SeoH2>
          <SalaryTable rows={[
            { country:"Thailand",    flag:"🇹🇭", salary:"THB 35–60k/mo",      usd:"$1,000–1,800", demand:"Very High" },
            { country:"Vietnam",     flag:"🇻🇳", salary:"USD 1,200–2,000/mo", usd:"$1,200–2,000", demand:"Very High" },
            { country:"South Korea", flag:"🇰🇷", salary:"KRW 2.1–3.0m/mo",   usd:"$1,600–2,300", demand:"High" },
            { country:"Cambodia",    flag:"🇰🇭", salary:"USD 900–1,500/mo",   usd:"$900–1,500",   demand:"High" },
            { country:"Indonesia",   flag:"🇮🇩", salary:"USD 1,000–2,000/mo", usd:"$1,000–2,000", demand:"High" },
            { country:"Malaysia",    flag:"🇲🇾", salary:"MYR 3,500–6,000/mo", usd:"$750–1,300",   demand:"Medium" },
          ]} />

          <SeoH2>Step-by-step: How to become an English teacher in Asia</SeoH2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { n:"01", title:"Get TEFL certified", desc:"Complete a 120-hour online TEFL course. This is the most important step — it unlocks the majority of teaching positions across SE Asia and can be done in 4–6 weeks studying part-time." },
              { n:"02", title:"Choose your destination", desc:"Compare salary, visa requirements, demand and lifestyle across countries. Thailand and Vietnam are best for first-timers. Korea and Japan offer the highest packages. Cambodia is most accessible." },
              { n:"03", title:"Prepare your documents", desc:"You will need your degree certificate (apostilled for some countries), TEFL certificate, passport, background check and recent photos. Start these early as they take time." },
              { n:"04", title:"Apply for jobs", desc:"Use our jobs board, partner school network and destination guides. Apply 2–3 months before your target start date. Most schools respond within 1–2 weeks." },
              { n:"05", title:"Secure your visa", desc:"Your employer will typically guide you through the visa process. In Thailand this is a Non-B visa. In Vietnam, a work permit. In Korea, an E-2 teaching visa." },
              { n:"06", title:"Start teaching", desc:"Arrive, complete any required orientation and start your first classes. Most teachers are in their first role within 8–12 weeks of starting their TEFL course." },
            ].map((s) => (
              <div key={s.n} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 12, padding: "1.25rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#12263a", color: "#00c8b0", fontSize: "0.78rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#223548", marginBottom: "0.35rem" }}>{s.title}</div>
                  <div style={{ fontSize: "0.85rem", color: "#3a5060", lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <CourseCTA heading="Start your TEFL journey today" sub="Complete your 120-hour TEFL course online and be teaching in Asia within 8–12 weeks." />

          <FAQBlock faqs={[
            { q: "How long does it take to become an English teacher in Asia?", a: "From starting your TEFL course to your first day of teaching typically takes 8–16 weeks. The TEFL course itself takes 4–6 weeks part-time. Document preparation and job applications add another 4–8 weeks." },
            { q: "Do I need teaching experience before going to Asia?", a: "No. Most language centres and public school programmes across SE Asia actively hire first-time teachers with no prior classroom experience. Your TEFL certificate demonstrates you have the foundational skills needed." },
            { q: "Which country in SE Asia is easiest for first-time teachers?", a: "Cambodia has the lowest barrier to entry — a degree is not always required and visa processes are simpler. Thailand and Vietnam are also excellent for first-timers and have larger job markets." },
            { q: "Can I teach English in Asia if I am not a native English speaker?", a: "Yes. Most schools require near-native proficiency (C1 or above on the CEFR scale) rather than a native speaker background. Non-native speakers from countries like the Philippines teach successfully across all SE Asian markets." },
            { q: "Is TEFL worth doing in 2026?", a: "Yes — demand for English teachers across SE Asia, the Middle East and East Asia remains very strong. A TEFL certificate significantly improves your earning potential and opens doors to markets that require formal qualifications." },
          ]} />

          <RelatedLinks links={[
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Start your certification today" },
            { href: "/tefl-course-thailand", label: "TEFL Course for Thailand", desc: "Thailand-specific requirements and market guide" },
            { href: "/tefl-course-vietnam", label: "TEFL Course for Vietnam", desc: "Vietnam-specific requirements and market guide" },
            { href: "/blog/do-you-need-a-degree-to-teach-english-in-asia", label: "Teach Without a Degree in Asia", desc: "Which markets are accessible without a degree" },
            { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide for Asia", desc: "Full salary comparison by country" },
            { href: "/destinations", label: "All Destination Guides", desc: "Compare every teaching market in Asia" },
          ]} />
        </div>
      </div>
    </main>
  );
}

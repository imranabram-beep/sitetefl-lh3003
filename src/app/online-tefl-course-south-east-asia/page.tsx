import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "Online TEFL Course South East Asia | Get Certified & Start Teaching",
  description: "Get TEFL certified online and start teaching English across South East Asia or remotely. Flexible courses with job support included. Study at your own pace.",
  keywords: ["online TEFL course South East Asia","TEFL certification Asia","TEFL course online Asia","best TEFL course Asia","affordable TEFL course Asia"],
  openGraph: { title: "Online TEFL Course South East Asia | Get Certified & Start Teaching", description: "Get TEFL certified online and start teaching English across South East Asia.", type: "website" },
};

export default function OnlineTeflCourseSEAPage() {
  return (
    <main>
      <SeoHero
        eyebrow="Online TEFL Course · South East Asia"
        h1="Online TEFL Course for South East Asia"
        sub="Get TEFL certified from anywhere and start teaching English across Thailand, Vietnam, Cambodia, Indonesia and beyond. Flexible online study, job support included."
        badge="Recognised across SE Asia · Start anytime"
      />
      <StatBar stats={[
        { value: "205k+", label: "Teachers trained" },
        { value: "320+", label: "Partner schools" },
        { value: "12 countries", label: "Job placement" },
        { value: "4.8/5", label: "Student rating" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>Why TEFL matters in South East Asia</SeoH2>
          <P>South East Asia has one of the world's fastest-growing English learning markets. Schools, language centres and international institutions across Thailand, Vietnam, Cambodia, Indonesia, Malaysia and the Philippines actively recruit TEFL-certified teachers year-round. A recognised TEFL certificate is the single most important qualification you need to access this market.</P>
          <P>Our online TEFL course is designed specifically for teachers planning to work in SE Asia — covering the classroom techniques, lesson planning approaches and student management strategies that regional schools expect.</P>

          <SeoH2>What our TEFL courses include</SeoH2>
          <CheckList items={[
            "120+ hours of structured online study — complete at your own pace",
            "Grammar, methodology, lesson planning and classroom management",
            "Practical activities, quizzes and video lessons throughout",
            "Certificate on completion — recognised by schools across SE Asia",
            "Job support and access to our partner school network",
            "Dedicated student support throughout your course",
          ]} />

          <SeoH2>Which course is right for you?</SeoH2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { title: "120-Hour Premier TEFL", price: "£149", desc: "The most popular route. Covers everything you need for your first teaching role in SE Asia.", href: "/courses/120-hour-premier-online-tefl-course", badge: "Most popular" },
              { title: "Level 5 TEFL Diploma", price: "£299", desc: "Deeper credentials and stronger career prospects. Ideal for competitive markets like Singapore and Korea.", href: "/courses/168-hour-level-5-tefl-diploma", badge: "Best credentials" },
              { title: "Teach English Online", price: "£59", desc: "Specialist course for remote teaching. Platform setup, student engagement and online classroom tools.", href: "/courses/30-hour-teach-english-online-course", badge: "Online focus" },
            ].map((c) => (
              <a key={c.href} href={c.href} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 14, padding: "1.25rem", textDecoration: "none", display: "block" }}>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, background: "rgba(0,176,155,0.1)", color: "#007a6a", padding: "0.15rem 0.55rem", borderRadius: 4, textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{c.badge}</span>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#223548", margin: "0.6rem 0 0.3rem" }}>{c.title}</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#12263a", marginBottom: "0.5rem" }}>{c.price}</div>
                <div style={{ fontSize: "0.82rem", color: "#3a5060", lineHeight: 1.55 }}>{c.desc}</div>
              </a>
            ))}
          </div>

          <SeoH2>Top teaching destinations in SE Asia</SeoH2>
          <P>After qualifying, our students typically find roles in these markets:</P>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "0.65rem", marginBottom: "1.5rem" }}>
            {[
              { flag:"🇹🇭", country:"Thailand", city:"Bangkok", sal:"THB 35–60k/mo", href:"/tefl-course-thailand" },
              { flag:"🇻🇳", country:"Vietnam", city:"Ho Chi Minh City", sal:"USD 1,200–2,000/mo", href:"/tefl-course-vietnam" },
              { flag:"🇰🇭", country:"Cambodia", city:"Phnom Penh", sal:"USD 900–1,500/mo", href:"/tefl-course-cambodia" },
              { flag:"🇮🇩", country:"Indonesia", city:"Jakarta", sal:"USD 1,000–2,000/mo", href:"/tefl-course-indonesia" },
              { flag:"🇲🇾", country:"Malaysia", city:"Kuala Lumpur", sal:"MYR 3,500–6,000/mo", href:"/tefl-course-malaysia" },
              { flag:"🇵🇭", country:"Philippines", city:"Manila", sal:"USD 700–1,200/mo", href:"/tefl-course-philippines" },
            ].map((d) => (
              <a key={d.href} href={d.href} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 10, padding: "0.85rem", textDecoration: "none", display: "block" }}>
                <span style={{ fontSize: "1.5rem" }}>{d.flag}</span>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#223548", margin: "0.35rem 0 0.15rem" }}>{d.country}</div>
                <div style={{ fontSize: "0.72rem", color: "#7a8898" }}>{d.sal}</div>
              </a>
            ))}
          </div>

          <CourseCTA />

          <FAQBlock faqs={[
            { q: "Is an online TEFL course accepted in South East Asia?", a: "Yes. The majority of language schools, academies and international schools across Thailand, Vietnam, Cambodia, Indonesia, Malaysia and the Philippines accept online TEFL certificates, provided the course is at least 120 hours. Our certificate meets these requirements." },
            { q: "Do I need a degree to teach in SE Asia?", a: "A degree is required for a formal work permit in Thailand, Vietnam and South Korea. Cambodia and Indonesia have more flexible entry routes. A TEFL certificate alone can open doors for some roles, particularly online teaching." },
            { q: "How long does the course take?", a: "The 120-hour course typically takes 4–6 weeks studying part-time. There are no deadlines — you can study faster or slower to suit your schedule." },
            { q: "What support do I get after I qualify?", a: "All students get access to our jobs board, destination guides and 24-hour job support. We have partner schools across 12 countries and can help connect you with hiring contacts in your target market." },
            { q: "Can I teach online with this certificate?", a: "Yes. Our standard certificate is accepted by most online teaching platforms. The 30-hour Teach English Online specialist course covers platform selection, online classroom setup and student acquisition." },
          ]} />

          <RelatedLinks links={[
            { href: "/tefl-course-thailand", label: "TEFL Course for Thailand", desc: "Requirements, salary and job market for Thailand" },
            { href: "/tefl-course-vietnam", label: "TEFL Course for Vietnam", desc: "What schools in Vietnam require and expect" },
            { href: "/become-an-english-teacher-in-asia", label: "Become an English Teacher in Asia", desc: "Complete 2026 guide to starting your teaching career" },
            { href: "/blog/best-tefl-course-for-south-east-asia", label: "Best TEFL Courses for SE Asia", desc: "Compare courses and find the right fit" },
            { href: "/jobs", label: "Teaching Jobs in Asia", desc: "Browse live teaching vacancies across SE Asia" },
            { href: "/destinations", label: "Destination Guides", desc: "Compare salaries, visas and demand by country" },
          ]} />
        </div>
      </div>
    </main>
  );
}

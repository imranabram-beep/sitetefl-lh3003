import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";
import { BlogHeroImage } from "@/components/blog-image-display";
import { ThailandIllustration } from "@/components/blog-illustrations";

export const metadata: Metadata = {
  title: "How to Teach English in Thailand | Requirements & Salary 2026",
  description: "Discover how to become an English teacher in Thailand, including TEFL requirements, salary expectations, visa routes and job search tips.",
  keywords: ["how to teach English Thailand","English teacher requirements Thailand","TEFL Thailand","ESL teacher Thailand","teach abroad Thailand"],
};

export default function HowToTeachThailandPage() {
  return (
    <main>
      <div style={{ position: "relative", overflow: "visible" }}>
        <BlogHero
          category="Country Guide · Thailand"
          h1="How to Become an English Teacher in Thailand (2026)"
          sub="Thailand is the most popular TEFL destination in South East Asia. Here is everything you need to know about qualifications, salaries, visa routes and finding your first job."
          readTime="7 min"
        />
        <BlogHeroImage
          illustration={<ThailandIllustration />}
          alt="Thailand temple illustration"
          position="right"
        />
      </div>
      <div className="blog-content-wrapper">
        <div className="blog-content-container">

          <SeoH2>Why Thailand?</SeoH2>
          <P>Thailand has one of the largest and most accessible English teaching markets in South East Asia. With thousands of language centres, public schools and international schools hiring year-round, it is the go-to first destination for many TEFL teachers — and for good reason. Low cost of living, a warm and welcoming culture, incredible food and easy travel access to the rest of SE Asia make it a hard market to beat.</P>

          <SeoH2>What qualifications do you need?</SeoH2>
          <CheckList items={[
            "120-hour TEFL/TESOL certificate (minimum — required by most schools)",
            "Bachelor's degree in any subject (required for a work permit)",
            "Native or near-native English proficiency",
            "Clean criminal background check (apostilled from your home country)",
            "Valid passport with at least 12 months remaining",
          ]} />
          <P>The degree requirement is strict for formal employment in Thailand — you need it to obtain a Non-Immigrant B visa and teaching licence. Without a degree, your options are limited to volunteer roles or short-term positions that operate in a grey area.</P>

          <SeoH2>Salary expectations in Thailand</SeoH2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { type: "Language centres", range: "THB 30,000–45,000/mo", usd: "~$850–1,300" },
              { type: "Public schools", range: "THB 35,000–50,000/mo", usd: "~$1,000–1,450" },
              { type: "International schools", range: "THB 60,000–120,000+/mo", usd: "~$1,700–3,500+" },
            ].map((s) => (
              <div key={s.type} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 10, padding: "1rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" as const, color: "#7a8898", marginBottom: "0.4rem" }}>{s.type}</div>
                <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#223548", marginBottom: "0.2rem" }}>{s.range}</div>
                <div style={{ fontSize: "0.8rem", color: "#007a6a", fontWeight: 600 }}>{s.usd}</div>
              </div>
            ))}
          </div>
          <P>Cost of living in Bangkok is low — a comfortable lifestyle including rent, food and transport typically costs THB 15,000–22,000/month, meaning most teachers can save THB 10,000–20,000/month even on entry-level salaries.</P>

          <SeoH2>Step-by-step: How to get a teaching job in Thailand</SeoH2>
          {[
            { n: "1", t: "Get TEFL certified", d: "Complete a 120-hour TEFL course online. This is your entry ticket to the Thai job market. Schools will not interview you seriously without it." },
            { n: "2", t: "Prepare your documents", d: "Gather your degree certificate (apostilled), TEFL certificate, passport copy, background check and recent passport photos. Start apostilling your degree early — it takes 2–4 weeks." },
            { n: "3", t: "Apply for jobs", d: "Use our jobs board, Ajarn.com and direct applications to school networks. Apply 2–3 months before your target start date. Schools respond quickly — usually within 1 week." },
            { n: "4", t: "Obtain your visa", d: "Enter Thailand on a tourist visa, secure a job offer, then convert to a Non-Immigrant B visa. Your employer handles most of the paperwork for the work permit and teaching licence." },
            { n: "5", t: "Start teaching", d: "Complete your school's orientation and start classes. Most teachers are settled and teaching within 10–14 weeks of starting their TEFL course." },
          ].map((s) => (
            <div key={s.n} style={{ background: "#ffffff", border: "1px solid #dbe4ec", borderRadius: 10, padding: "1.1rem", marginBottom: "0.65rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#12263a", color: "#00c8b0", fontSize: "0.78rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#223548", marginBottom: "0.25rem" }}>{s.t}</div>
                <div style={{ fontSize: "0.84rem", color: "#3a5060", lineHeight: 1.6 }}>{s.d}</div>
              </div>
            </div>
          ))}

          <CourseCTA className="blog-cta-section" heading="Ready to teach in Thailand?" sub="Get TEFL certified online and start your Thailand job search today." />

          <FAQBlock useBlogStyling faqs={[
            { q: "How long does it take to get a teaching job in Thailand?", a: "From starting your TEFL course to your first day teaching typically takes 10–16 weeks. The TEFL course itself takes 4–6 weeks part-time, then 4–8 weeks for document preparation, job applications and visa processing." },
            { q: "Do I need to speak Thai to teach in Thailand?", a: "No — English is the language of instruction and most schools prefer teachers who teach entirely in English. Basic conversational Thai is helpful for daily life but not required for the job." },
            { q: "Is Bangkok the best city to teach in?", a: "Bangkok has the most jobs and the highest salaries, but Chiang Mai, Phuket, Pattaya and smaller cities all have active markets with less competition. Many teachers prefer the slower pace of life outside Bangkok." },
            { q: "Can I teach in Thailand without a degree?", a: "A degree is technically required for a formal work permit. Some schools operate less formally and may hire without one, but this limits your options and legal protection. A degree opens far more doors." },
            { q: "What is the Thai Baht worth in USD?", a: "Approximately THB 35 = USD 1 (2026). So THB 40,000/month is roughly USD 1,140/month — strong purchasing power given Thailand's low cost of living." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/tefl-course-thailand", label: "TEFL Course for Thailand", desc: "Get certified to teach in Thailand" },
            { href: "/destinations/thailand", label: "Thailand Destination Guide", desc: "Full salary, visa and market guide" },
            { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide for Asia", desc: "Compare Thailand with other SE Asian markets" },
            { href: "/jobs", label: "Teaching Jobs in Thailand", desc: "Browse live vacancies" },
            { href: "/become-an-english-teacher-in-asia", label: "Become an English Teacher in Asia", desc: "Complete regional guide" },
          ]} />
        </div>
      </div>
    </main>
  );
}

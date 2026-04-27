import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";
import { BlogHeroImage } from "@/components/blog-image-display";
import { TeflCoursesIllustration } from "@/components/blog-illustrations";

export const metadata: Metadata = {
  title: "Best TEFL Course for South East Asia | 2026 Guide",
  description: "Compare the best TEFL courses for teaching in South East Asia. Find the right certification for your goals, budget and target country.",
  keywords: ["best TEFL course Asia","best TEFL certification South East Asia","TEFL course comparison","which TEFL course","120 hour TEFL course"],
};

export default function BestTeflCourseSEAPage() {
  return (
    <main>
      <div style={{ position: "relative", overflow: "visible" }}>
        <BlogHero
          category="TEFL Guide"
          h1="Best TEFL Courses for South East Asia (2026)"
          sub="Choosing the right TEFL course is the most important decision you'll make before teaching in Asia. Here's an honest comparison of what's available and what schools actually expect."
          readTime="6 min"
        />
        <BlogHeroImage
          illustration={<TeflCoursesIllustration />}
          alt="TEFL courses illustration"
          position="right"
        />
      </div>
      <div className="blog-content-wrapper">
        <div className="blog-content-container">

          <SeoH2>What SE Asian schools actually require</SeoH2>
          <P>The majority of language centres and schools across Thailand, Vietnam, Cambodia, Indonesia and Malaysia require a minimum 120-hour TEFL certificate. This is the industry standard — not a 20-hour or 40-hour certificate, but a full 120-hour course covering grammar, methodology, lesson planning and classroom management.</P>
          <P>Premium international schools and British Council centres may also expect CELTA or an equivalent Level 5 qualification. But for the vast majority of first teaching roles across SE Asia, a solid 120-hour online TEFL course is exactly what schools are looking for.</P>

          <SeoH2>The three courses worth considering</SeoH2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem", marginBottom: "1.5rem" }}>
            {[
              { badge: "Best overall", title: "120-Hour Premier Online TEFL Course", price: "£149", best: "First-time teachers heading to Thailand, Vietnam, Cambodia, Indonesia or Malaysia", includes: ["120 hours of structured content","Grammar, methodology and lesson planning","Video lessons, quizzes and practical activities","Recognised certificate on completion","Job support and partner school access"], href: "/courses/120-hour-premier-online-tefl-course" },
              { badge: "Best credentials", title: "168-Hour Level 5 TEFL Diploma", price: "£299", best: "Teachers targeting international schools, Singapore, Korea or UAE", includes: ["168 hours — Level 5 qualification","Deeper methodology and specialist modules","Stronger credentials for competitive markets","Higher salary access in premium schools"], href: "/courses/168-hour-level-5-tefl-diploma" },
              { badge: "Online teaching focus", title: "30-Hour Teach English Online Course", price: "£59", best: "Teachers planning to work on online platforms from SE Asia or remotely", includes: ["Platform selection and setup","Online classroom management","Student acquisition strategies","Pairs perfectly with the 120-hour course"], href: "/courses/30-hour-teach-english-online-course" },
            ].map((c) => (
              <div key={c.title} className="blog-course-card">
                <div className="blog-course-card-header">
                  <div>
                    <span className="blog-course-badge">{c.badge}</span>
                    <div className="blog-course-title">{c.title}</div>
                  </div>
                  <div className="blog-course-price">{c.price}</div>
                </div>
                <div className="blog-course-description">Best for: {c.best}</div>
                <ul className="blog-course-features">
                  {c.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={c.href} className="blog-course-link">View course →</a>
              </div>
            ))}
          </div>

          <SeoH2>Our recommendation</SeoH2>
          <P>For most teachers heading to SE Asia, the 120-hour Premier Online TEFL Course is the right choice. It meets the requirements of schools across all SE Asian markets, can be completed in 4–6 weeks studying part-time, and comes with job support to help you find your first role.</P>
          <P>If you are targeting an international school, a British Council centre or planning to work in Singapore or Korea, consider the Level 5 Diploma — the stronger qualification opens doors to higher-paying roles.</P>

          <CourseCTA className="blog-cta-section" heading="Start your TEFL course today" sub="Recognised across SE Asia. Complete online at your own pace. Job support included." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Is a 120-hour TEFL course enough for SE Asia?", a: "Yes — 120 hours is the industry standard minimum for language centres and most schools across Thailand, Vietnam, Cambodia, Indonesia, Malaysia and the Philippines. It qualifies you for the vast majority of available roles." },
            { q: "Is an online TEFL as good as an in-person one?", a: "For SE Asia, yes. Schools care about the qualification itself, not whether it was completed online or in a classroom. Online TEFL certificates from reputable providers are fully accepted across all SE Asian markets." },
            { q: "Do I need CELTA to teach in SE Asia?", a: "CELTA is valued but not required for most SE Asian roles. It is expected at British Council centres and some premium international schools. The TEFL SEA Level 5 Diploma offers equivalent credentials at a lower cost." },
            { q: "Can I complete the course while still planning my move?", a: "Yes — the course is entirely self-paced. Most teachers complete it in the months before their planned departure date. There is no deadline and you can study from anywhere." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Full overview of our SE Asia TEFL courses" },
            { href: "/tefl-course-thailand", label: "TEFL Course for Thailand", desc: "Thailand-specific requirements and market guide" },
            { href: "/tefl-course-vietnam", label: "TEFL Course for Vietnam", desc: "Vietnam-specific requirements and market guide" },
            { href: "/become-an-english-teacher-in-asia", label: "Become an English Teacher in Asia", desc: "Complete 2026 guide to starting your career" },
            { href: "/destinations", label: "Compare Destinations", desc: "Salaries, visas and demand by country" },
            { href: "/jobs", label: "Browse Teaching Jobs", desc: "Live vacancies across SE Asia" },
          ]} />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course China | Get Certified to Teach English in China",
  description:
    "Get TEFL certified to teach English in China. Learn about salaries, visa rules, requirements, teaching jobs, and whether you can teach in China without a degree.",
  keywords: [
    "TEFL course China",
    "teach English in China",
    "TEFL China",
    "English teaching jobs China",
    "teach English China without degree",
  ],
  openGraph: {
    title: "TEFL Course China | Get Certified to Teach English in China",
    description:
      "Prepare for teaching jobs in China with TEFL certification, salary guidance, visa information, and practical advice for new teachers.",
    type: "website",
  },
  alternates: { canonical: "/tefl-course-china" },
};

export default function TeflCourseChinaPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · China"
        h1="Online TEFL Course for Teaching in China"
        sub="China remains one of the biggest English teaching markets in the world. Schools hire year-round across public schools, language centres, and private institutions, with salaries that often include housing or other benefits."
        badge="Large job market · Strong salary packages"
      />
      <StatBar
        stats={[
          { value: "USD 1,500–3,500/mo", label: "Typical salary" },
          { value: "Very High", label: "Teacher demand" },
          { value: "Beijing / Shanghai", label: "Main hubs" },
          { value: "120 hrs", label: "Course length" },
        ]}
      />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SeoH2>Why teach English in China?</SeoH2>
          <CheckList
            items={[
              "One of the largest TEFL job markets in the world",
              "Strong salaries compared with local living costs",
              "Housing, flights, and bonuses often included",
              "Wide range of cities, school types, and student age groups",
            ]}
          />

          <SeoH2>What China schools expect</SeoH2>
          <P>
            China is a major opportunity market, but it is more regulated than some South East Asian destinations. Schools and recruiters usually want applicants who clearly meet visa requirements and can step into the classroom confidently.
          </P>
          <CheckList
            items={[
              "120-hour TEFL/TESOL certificate commonly required",
              "Bachelor's degree required for legal work visa routes",
              "Strong English proficiency",
              "Valid passport and clean background check",
              "Professional attitude and readiness for structured hiring",
            ]}
          />

          <SeoH2>Can you teach English in China without a degree?</SeoH2>
          <P>
            For legal mainstream teaching roles, no. China typically requires a bachelor's degree as part of the work visa process for foreign English teachers.
          </P>
          <P>
            That is why a TEFL certificate should be paired with the right core qualifications. If you do have a degree, TEFL certification can help you access more roles, stronger offers, and better classroom readiness.
          </P>

          <SeoH2>Visa requirements for China</SeoH2>
          <P>
            China is one of the more document-driven TEFL markets. Teachers usually need a degree, background check, passport validity, and employer sponsorship. Rules can change, so schools and recruiters normally guide successful applicants through the process.
          </P>
          <P>Best for: degree holders, teachers seeking higher salaries, and applicants who want a large and structured market.</P>

          <SeoH2>Where do teachers work in China?</SeoH2>
          <CheckList
            items={[
              "Private language centres",
              "Public schools",
              "Bilingual schools",
              "International schools",
            ]}
          />

          <SeoH2>Best cities to teach in China</SeoH2>
          <CheckList
            items={[
              "Beijing for prestige and strong demand",
              "Shanghai for salary and international exposure",
              "Shenzhen and Guangzhou for modern, fast-growing markets",
              "Second-tier cities for lower living costs and less competition",
            ]}
          />

          <CourseCTA
            heading="Ready to teach in China?"
            sub="Build a stronger application with online TEFL training and prepare for one of the biggest teaching markets in Asia."
          />

          <FAQBlock
            faqs={[
              {
                q: "Do I need a degree to teach in China?",
                a: "Yes, in most cases you need a bachelor's degree to qualify for a legal English teaching work visa in China.",
              },
              {
                q: "What salary can I expect in China?",
                a: "Many teachers earn between USD 1,500 and 3,500 per month, with some packages also including housing, flights, bonuses, or contract completion benefits.",
              },
              {
                q: "Is China good for first-time teachers?",
                a: "China can be good for first-time teachers who have the right documents and want a large market with structured hiring. It is less flexible than Laos or Cambodia, but often offers stronger packages.",
              },
              {
                q: "Why take a TEFL course before applying to China?",
                a: "A TEFL course helps meet school expectations, improves classroom confidence, and can strengthen your application in a competitive hiring market.",
              },
            ]}
          />

          <RelatedLinks
            links={[
              { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Explore TEFL pathways for Asia" },
              { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide Asia", desc: "Compare salaries across major destinations" },
              { href: "/blog/do-you-need-a-degree-to-teach-english-in-asia", label: "Do You Need a Degree to Teach English in Asia?", desc: "See where China fits on degree requirements" },
              { href: "/jobs", label: "Teaching Jobs in Asia", desc: "Browse live English teaching vacancies" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

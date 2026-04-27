import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Taiwan | Get Certified to Teach English in Taiwan",
  description:
    "Get TEFL certified to teach English in Taiwan. Learn about salaries, requirements, jobs, and whether you can teach in Taiwan without a degree.",
  keywords: [
    "TEFL course Taiwan",
    "teach English in Taiwan",
    "TEFL Taiwan",
    "English teaching jobs Taiwan",
    "teach English Taiwan without degree",
  ],
  openGraph: {
    title: "TEFL Course Taiwan | Get Certified to Teach English in Taiwan",
    description:
      "Prepare for teaching jobs in Taiwan with TEFL certification, salary guidance, and practical information for English teachers.",
    type: "website",
  },
  alternates: { canonical: "/tefl-course-taiwan" },
};

export default function TeflCourseTaiwanPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Taiwan"
        h1="Online TEFL Course for Teaching in Taiwan"
        sub="Taiwan is one of the strongest TEFL destinations for teachers who want a balance of good salaries, high quality of life, and a welcoming environment. It is especially attractive for teachers who want a more comfortable long-term base in Asia."
        badge="High quality of life · Strong TEFL demand"
      />
      <StatBar
        stats={[
          { value: "USD 1,800–2,800/mo", label: "Typical salary" },
          { value: "High", label: "Teacher demand" },
          { value: "Taipei", label: "Main hub" },
          { value: "120 hrs", label: "Course length" },
        ]}
      />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SeoH2>Why teach English in Taiwan?</SeoH2>
          <CheckList
            items={[
              "Good salary-to-lifestyle balance",
              "Strong demand in buxibans and schools",
              "Safe, welcoming, and easy to settle into",
              "Popular option for teachers who want a longer stay in Asia",
            ]}
          />

          <SeoH2>What Taiwan schools expect</SeoH2>
          <P>
            Employers in Taiwan usually want teachers who have a degree, good English ability, and a recognised TEFL certificate. Schools value candidates who can teach clearly, manage a classroom, and adapt to local expectations.
          </P>
          <CheckList
            items={[
              "120-hour TEFL/TESOL certificate strongly recommended",
              "Bachelor's degree usually required",
              "Native or near-native English proficiency",
              "Professional presentation and reliability",
              "Valid passport and clear documents for hiring",
            ]}
          />

          <SeoH2>Can you teach English in Taiwan without a degree?</SeoH2>
          <P>
            In most standard school roles, no. Taiwan generally expects foreign English teachers to hold a degree as part of the legal hiring process.
          </P>
          <P>
            A TEFL certificate still plays an important role because it can improve your job prospects, increase employer confidence, and help you start teaching with real classroom knowledge instead of learning everything on the spot.
          </P>

          <SeoH2>Visa requirements for Taiwan</SeoH2>
          <P>
            Schools usually help successful candidates through the work permit and visa process. As with other stronger TEFL markets, having complete documents and a recognised TEFL course can make your application smoother and more competitive.
          </P>
          <P>Best for: degree holders, teachers wanting a good lifestyle, and candidates looking for a stable long-term teaching base in Asia.</P>

          <SeoH2>Where do teachers work in Taiwan?</SeoH2>
          <CheckList
            items={[
              "Buxibans (private cram schools)",
              "Private schools",
              "Public school programmes",
              "Tutoring and specialist English support roles",
            ]}
          />

          <SeoH2>Best cities to teach in Taiwan</SeoH2>
          <CheckList
            items={[
              "Taipei for the largest concentration of jobs",
              "Taichung for balance and affordability",
              "Kaohsiung for a warmer climate and lower costs",
              "Other regional cities for less competition",
            ]}
          />

          <CourseCTA
            heading="Ready to teach in Taiwan?"
            sub="Get TEFL certified online and improve your chances of landing a strong teaching role in Taiwan."
          />

          <FAQBlock
            faqs={[
              {
                q: "Do I need a degree to teach in Taiwan?",
                a: "Usually yes. Taiwan generally requires teachers to hold a bachelor's degree for standard legal teaching roles.",
              },
              {
                q: "What salary can I expect in Taiwan?",
                a: "Many teachers earn around USD 1,800–2,800 per month depending on the city, school type, and your experience.",
              },
              {
                q: "Is Taiwan a good destination for new teachers?",
                a: "Yes, as long as you meet the main requirements. Taiwan offers a good mix of demand, lifestyle quality, and manageable day-to-day living for foreign teachers.",
              },
              {
                q: "Why is a TEFL course important for Taiwan?",
                a: "A TEFL course helps you stand out to employers, prepares you for real classroom situations, and strengthens your overall application.",
              },
            ]}
          />

          <RelatedLinks
            links={[
              { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Explore TEFL pathways for Asia" },
              { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide Asia", desc: "Compare salaries across different countries" },
              { href: "/blog/tefl-requirements-by-country-in-asia", label: "TEFL Requirements by Country in Asia", desc: "Compare rules and qualifications" },
              { href: "/jobs", label: "Teaching Jobs in Asia", desc: "Browse current English teaching vacancies" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

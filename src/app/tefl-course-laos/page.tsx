import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Laos | Get Certified to Teach English in Laos",
  description:
    "Get TEFL certified to teach English in Laos. Learn about salaries, requirements, visas, jobs, and whether you can teach in Laos without a degree.",
  keywords: [
    "TEFL course Laos",
    "teach English in Laos",
    "TEFL Laos",
    "English teaching jobs Laos",
    "teach English Laos without degree",
  ],
  openGraph: {
    title: "TEFL Course Laos | Get Certified to Teach English in Laos",
    description:
      "Train online and prepare for teaching jobs in Laos with TEFL certification, job support, and practical guidance.",
    type: "website",
  },
  alternates: { canonical: "/tefl-course-laos" },
};

export default function TeflCourseLaosPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Laos"
        h1="Online TEFL Course for Teaching in Laos"
        sub="Laos is one of the most accessible TEFL destinations in South East Asia for teachers who want a slower pace of life, affordable living, and a realistic route into the classroom. Demand is smaller than Thailand or Vietnam, but competition is lower too."
        badge="Low-competition TEFL market · Start anytime"
      />
      <StatBar
        stats={[
          { value: "USD 700–1,200/mo", label: "Typical salary" },
          { value: "Moderate", label: "Teacher demand" },
          { value: "Vientiane", label: "Main hub" },
          { value: "120 hrs", label: "Course length" },
        ]}
      />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SeoH2>Why teach English in Laos?</SeoH2>
          <CheckList
            items={[
              "Lower competition than Thailand and Vietnam",
              "Affordable cost of living and relaxed lifestyle",
              "Growing demand in private schools and language centres",
              "Strong option for first-time teachers building experience in Asia",
            ]}
          />

          <SeoH2>What Laos schools expect</SeoH2>
          <P>
            Schools in Laos are often more flexible than larger TEFL markets, but a recognised TEFL certificate still gives you a major advantage. It helps employers trust that you understand lesson planning, classroom management, and basic teaching methodology.
          </P>
          <CheckList
            items={[
              "120-hour TEFL/TESOL certificate strongly recommended",
              "Bachelor's degree preferred but not always required",
              "Native or near-native English proficiency",
              "Professional attitude and willingness to adapt",
              "Clean background and valid passport",
            ]}
          />

          <SeoH2>Can you teach English in Laos without a degree?</SeoH2>
          <P>
            Yes, Laos is one of the more flexible countries in the region if you want to teach English without a degree. Some smaller schools and language centres will consider applicants who have strong English skills and a recognised TEFL certificate.
          </P>
          <P>
            That said, having a degree still improves your chances, especially for better-paid roles in established schools. If you do not have a degree, TEFL certification becomes even more important because it shows employers you have formal training.
          </P>

          <SeoH2>Visa requirements for Laos</SeoH2>
          <P>
            Visa and work permit rules can vary by employer. Many schools will guide teachers through the process after hire. In practice, schools prefer candidates with a TEFL certificate, a passport with sufficient validity, and a degree if available.
          </P>
          <P>Best for: first-time teachers, lifestyle-focused teachers, and those looking for a lower-pressure start in Asia.</P>

          <SeoH2>Where do teachers work in Laos?</SeoH2>
          <CheckList
            items={[
              "Private language centres in Vientiane",
              "International and bilingual schools",
              "University language departments",
              "Tutoring and conversation classes",
            ]}
          />

          <CourseCTA
            heading="Ready to teach in Laos?"
            sub="Get TEFL certified online and build a stronger application for schools and language centres in Laos."
          />

          <FAQBlock
            faqs={[
              {
                q: "Do I need a degree to teach in Laos?",
                a: "Not always. Laos is one of the more flexible TEFL destinations in Asia, and some schools hire teachers without degrees. A recognised TEFL certificate can make a big difference if you do not have a university qualification.",
              },
              {
                q: "What salary can I expect in Laos?",
                a: "Most teachers earn around USD 700–1,200 per month, depending on the school, city, and your qualifications. International schools may pay more.",
              },
              {
                q: "Is Laos a good place for first-time teachers?",
                a: "Yes. Laos can be a strong entry point for new teachers who want lower competition, affordable living, and a calmer environment while building classroom experience.",
              },
              {
                q: "What is the best city for teaching in Laos?",
                a: "Vientiane has the best concentration of schools and language centres, though opportunities also exist in Luang Prabang and other urban areas.",
              },
            ]}
          />

          <RelatedLinks
            links={[
              { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Regional TEFL overview and training path" },
              { href: "/destinations/laos", label: "Laos Destination Guide", desc: "Explore salaries, cities, and lifestyle in Laos" },
              { href: "/blog/tefl-requirements-by-country-in-asia", label: "TEFL Requirements by Country in Asia", desc: "Compare degree and visa rules across Asia" },
              { href: "/jobs", label: "Teaching Jobs in Asia", desc: "Browse current English teaching vacancies" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Thailand | Get Certified to Teach English in Thailand",
  description:
    "Become a certified English teacher for Thailand. Study online and access job opportunities, visa guidance and placement support. Start anytime.",
  keywords: [
    "TEFL course Thailand",
    "teach English Thailand",
    "TEFL certification Thailand",
    "ESL teacher Thailand",
    "English teaching jobs Thailand",
    "teach English Thailand without degree",
  ],
  openGraph: {
    title: "TEFL Course Thailand | Get Certified to Teach English in Thailand",
    description:
      "Become a certified English teacher for Thailand. Flexible online study with job support.",
    type: "website",
  },
  alternates: { canonical: "/tefl-course-thailand" },
};

export default function TeflCourseThailandPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Thailand"
        h1="Teach English in Thailand: Online TEFL Course & Job Guide"
        sub="Thailand is the most popular TEFL destination in South East Asia. With thousands of language centres, public schools and international schools hiring year-round, it is the easiest market to enter and a fantastic first posting."
        badge="Recognised by schools in Thailand · Start anytime"
      />
      <StatBar
        stats={[
          { value: "THB 35,000–60,000/mo", label: "Typical salary" },
          { value: "Very High", label: "Teacher demand" },
          { value: "Bangkok", label: "Main hub" },
          { value: "120 hrs", label: "Course length" },
        ]}
      />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SeoH2>Why teach English in Thailand?</SeoH2>
          <CheckList
            items={[
              "Largest TEFL market in South East Asia with year-round hiring",
              "Low cost of living compared with many other destinations",
              "Friendly culture, strong travel appeal, and a huge expat teacher community",
              "Great entry point for new teachers who want experience abroad",
            ]}
          />

          <SeoH2>What Thailand schools expect</SeoH2>
          <P>
            Most schools and language centres in Thailand want teachers with a recognised TEFL certificate of at least 120 hours. For better jobs and legal work routes, employers also usually expect a degree and complete documents.
          </P>
          <CheckList
            items={[
              "120-hour TEFL/TESOL certificate",
              "Bachelor's degree for most formal teaching roles",
              "Native or near-native English proficiency",
              "Valid passport and suitable visa paperwork",
              "Clean criminal background check",
            ]}
          />

          <SeoH2>Can you teach English in Thailand without a degree?</SeoH2>
          <P>
            In most cases, you will need a bachelor's degree to teach English legally in Thailand because it is usually required for work permits and the standard Non-B visa route.
          </P>
          <P>
            Some language centres, tutoring roles, and short-term programmes may consider teachers without degrees, especially if they hold a recognised TEFL certificate. These jobs are often less secure and may offer lower pay.
          </P>
          <P>
            If you do not have a degree, a TEFL certificate becomes even more important because it shows schools that you have teaching knowledge, lesson planning skills, and classroom awareness.
          </P>

          <SeoH2>Visa requirements for Thailand</SeoH2>
          <P>
            For most mainstream teaching roles, schools expect teachers to have a degree, TEFL certification, valid passport, and supporting background documents. Employers normally guide successful applicants through the visa process.
          </P>
          <P>Best for: first-time teachers, lifestyle seekers, and people who want a broad choice of schools and cities.</P>

          <SeoH2>Where do teachers work in Thailand?</SeoH2>
          <CheckList
            items={[
              "Language centres and private academies",
              "Public school programmes",
              "International and bilingual schools",
              "Private tutoring and online support roles",
            ]}
          />

          <CourseCTA
            heading="Ready to teach in Thailand?"
            sub="Get TEFL certified online and start building a stronger application for teaching jobs in Thailand."
          />

          <FAQBlock
            faqs={[
              {
                q: "Do I need a degree to teach in Thailand?",
                a: "For most legal full-time teaching jobs, yes. A degree is usually required for the main work permit and visa route, though a few informal or short-term roles may be more flexible.",
              },
              {
                q: "What salary can I expect in Thailand?",
                a: "Entry-level teachers often earn around THB 35,000–45,000 per month. Better-paying roles and stronger schools can push this higher.",
              },
              {
                q: "Is Thailand a good place for first-time teachers?",
                a: "Yes. Thailand is one of the most popular starting points in Asia because there are many jobs, a large support network, and a relatively accessible market.",
              },
              {
                q: "Which city is best for teaching in Thailand?",
                a: "Bangkok has the largest number of openings, but cities like Chiang Mai, Phuket, and Pattaya also attract many teachers.",
              },
            ]}
          />

          <RelatedLinks
            links={[
              { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Overview of TEFL for the region" },
              { href: "/destinations/thailand", label: "Thailand Destination Guide", desc: "Full salary, visa, and lifestyle guide" },
              { href: "/blog/how-to-become-an-english-teacher-in-thailand", label: "How to Become an English Teacher in Thailand", desc: "Step-by-step guide for new teachers" },
              { href: "/jobs", label: "Teaching Jobs in Thailand", desc: "Browse live vacancies" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

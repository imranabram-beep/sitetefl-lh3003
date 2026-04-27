import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Brunei | Get Certified to Teach English in Brunei",
  description:
    "Get TEFL certified to teach English in Brunei. Learn about salaries, requirements, teaching jobs, and whether you can teach in Brunei without a degree.",
  keywords: [
    "TEFL course Brunei",
    "teach English in Brunei",
    "TEFL Brunei",
    "English teaching jobs Brunei",
    "teach English Brunei without degree",
  ],
  openGraph: {
    title: "TEFL Course Brunei | Get Certified to Teach English in Brunei",
    description:
      "Prepare for teaching jobs in Brunei with TEFL certification, salary guidance, and practical information for English teachers.",
    type: "website",
  },
  alternates: { canonical: "/tefl-course-brunei" },
};

export default function TeflCourseBruneiPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Brunei"
        h1="Online TEFL Course for Teaching in Brunei"
        sub="Brunei is a smaller TEFL market, but it can be attractive for teachers looking for good salaries, a safe environment, and well-funded schools. Opportunities are fewer than in Thailand or Vietnam, but the packages can be stronger."
        badge="Smaller market · High-quality roles"
      />
      <StatBar
        stats={[
          { value: "USD 2,000–4,000/mo", label: "Typical salary" },
          { value: "Selective", label: "Teacher demand" },
          { value: "Bandar Seri Begawan", label: "Main hub" },
          { value: "120 hrs", label: "Course length" },
        ]}
      />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <SeoH2>Why teach English in Brunei?</SeoH2>
          <CheckList
            items={[
              "Higher salaries than many other South East Asian markets",
              "Safe, stable, and well-organised living environment",
              "Good option for qualified teachers seeking structured schools",
              "Lower daily living costs compared with some higher-paying markets",
            ]}
          />

          <SeoH2>What Brunei schools expect</SeoH2>
          <P>
            Brunei tends to be more selective than entry-level TEFL destinations. Schools often want candidates who can demonstrate teaching ability, professionalism, and strong qualifications.
          </P>
          <CheckList
            items={[
              "120-hour TEFL/TESOL certificate recommended",
              "Bachelor's degree usually required",
              "Teaching experience often preferred",
              "Strong English proficiency",
              "Professional references and clean background check",
            ]}
          />

          <SeoH2>Can you teach English in Brunei without a degree?</SeoH2>
          <P>
            In most cases, no. Brunei generally expects teachers to hold a degree, especially for formal school roles. It is not usually considered a degree-free TEFL market.
          </P>
          <P>
            A TEFL certificate still matters because it strengthens your application and demonstrates that you have training in lesson delivery, classroom practice, and language teaching methodology.
          </P>

          <SeoH2>Visa requirements for Brunei</SeoH2>
          <P>
            Schools typically sponsor visas for successful applicants. Because Brunei is a more regulated market, employers usually expect complete documents before the hiring process moves forward.
          </P>
          <P>Best for: qualified teachers, degree holders, and those seeking a stable teaching package in a smaller market.</P>

          <SeoH2>Where do teachers work in Brunei?</SeoH2>
          <CheckList
            items={[
              "Private schools",
              "International schools",
              "Government-linked education programmes",
              "Specialist language teaching roles",
            ]}
          />

          <CourseCTA
            heading="Ready to teach in Brunei?"
            sub="Strengthen your application with a recognised online TEFL course and prepare for selective teaching roles in Brunei."
          />

          <FAQBlock
            faqs={[
              {
                q: "Do I need a degree to teach in Brunei?",
                a: "Usually yes. Brunei is not one of the easier degree-free TEFL destinations, and most formal teaching roles expect applicants to hold a bachelor's degree.",
              },
              {
                q: "What salary can I expect in Brunei?",
                a: "Many roles fall in the USD 2,000–4,000 per month range, depending on the school, benefits, and your experience level.",
              },
              {
                q: "Is Brunei good for first-time teachers?",
                a: "Brunei is usually better for teachers who already have a degree and a strong application. It is a smaller and more selective market than Thailand, Laos, or Cambodia.",
              },
              {
                q: "Why take a TEFL course if Brunei schools prefer experience?",
                a: "A TEFL course helps you stand out, especially if you are moving into teaching from another career or need formal classroom training on your CV.",
              },
            ]}
          />

          <RelatedLinks
            links={[
              { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Explore the TEFL route for Asia" },
              { href: "/blog/do-you-need-a-degree-to-teach-english-in-asia", label: "Do You Need a Degree to Teach English in Asia?", desc: "Compare degree requirements across countries" },
              { href: "/blog/tefl-requirements-by-country-in-asia", label: "TEFL Requirements by Country in Asia", desc: "See how Brunei compares with other destinations" },
              { href: "/jobs", label: "Teaching Jobs in Asia", desc: "Browse live vacancies and opportunities" },
            ]}
          />
        </div>
      </div>
    </main>
  );
}

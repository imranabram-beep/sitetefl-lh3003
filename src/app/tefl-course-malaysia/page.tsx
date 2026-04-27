import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Malaysia | Get Certified to Teach English in Malaysia",
  description: "Become a certified English teacher for Malaysia. Study online and access job opportunities, visa guidance and placement support. Start anytime.",
  keywords: ["TEFL course Malaysia","teach English Malaysia","TEFL certification Malaysia","ESL teacher Malaysia","English teaching jobs Malaysia"],
  openGraph: { title: "TEFL Course Malaysia | Get Certified to Teach English in Malaysia", description: "Become a certified English teacher for Malaysia. Flexible online study with job support.", type: "website" },
};

export default function TeflCourseMalaysiaPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Malaysia"
        h1="Online TEFL Course for Teaching in Malaysia"
        sub="Malaysia is one of SE Asia's most comfortable teaching destinations — English is widely used in daily life, the infrastructure is excellent and the multicultural society is welcoming to foreign teachers. Kuala Lumpur is the main hub."
        badge="Recognised by schools in Malaysia · Start anytime"
      />
      <StatBar stats={[
        { value: "MYR 3,500–6,000/mo", label: "Typical salary" },
        { value: "Medium", label: "Teacher demand" },
        { value: "Kuala Lumpur", label: "Main hub" },
        { value: "120 hrs", label: "Course length" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>Why teach English in Malaysia?</SeoH2>
          <CheckList items={[
            "English widely spoken — comfortable working environment",
            "Multicultural and open society",
            "Modern infrastructure and good transport links",
            "Growing international and private school sector",
          ]} />

          <SeoH2>What Malaysia schools expect</SeoH2>
          <P>Most schools and language centres in Malaysia require a recognised TEFL certificate of at least 120 hours. Here is what you typically need to qualify for a teaching position:</P>
          <CheckList items={[
            "120-hour TEFL/TESOL certificate (minimum)",
            "Bachelor's degree (required for work permits in most cases)",
            "Native or near-native English proficiency",
            "Valid passport and work authorisation",
            "Clean criminal background check",
            "Enthusiasm for teaching and cross-cultural communication",
          ]} />

          <SeoH2>Visa requirements for Malaysia</SeoH2>
          <P>Employment pass required</P>
          <P>Best for: Teachers wanting an English-friendly environment with modern infrastructure.</P>

          <SeoH2>Where do teachers work in Malaysia?</SeoH2>
          <CheckList items={[
            "International schools",
            "Language centres",
            "Private tutoring",
            "Corporate English training",
          ]} />

          <CourseCTA
            heading="Ready to teach in Malaysia?"
            sub="Get TEFL certified online and start your job search in Malaysia today."
          />

          <FAQBlock faqs={[
            { q: "Do I need to speak Malay to teach in Malaysia?", a: "No — English is widely spoken and is the language of instruction in international schools and language centres. Malay is helpful for daily life but not required for teaching." },
            { q: "What is the employment pass process in Malaysia?", a: "Your employer applies for an employment pass on your behalf. The process typically takes 4–8 weeks. You will need your degree, TEFL certificate and passport." },
            { q: "What salary can I expect in Malaysia?", a: "Language centre roles typically pay MYR 3,500–5,000/month. International school positions can offer MYR 6,000–10,000/month plus benefits." },
            { q: "Is Malaysia good for first-time TEFL teachers?", a: "Yes — Malaysia is a relatively accessible market with good working conditions. The English-friendly environment makes it easier for new teachers to settle in compared to non-English speaking markets." },
          ]} />

          <RelatedLinks links={[
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Overview of TEFL for the whole region" },
            { href: "/destinations/malaysia", label: "Malaysia Destination Guide", desc: "Full salary, visa and market guide" },
            { href: "/blog/teach-english-online-from-malaysia", label: "Teach English Online from Malaysia", desc: "Online teaching from KL" },
            { href: "/jobs", label: "Teaching Jobs in Malaysia", desc: "Browse live vacancies" },
          ]} />
        </div>
      </div>
    </main>
  );
}

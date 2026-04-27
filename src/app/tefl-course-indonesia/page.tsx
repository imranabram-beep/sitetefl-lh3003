import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Indonesia | Get Certified to Teach English in Indonesia",
  description: "Become a certified English teacher for Indonesia. Study online and access job opportunities, visa guidance and placement support. Start anytime.",
  keywords: ["TEFL course Indonesia","teach English Indonesia","TEFL certification Indonesia","ESL teacher Indonesia","English teaching jobs Indonesia"],
  openGraph: { title: "TEFL Course Indonesia | Get Certified to Teach English in Indonesia", description: "Become a certified English teacher for Indonesia. Flexible online study with job support.", type: "website" },
};

export default function TeflCourseIndonesiaPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Indonesia"
        h1="Online TEFL Course for Teaching in Indonesia"
        sub="Indonesia is a vast and diverse TEFL market. Jakarta offers strong corporate English demand while Bali has become a hub for boutique language schools and digital nomad teachers. Very low cost of living across most of the country."
        badge="Recognised by schools in Indonesia · Start anytime"
      />
      <StatBar stats={[
        { value: "USD 1,000–2,000/mo", label: "Typical salary" },
        { value: "High", label: "Teacher demand" },
        { value: "Jakarta", label: "Main hub" },
        { value: "120 hrs", label: "Course length" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>Why teach English in Indonesia?</SeoH2>
          <CheckList items={[
            "Large and growing market across thousands of islands",
            "Jakarta offers strong corporate English demand",
            "Bali popular for lifestyle-focused teaching roles",
            "Very low cost of living outside major cities",
          ]} />

          <SeoH2>What Indonesia schools expect</SeoH2>
          <P>Most schools and language centres in Indonesia require a recognised TEFL certificate of at least 120 hours. Here is what you typically need to qualify for a teaching position:</P>
          <CheckList items={[
            "120-hour TEFL/TESOL certificate (minimum)",
            "Bachelor's degree (required for work permits in most cases)",
            "Native or near-native English proficiency",
            "Valid passport and work authorisation",
            "Clean criminal background check",
            "Enthusiasm for teaching and cross-cultural communication",
          ]} />

          <SeoH2>Visa requirements for Indonesia</SeoH2>
          <P>KITAS work permit required</P>
          <P>Best for: Teachers wanting diversity — Jakarta corporate or Bali lifestyle.</P>

          <SeoH2>Where do teachers work in Indonesia?</SeoH2>
          <CheckList items={[
            "Language institutes (EF, LIA, LBPP)",
            "Corporate training companies",
            "International schools",
            "Bali boutique language schools",
          ]} />

          <CourseCTA
            heading="Ready to teach in Indonesia?"
            sub="Get TEFL certified online and start your job search in Indonesia today."
          />

          <FAQBlock faqs={[
            { q: "What is the KITAS work permit and how do I get it?", a: "The KITAS is Indonesia's work permit for foreigners. It is typically sponsored by your employer — most reputable schools handle the application. You will need your degree certificate, TEFL certificate and a clean criminal record check." },
            { q: "Is Jakarta or Bali better for teaching?", a: "Jakarta offers more corporate roles and higher salaries. Bali has a lower volume of jobs but an exceptional lifestyle — popular with teachers who want to combine work with travel and outdoor activities." },
            { q: "Do I need a degree to teach in Indonesia?", a: "A degree is required for the KITAS work permit. Some schools hire without one for short-term or volunteer roles, but a degree is strongly recommended for formal employment." },
            { q: "What salary can I expect in Indonesia?", a: "Language centre roles typically pay USD 1,000–1,500/month. Corporate English trainers in Jakarta can earn USD 1,500–2,500/month. International school positions offer the highest packages." },
          ]} />

          <RelatedLinks links={[
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Overview of TEFL for the whole region" },
            { href: "/destinations/indonesia", label: "Indonesia Destination Guide", desc: "Full salary, visa and market guide" },
            { href: "/jobs", label: "Teaching Jobs in Indonesia", desc: "Browse live vacancies" },
            { href: "/destinations", label: "All Destinations", desc: "Compare all SE Asian markets" },
          ]} />
        </div>
      </div>
    </main>
  );
}

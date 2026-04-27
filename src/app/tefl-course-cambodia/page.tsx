import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Cambodia | Get Certified to Teach English in Cambodia",
  description: "Become a certified English teacher for Cambodia. Study online and access job opportunities, visa guidance and placement support. Start anytime.",
  keywords: ["TEFL course Cambodia","teach English Cambodia","TEFL certification Cambodia","ESL teacher Cambodia","English teaching jobs Cambodia"],
  openGraph: { title: "TEFL Course Cambodia | Get Certified to Teach English in Cambodia", description: "Become a certified English teacher for Cambodia. Flexible online study with job support.", type: "website" },
};

export default function TeflCourseCambodiaPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Cambodia"
        h1="Online TEFL Course for Teaching in Cambodia"
        sub="Cambodia is one of the most accessible entry points into TEFL in SE Asia. Requirements are more flexible than neighbouring markets, the cost of living is exceptionally low and there are strong NGO and community teaching opportunities alongside private language schools."
        badge="Recognised by schools in Cambodia · Start anytime"
      />
      <StatBar stats={[
        { value: "USD 900–1,500/mo", label: "Typical salary" },
        { value: "High", label: "Teacher demand" },
        { value: "Phnom Penh", label: "Main hub" },
        { value: "120 hrs", label: "Course length" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>Why teach English in Cambodia?</SeoH2>
          <CheckList items={[
            "Very accessible for first-time teachers",
            "Exceptionally low cost of living",
            "Strong NGO and community teaching sector",
            "Relaxed lifestyle and friendly locals",
          ]} />

          <SeoH2>What Cambodia schools expect</SeoH2>
          <P>Most schools and language centres in Cambodia require a recognised TEFL certificate of at least 120 hours. Here is what you typically need to qualify for a teaching position:</P>
          <CheckList items={[
            "120-hour TEFL/TESOL certificate (minimum)",
            "Bachelor's degree (required for work permits in most cases)",
            "Native or near-native English proficiency",
            "Valid passport and work authorisation",
            "Clean criminal background check",
            "Enthusiasm for teaching and cross-cultural communication",
          ]} />

          <SeoH2>Visa requirements for Cambodia</SeoH2>
          <P>More flexible than most SE Asian markets</P>
          <P>Best for: First-time teachers, NGO work, very low cost of living.</P>

          <SeoH2>Where do teachers work in Cambodia?</SeoH2>
          <CheckList items={[
            "Language centres",
            "NGO education programmes",
            "Private schools",
            "Community teaching projects",
          ]} />

          <CourseCTA
            heading="Ready to teach in Cambodia?"
            sub="Get TEFL certified online and start your job search in Cambodia today."
          />

          <FAQBlock faqs={[
            { q: "Do I need a degree to teach in Cambodia?", a: "A degree is not always required for language centres and NGO positions in Cambodia — making it one of the most accessible markets for teachers without a degree. A TEFL certificate is typically sufficient." },
            { q: "What is the cost of living in Cambodia?", a: "Cambodia has one of the lowest costs of living in SE Asia. Monthly costs for accommodation, food and transport typically run USD 500–800 in Phnom Penh, meaning teachers can save well on USD 900–1,200/month salaries." },
            { q: "Are there NGO teaching opportunities in Cambodia?", a: "Yes — Cambodia has a strong NGO sector with many organisations offering volunteer and paid teaching positions. These roles often provide accommodation and a stipend." },
            { q: "Is Phnom Penh or Siem Reap better for teaching?", a: "Phnom Penh has far more teaching opportunities. Siem Reap has a smaller market but a more relaxed, tourist-friendly atmosphere." },
          ]} />

          <RelatedLinks links={[
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Overview of TEFL for the whole region" },
            { href: "/destinations/cambodia", label: "Cambodia Destination Guide", desc: "Full salary, visa and market guide" },
            { href: "/blog/do-you-need-a-degree-to-teach-english-in-asia", label: "Teach Without a Degree in Asia", desc: "Which markets are accessible without a degree" },
            { href: "/jobs", label: "Teaching Jobs in Cambodia", desc: "Browse live vacancies" },
          ]} />
        </div>
      </div>
    </main>
  );
}

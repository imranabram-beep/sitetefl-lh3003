import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Philippines | Get Certified to Teach English in Philippines",
  description: "Become a certified English teacher for Philippines. Study online and access job opportunities, visa guidance and placement support. Start anytime.",
  keywords: ["TEFL course Philippines","teach English Philippines","TEFL certification Philippines","ESL teacher Philippines","English teaching jobs Philippines"],
  openGraph: { title: "TEFL Course Philippines | Get Certified to Teach English in Philippines", description: "Become a certified English teacher for Philippines. Flexible online study with job support.", type: "website" },
};

export default function TeflCoursePhilippinesPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Philippines"
        h1="Online TEFL Course for Teaching in Philippines"
        sub="The Philippines is a unique TEFL market — a major hub for online English teaching and BPO corporate training, with English as an official language. Filipino nationals can teach locally or use their TEFL certificate to work internationally."
        badge="Recognised by schools in Philippines · Start anytime"
      />
      <StatBar stats={[
        { value: "USD 700–1,200/mo", label: "Typical salary" },
        { value: "High", label: "Teacher demand" },
        { value: "Manila", label: "Main hub" },
        { value: "120 hrs", label: "Course length" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>Why teach English in Philippines?</SeoH2>
          <CheckList items={[
            "Major hub for online English teaching platforms",
            "English is an official language — comfortable teaching environment",
            "Strong BPO corporate English training sector",
            "Filipino TEFL holders in high demand internationally",
          ]} />

          <SeoH2>What Philippines schools expect</SeoH2>
          <P>Most schools and language centres in Philippines require a recognised TEFL certificate of at least 120 hours. Here is what you typically need to qualify for a teaching position:</P>
          <CheckList items={[
            "120-hour TEFL/TESOL certificate (minimum)",
            "Bachelor's degree (required for work permits in most cases)",
            "Native or near-native English proficiency",
            "Valid passport and work authorisation",
            "Clean criminal background check",
            "Enthusiasm for teaching and cross-cultural communication",
          ]} />

          <SeoH2>Visa requirements for Philippines</SeoH2>
          <P>Alien Employment Permit required</P>
          <P>Best for: Online teaching, Filipino teachers, BPO English training.</P>

          <SeoH2>Where do teachers work in Philippines?</SeoH2>
          <CheckList items={[
            "Online teaching platforms (VIPKID, Preply, iTalki)",
            "BPO corporate English training",
            "Language schools",
            "International schools in Manila and Cebu",
          ]} />

          <CourseCTA
            heading="Ready to teach in Philippines?"
            sub="Get TEFL certified online and start your job search in Philippines today."
          />

          <FAQBlock faqs={[
            { q: "Can Filipinos use a TEFL certificate to teach abroad?", a: "Yes — Filipino TEFL holders are in demand across the Middle East, China, Vietnam and other markets. A 120-hour TEFL certificate significantly improves your employability internationally." },
            { q: "What online platforms hire Filipino teachers?", a: "Many major platforms including Preply, iTalki, and Cambly accept Filipino teachers. Some platforms like VIPKID have specific requirements — our course meets most of these." },
            { q: "Is a degree required for Filipinos to teach English abroad?", a: "Requirements vary by country. China and Korea typically require a degree. The Middle East and some SE Asian markets are more flexible. We can advise based on your specific target market." },
            { q: "How much can Filipino online teachers earn?", a: "Online rates vary widely — typically USD 5–25/hour depending on platform and experience. Building a strong profile and regular students can generate USD 800–1,500/month part-time." },
          ]} />

          <RelatedLinks links={[
            { href: "/teach-online", label: "Teach English Online", desc: "How to build a remote teaching income" },
            { href: "/destinations/philippines", label: "Philippines Destination Guide", desc: "Teaching market overview" },
            { href: "/blog/teach-english-online-from-the-philippines", label: "Teach English Online from the Philippines", desc: "Platform guide and setup tips" },
            { href: "/jobs", label: "Teaching Jobs", desc: "Browse live vacancies" },
          ]} />
        </div>
      </div>
    </main>
  );
}

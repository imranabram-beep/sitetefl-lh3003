import type { Metadata } from "next";
import { SeoHero, StatBar, CourseCTA, FAQBlock, CheckList, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "TEFL Course Vietnam | Get Certified to Teach English in Vietnam",
  description: "Become a certified English teacher for Vietnam. Study online and access job opportunities, visa guidance and placement support. Start anytime.",
  keywords: ["TEFL course Vietnam","teach English Vietnam","TEFL certification Vietnam","ESL teacher Vietnam","English teaching jobs Vietnam"],
  openGraph: { title: "TEFL Course Vietnam | Get Certified to Teach English in Vietnam", description: "Become a certified English teacher for Vietnam. Flexible online study with job support.", type: "website" },
};

export default function TeflCourseVietnamPage() {
  return (
    <main>
      <SeoHero
        eyebrow="TEFL Course · Vietnam"
        h1="Online TEFL Course for Teaching in Vietnam"
        sub="Vietnam offers some of the best salary-to-cost ratios in SE Asia. Ho Chi Minh City and Hanoi are both major hiring hubs with strong demand from language centres, public schools and international institutions."
        badge="Recognised by schools in Vietnam · Start anytime"
      />
      <StatBar stats={[
        { value: "USD 1,200–2,000/mo", label: "Typical salary" },
        { value: "Very High", label: "Teacher demand" },
        { value: "Ho Chi Minh City", label: "Main hub" },
        { value: "120 hrs", label: "Course length" },
      ]} />

      <div style={{ background: "#f4f7fb", padding: "3rem 0 4rem" }}>
        <div className="container" style={{ maxWidth: 820 }}>

          <SeoH2>Why teach English in Vietnam?</SeoH2>
          <CheckList items={[
            "Competitive USD salaries with low living costs",
            "Strong demand in Ho Chi Minh City and Hanoi",
            "Growing private English education sector",
            "Popular with both new and experienced teachers",
          ]} />

          <SeoH2>What Vietnam schools expect</SeoH2>
          <P>Most schools and language centres in Vietnam require a recognised TEFL certificate of at least 120 hours. Here is what you typically need to qualify for a teaching position:</P>
          <CheckList items={[
            "120-hour TEFL/TESOL certificate (minimum)",
            "Bachelor's degree (required for work permits in most cases)",
            "Native or near-native English proficiency",
            "Valid passport and work authorisation",
            "Clean criminal background check",
            "Enthusiasm for teaching and cross-cultural communication",
          ]} />

          <SeoH2>Visa requirements for Vietnam</SeoH2>
          <P>Degree + TEFL certificate usually required</P>
          <P>Best for: Teachers wanting strong savings and vibrant city life.</P>

          <SeoH2>Where do teachers work in Vietnam?</SeoH2>
          <CheckList items={[
            "Language centres (ILA, Wall Street English, British Council)",
            "Public school partnerships",
            "International schools",
            "Online teaching from Vietnam",
          ]} />

          <CourseCTA
            heading="Ready to teach in Vietnam?"
            sub="Get TEFL certified online and start your job search in Vietnam today."
          />

          <FAQBlock faqs={[
            { q: "What TEFL qualification do schools in Vietnam expect?", a: "Most reputable language centres expect a 120-hour TEFL certificate and a degree. The British Council and top international schools may also ask for CELTA or equivalent." },
            { q: "What is the average teacher salary in Vietnam?", a: "Most language centre roles pay USD 1,200–1,600/month. More experienced teachers in premium schools can earn USD 1,800–2,200/month." },
            { q: "Is Ho Chi Minh City or Hanoi better for teaching?", a: "Ho Chi Minh City has more jobs and a livelier expat scene. Hanoi is slightly cheaper and has a more traditional Vietnamese feel. Both are excellent." },
            { q: "Can I teach English online from Vietnam?", a: "Yes — Vietnam has good internet infrastructure and many teachers combine in-person school roles with online platform work to increase earnings." },
          ]} />

          <RelatedLinks links={[
            { href: "/online-tefl-course-south-east-asia", label: "Online TEFL Course for SE Asia", desc: "Overview of TEFL for the whole region" },
            { href: "/destinations/vietnam", label: "Vietnam Destination Guide", desc: "Full salary, visa and market guide" },
            { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide for Asia", desc: "Compare earnings across SE Asia" },
            { href: "/jobs", label: "Teaching Jobs in Vietnam", desc: "Browse live vacancies" },
          ]} />
        </div>
      </div>
    </main>
  );
}

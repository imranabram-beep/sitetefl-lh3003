import type { Metadata } from "next";
import { BlogHero, CourseCTA, FAQBlock, SeoH2, P, RelatedLinks } from "@/components/seo-page-shell";

export const metadata: Metadata = {
  title: "What Jobs Can You Get After a TEFL Course? | 2026 Guide",
  description: "Discover what teaching jobs are available after completing a TEFL course. From language centres and international schools to online teaching and corporate training.",
  keywords: ["TEFL jobs after certification","what jobs TEFL","TEFL career options","ESL teaching jobs","jobs with TEFL certificate"],
};

export default function WhatJobsAfterTeflPage() {
  return (
    <main>
      <BlogHero
        category="Career Guide"
        h1="What Jobs Can You Get After a TEFL Course?"
        sub="A TEFL certificate opens more doors than most people realise. Here is a full breakdown of the roles available — from language centres in Bangkok to corporate training in Dubai."
        readTime="6 min"
      />
      <div className="blog-content-wrapper">
        <div className="blog-content-container">

          <SeoH2>Language centre teacher</SeoH2>
          <P>The most common first role for TEFL graduates. Language centres (EF, Wall Street English, British Council, independent schools) hire TEFL-certified teachers across SE Asia, the Middle East, Europe and Latin America. Roles are typically full-time with structured lesson plans and mixed-ability groups.</P>
          <div style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:10, padding:"1rem 1.25rem", marginBottom:"1.25rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem" }}>
              {[["Typical salary","THB 35–60k/mo (Thailand)"],["Hours","20–25 teaching hrs/wk"],["Best markets","Thailand, Vietnam, Cambodia"]].map(([l,v]) => (
                <div key={l}><div style={{ fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase" as const, color:"#9aa8b8", letterSpacing:"0.08em" }}>{l}</div><div style={{ fontSize:"0.88rem", fontWeight:700, color:"#223548" }}>{v}</div></div>
              ))}
            </div>
          </div>

          <SeoH2>Online English teacher</SeoH2>
          <P>One of the fastest-growing sectors. Platforms like Preply, iTalki and Cambly connect certified teachers with students worldwide. You set your own hours and work from anywhere with a reliable internet connection. Popular with teachers based in SE Asia who want flexibility alongside or instead of in-person work.</P>
          <div style={{ background:"#fff", border:"1px solid #dbe4ec", borderRadius:10, padding:"1rem 1.25rem", marginBottom:"1.25rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"0.5rem" }}>
              {[["Typical rate","$10–30/hr depending on platform"],["Hours","Flexible — set your own schedule"],["Best for","Philippines, Malaysia, remote teachers"]].map(([l,v]) => (
                <div key={l}><div style={{ fontSize:"0.65rem", fontWeight:700, textTransform:"uppercase" as const, color:"#9aa8b8", letterSpacing:"0.08em" }}>{l}</div><div style={{ fontSize:"0.88rem", fontWeight:700, color:"#223548" }}>{v}</div></div>
              ))}
            </div>
          </div>

          <SeoH2>Public school teacher</SeoH2>
          <P>Government school programmes like Thailand's TEFL placement schemes and Korea's EPIK hire TEFL-certified teachers directly into public schools. These roles offer more stability, school holidays and a structured timetable. Salaries are competitive and Korea's programme includes housing.</P>

          <SeoH2>International school teacher</SeoH2>
          <P>The premium tier. International schools in Singapore, Dubai, Bangkok and Hong Kong pay 2–3x language centre salaries. Competition is higher — most require a PGCE, CELTA or Level 5 TEFL alongside relevant experience. But for teachers willing to invest in their credentials, the payoff is significant.</P>

          <SeoH2>Corporate English trainer</SeoH2>
          <P>Business English training for companies and professionals. Strong demand in Japan, Korea, Germany, the Netherlands and major financial centres. Often higher-paid than classroom roles and can be done in-person or remotely. A 120-hour TEFL certificate is a solid foundation.</P>

          <SeoH2>University English instructor</SeoH2>
          <P>Universities across SE Asia, the Middle East and East Asia hire English instructors for EAP (English for Academic Purposes) programmes. These roles typically require a degree and TEFL certificate at minimum, with better salaries and more prestige than language centres.</P>

          <CourseCTA className="blog-cta-section" heading="Ready to access these roles?" sub="A 120-hour TEFL certificate qualifies you for the majority of teaching positions listed above." />

          <FAQBlock useBlogStyling faqs={[
            { q: "Can I get a teaching job immediately after completing a TEFL course?", a: "Yes — language centre and online teaching roles are actively hiring TEFL graduates with no prior classroom experience. Most of our students find their first role within 4–8 weeks of completing their certificate." },
            { q: "What is the best first job after TEFL?", a: "A language centre role in Thailand or Vietnam is the most common first posting — accessible entry requirements, year-round hiring and a strong community of fellow teachers. Cambodia is also excellent for first-timers." },
            { q: "Do online teaching platforms require a TEFL certificate?", a: "Most reputable platforms require or strongly prefer a TEFL certificate. It also allows you to charge higher rates — students pay more for certified teachers on platforms like Preply and iTalki." },
            { q: "How do I find teaching jobs after qualifying?", a: "Use our jobs board which lists live vacancies from Adzuna and Jooble across 35+ countries. We also have a partner school network and destination guides with direct hiring contacts." },
          ]} />

          <RelatedLinks useBlogStyling links={[
            { href: "/online-tefl-course-south-east-asia", label: "Get TEFL Certified", desc: "Start your 120-hour course today" },
            { href: "/jobs", label: "Browse Live Teaching Jobs", desc: "Search vacancies across SE Asia and beyond" },
            { href: "/destinations", label: "Compare Destinations", desc: "Salary and demand by country" },
            { href: "/teach-online", label: "Teach English Online", desc: "Build a remote teaching income" },
            { href: "/blog/tefl-salary-guide-asia", label: "TEFL Salary Guide", desc: "What you can earn in each market" },
          ]} />
        </div>
      </div>
    </main>
  );
}

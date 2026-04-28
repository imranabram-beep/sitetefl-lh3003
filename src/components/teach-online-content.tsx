/* eslint-disable */
"use client";

import Link from "next/link";
import Image from "next/image";
import { CourseCTA, FAQBlock, RelatedLinks } from "@/components/seo-page-shell";
import "./teach-online-content.css";

export function TeachOnlineContent() {
  return (
    <main>
      {/* Custom Hero with Full Background Image */}
      <section
        style={{
          background: "linear-gradient(135deg, #d4eff5 0%, #c8f7f0 100%)",
          backgroundImage: "url('/images/Teach Online/Hero/Teach Online.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
          color: "#1a1a1a",
          padding: "0",
          minHeight: "900px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Overlay for text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "55%",
            height: "100%",
            background: "linear-gradient(90deg, rgba(13, 31, 45, 0.8) 0%, rgba(13, 31, 45, 0.5) 50%, rgba(13, 31, 45, 0) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Bottom fade-to-white overlap */}
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.9) 80%, #ffffff 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}>
          {/* Text Content */}
          <div style={{
            maxWidth: 550,
            padding: "2.5rem",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
          }}>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#00d9ff",
                margin: "0 0 1rem",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              Teach English Online
            </p>
            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.04em",
                margin: "0 0 1rem",
                color: "#fff",
                fontWeight: 900,
                textShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
              }}
            >
              Teach English Online from Anywhere in South East Asia
            </h1>
            <p
              style={{
                fontSize: "1.02rem",
                lineHeight: 1.8,
                color: "#fff",
                margin: "0 0 1.25rem",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                fontWeight: 500,
              }}
            >
              Build a remote teaching income from Thailand, Vietnam, Malaysia, the Philippines or anywhere with a reliable internet connection. A TEFL certificate is your entry ticket.
            </p>
            <div
              style={{
                display: "inline-flex",
                padding: "0.45rem 0.9rem",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.92)",
                fontSize: "0.82rem",
                fontWeight: 700,
              }}
            >
              Work remotely · Set your own hours · Start within weeks
            </div>
          </div>
        </div>
      </section>

      <div className="teach-online-content">
        <div className="teach-online-container">

          <h2 className="teach-online-h2">Why online English teaching works from SE Asia</h2>
          <p className="teach-online-p">SE Asia has a combination of factors that make it ideal for online English teachers: low cost of living, improving broadband infrastructure and a time zone (UTC+7–8) that overlaps with peak demand hours from Chinese, Korean and Japanese students in the evenings.</p>
          <p className="teach-online-p">A teacher earning $15/hour for 25 hours/week generates $1,500/month — an income that goes significantly further in Thailand or Vietnam than in the UK or US.</p>

          {/* Stats Grid */}
          <div className="teach-online-stats">
            {[
              { value: "$10–30/hr", label: "Typical platform rate" },
              { value: "50+ platforms", label: "Hiring globally" },
              { value: "4–6 weeks", label: "To get certified" },
              { value: "No commute", label: "Work from anywhere" },
            ].map((stat) => (
              <div key={`${stat.value}-${stat.label}`} className="teach-online-stat-card">
                <div className="teach-online-stat-value">{stat.value}</div>
                <div className="teach-online-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <h2 className="teach-online-h2">Top platforms hiring online English teachers</h2>
          <div className="teach-online-platforms">
            {[
              { name: "Preply",    rate: "$8–25/hr",    req: "TEFL preferred",    best: "Building long-term students. Set your own rate. Strong for career teachers.", icon: "🎯" },
              { name: "iTalki",    rate: "$8–20/hr",    req: "TEFL preferred",    best: "Largest student base. Good for all experience levels.", icon: "🌐" },
              { name: "Cambly",    rate: "~$10/hr",     req: "Native speaker",    best: "No lesson planning. Conversational English. Good for getting started.", icon: "💬" },
              { name: "Palfish",   rate: "$10–18/hr",   req: "TEFL required",     best: "China-focused. High demand evenings. Requires TEFL certificate.", icon: "🌏" },
              { name: "Verbling",  rate: "$10–30/hr",   req: "TEFL + experience", best: "Higher-end platform. Selective. Better rates for experienced teachers.", icon: "⭐" },
              { name: "Lingoda",   rate: "€10–15/hr",   req: "TEFL + degree",     best: "Structured curriculum. Consistent hours. European student base.", icon: "📚" },
            ].map((p) => (
              <div key={p.name} className="teach-online-platform-card">
                <div className="teach-online-platform-icon">{p.icon}</div>
                <div className="teach-online-platform-name">{p.name}</div>
                <div className="teach-online-platform-rate">{p.rate}</div>
                <div className="teach-online-platform-req">{p.req}</div>
                <div className="teach-online-platform-desc">{p.best}</div>
              </div>
            ))}
          </div>

          <h2 className="teach-online-h2">What you need to start</h2>
          <div className="teach-online-requirements">
            {[
              { icon: "📚", title: "TEFL Certificate", desc: "120-hour TEFL/TESOL certificate — required or strongly preferred by most platforms" },
              { icon: "💻", title: "Computer", desc: "Laptop or desktop computer (phone-only is not viable for most platforms)" },
              { icon: "📡", title: "Internet", desc: "Stable internet — minimum 10 Mbps upload for smooth video lessons" },
              { icon: "💡", title: "Setup", desc: "Quiet, well-lit background — professional appearance matters to students" },
              { icon: "🎧", title: "Audio Gear", desc: "Headset with microphone for clear, echo-free audio" },
              { icon: "💳", title: "Payments", desc: "PayPal or Payoneer for receiving international payments" },
            ].map((item) => (
              <div key={item.title} className="teach-online-requirement-card">
                <div className="teach-online-requirement-icon">{item.icon}</div>
                <h4 className="teach-online-requirement-title">{item.title}</h4>
                <p className="teach-online-requirement-desc">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="teach-online-h2">Realistic earnings timeline</h2>
          <div className="teach-online-timeline">
            {[
              { period: "Months 1–2", earn: "$300–600/mo", label: "Getting started", detail: "Building reviews, testing platforms, finding your niche", percent: 25, icon: "🚀" },
              { period: "Months 3–4", earn: "$700–1,200/mo", label: "Building momentum", detail: "Regular students, better profile, consistent bookings", percent: 60, icon: "📈" },
              { period: "Month 5+",   earn: "$1,200–2,000+/mo", label: "Full income", detail: "Strong repeat rate, premium rates, multiple platforms", percent: 100, icon: "💰" },
            ].map((t) => (
              <div key={t.period} className="teach-online-timeline-card" style={{ "--percent": `${t.percent}%` } as React.CSSProperties}>
                <div className="teach-online-timeline-bg" />
                <div className="teach-online-timeline-content">
                  <div className="teach-online-timeline-period">{t.period}</div>
                  <div className="teach-online-timeline-earning">
                    {t.icon} {t.earn}
                  </div>
                  <div className="teach-online-timeline-label">{t.label}</div>
                  <div className="teach-online-timeline-detail">{t.detail}</div>
                  <div className="teach-online-timeline-progress">
                    <div className="teach-online-timeline-progress-bar" style={{ width: `${t.percent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="teach-online-h2">Country-specific guides</h2>
          <div className="teach-online-guides">
            {[
              { flag:"🇵🇭", country:"Philippines", href:"/blog/teach-english-online-from-the-philippines", desc:"English as official language. Major online teaching hub." },
              { flag:"🇲🇾", country:"Malaysia",    href:"/blog/teach-english-online-from-malaysia",        desc:"Excellent infrastructure. Strong UTC+8 time zone." },
              { flag:"🇹🇭", country:"Thailand",    href:"/tefl-course-thailand",                           desc:"Low cost base. Growing online teaching community." },
              { flag:"🇻🇳", country:"Vietnam",     href:"/tefl-course-vietnam",                            desc:"HCMC and Hanoi have strong internet infrastructure." },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="teach-online-guide-link">
                <div className="teach-online-guide-accent" />
                <span className="teach-online-guide-flag">{c.flag}</span>
                <div className="teach-online-guide-content">
                  <div className="teach-online-guide-country">{c.country} →</div>
                  <div className="teach-online-guide-desc">{c.desc}</div>
                </div>
              </Link>
            ))}
          </div>

          <CourseCTA heading="Get TEFL certified for online teaching" sub="Our 30-hour Teach English Online course covers platform setup, student acquisition and online classroom management. Pair it with the 120-hour course for full credentials." />

          <FAQBlock faqs={[
            { q: "Do I need a TEFL certificate to teach English online?", a: "Most reputable platforms require or strongly prefer a TEFL certificate. Without one, you are limited to lower-paying platforms and cannot command premium rates. The investment pays back quickly." },
            { q: "How many hours per week can I realistically teach online?", a: "Most teachers teach 15–30 hours per week consistently. Teaching more than 35 hours/week is taxing — student interactions are intensive and preparation takes time." },
            { q: "Which platform is best for getting started?", a: "Preply and iTalki are the most accessible for new teachers. They allow you to set your own rates, accept international teachers and have large student bases. Start with one, build reviews, then expand." },
            { q: "Can I teach online while also teaching in a school?", a: "Yes — many teachers in SE Asia combine a part-time school role with online platform work. The flexibility of online teaching makes it easy to schedule around school hours." },
          ]} />

          <RelatedLinks links={[
            { href: "/courses/30-hour-teach-english-online-course", label: "30-Hour Online Teaching Course", desc: "Specialist course for online platforms" },
            { href: "/online-tefl-course-south-east-asia", label: "120-Hour TEFL Course", desc: "Full certification for all teaching roles" },
            { href: "/blog/teach-english-online-from-the-philippines", label: "Teaching Online from Philippines", desc: "Platform guide for Filipino teachers" },
            { href: "/blog/teach-english-online-from-malaysia", label: "Teaching Online from Malaysia", desc: "Platform guide for Malaysia-based teachers" },
            { href: "/jobs", label: "Browse Online Teaching Jobs", desc: "Live remote vacancies" },
          ]} />
        </div>
      </div>
    </main>
  );
}

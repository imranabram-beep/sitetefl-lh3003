import Link from "next/link";
import Image from "next/image";
import { courses, destinations, paymentPlans } from "@/lib/data";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { FooterLabels, FooterHeading } from "@/components/footer-translated";
import { DesktopNav } from "@/components/desktop-nav";

export async function Header() {
  return (
    <header
  className="site-header"
  style={{
    background: "rgba(255,255,255,0.94)",
    borderBottom: "1px solid rgba(18,59,58,0.08)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  }}
>
  <div
    className="container nav-row"
    style={{
      minHeight: "78px",
      gap: "1.5rem",
    }}
  >
    <Link
      href="/"
      className="brand"
      aria-label="TEFL SEA Academy home"
      style={{ flexShrink: 0 }}
    >
      <Image
        src="/images/Logo/Homepage Design.png"
        alt="TEFL SEA Academy"
        width={360}
        height={68}
        priority
        style={{
          width: "auto",
          height: "52px",
          maxWidth: "100%",
          objectFit: "contain",
        }}
      />
    </Link>

    <div style={{ marginLeft: "auto" }}>
      <DesktopNav />
      <MobileNav />
    </div>
  </div>
</header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <FooterLabels />
          <LanguageSwitcher variant="footer" />
        </div>
        <div>
          <FooterHeading label="courses" />
          <ul>
            {courses.slice(0, 4).map((course) => (
              <li key={course.slug}>
                <Link href={`/courses/${course.slug}`}>{course.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FooterHeading label="destinations" />
          <ul>
            {destinations.slice(0, 4).map((destination) => (
              <li key={destination.slug}>
                <Link href={`/destinations/${destination.slug}`}>{destination.country}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FooterHeading label="blog" />
          <ul>
            <li><Link href="/blog">All articles</Link></li>
            <li><Link href="/blog/best-tefl-course-for-south-east-asia">Best TEFL courses</Link></li>
            <li><Link href="/blog/tefl-salary-guide-asia">Salary guide</Link></li>
            <li><Link href="/blog/how-to-become-an-english-teacher-in-thailand">Teach in Thailand</Link></li>
            <li><Link href="/become-an-english-teacher-in-asia">Become a teacher</Link></li>
          </ul>
        </div>
        <div>
          <FooterHeading label="payment" />
          <ul>
            {paymentPlans.map((plan) => (
              <li key={plan.name}>{plan.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function SectionIntro({
  eyebrow, title, body,
}: {
  eyebrow: string; title: string; body: string;
}) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

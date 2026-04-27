import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionIntro } from "@/components/site-shell";
import { SuccessStories } from "@/components/SuccessStories";
import "../success-stories.css";

export const metadata: Metadata = {
  title: "Success Stories | TEFL Teachers in Asia",
  description:
    "Real teachers, real students, real results. See where TEFL graduates are teaching across South East Asia and beyond.",
  keywords: ["TEFL success stories", "English teachers abroad", "teaching in Asia", "TEFL graduates"],
};

const classroomScenes = [
  { label: "English class, Bangkok", img: "/images/classroom-1.png" },
  { label: "Online lesson, remote", img: "/images/classroom-2.png" },
  { label: "Conversation class, Hanoi", img: "/images/classroom-3.png" },
  { label: "Young learners, Seoul", img: "/images/classroom-4.png" },
];

export default function SuccessStoriesPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)" }}>
        <div className="container" style={{ maxWidth: 820, textAlign: "center" }}>
          <div style={{ marginBottom: "1rem" }}>
            <span style={{
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#00b09b",
            }}>
              Real Impact
            </span>
          </div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.033em",
            color: "#223548",
            margin: "0 0 1rem 0",
          }}>
            Real teachers. Real students. Real Asia.
          </h1>
          <p style={{
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "#3a5060",
            margin: 0,
          }}>
            Our TEFL graduates are teaching across South East Asia right now — in schools, language centres and online. Here's where they are and what they're doing.
          </p>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── CLASSROOM SCENES ── */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#223548",
              margin: "0 0 1rem 0",
            }}>
              Life in the classroom
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "#3a5060",
              lineHeight: 1.7,
              margin: 0,
            }}>
              From English classes in Bangkok to online lessons worldwide — our teachers are making a real impact every day.
            </p>
          </div>

          <div className="hp-scenes-grid">
            {classroomScenes.map((s) => (
              <div key={s.label} className="hp-scene-card">
                <Image src={s.img} alt={s.label} fill className="hp-scene-img" style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }} />
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
                }} />
                <span style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "1.5rem",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  zIndex: 2,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#223548",
              margin: "0 0 1rem 0",
            }}>
              What our graduates say
            </h2>
            <p style={{
              fontSize: "1rem",
              color: "#3a5060",
              lineHeight: 1.7,
            }}>
              Hear from real teachers about their journey and experience with our courses.
            </p>
          </div>
          <SuccessStories />
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── STATS SECTION ── */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#223548",
              margin: "0 0 1rem 0",
            }}>
              By the numbers
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}>
            <div style={{
              padding: "2rem",
              background: "white",
              border: "1px solid rgba(34, 201, 154, 0.1)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#fd9000",
                marginBottom: "0.5rem",
              }}>
                2,000+
              </div>
              <p style={{
                fontSize: "1rem",
                color: "#3a5060",
                margin: 0,
              }}>
                Graduates teaching worldwide
              </p>
            </div>

            <div style={{
              padding: "2rem",
              background: "white",
              border: "1px solid rgba(34, 201, 154, 0.1)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#fd9000",
                marginBottom: "0.5rem",
              }}>
                320+
              </div>
              <p style={{
                fontSize: "1rem",
                color: "#3a5060",
                margin: 0,
              }}>
                Partner schools across SEA
              </p>
            </div>

            <div style={{
              padding: "2rem",
              background: "white",
              border: "1px solid rgba(34, 201, 154, 0.1)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#fd9000",
                marginBottom: "0.5rem",
              }}>
                12 countries
              </div>
              <p style={{
                fontSize: "1rem",
                color: "#3a5060",
                margin: 0,
              }}>
                Active job placement support
              </p>
            </div>

            <div style={{
              padding: "2rem",
              background: "white",
              border: "1px solid rgba(34, 201, 154, 0.1)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "#fd9000",
                marginBottom: "0.5rem",
              }}>
                4–6 weeks
              </div>
              <p style={{
                fontSize: "1rem",
                color: "#3a5060",
                margin: 0,
              }}>
                Average time to first job
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, #00b09b, transparent)",
        opacity: 0.5,
      }} />

      {/* ── CTA SECTION ── */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 20%, transparent 80%, rgba(255,255,255,0.5) 100%)" }}>
        <div className="container" style={{ maxWidth: 700, textAlign: "center" }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#223548",
            margin: "0 0 1rem 0",
          }}>
            Ready to write your success story?
          </h2>
          <p style={{
            fontSize: "1rem",
            color: "#3a5060",
            lineHeight: 1.7,
            margin: "0 0 2rem 0",
          }}>
            Join thousands of teachers who've transformed their careers. Start your TEFL journey today.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/courses" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
              color: "white",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}>
              View courses →
            </Link>
            <Link href="/destinations" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "white",
              color: "#00b09b",
              border: "2px solid #00b09b",
              borderRadius: "50px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}>
              Explore destinations →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

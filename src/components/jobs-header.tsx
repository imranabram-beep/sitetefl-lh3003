"use client";

import Link from "next/link";
import { useLocaleContext } from "@/components/locale-provider";

export function JobsHeader() {
  const { t } = useLocaleContext();
  return (
    <section className="banner section" style={{
      position: "relative",
      backgroundImage: "url(/images/Jobs/Hero/Jobs-Hero.svg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "760px",
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      paddingTop: "6rem",
      paddingBottom: "6rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "hidden",
    }}>
      {/* Left-to-right gradient overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(to right, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0) 75%)",
        zIndex: 2,
      }} />

      {/* Bottom fade-to-white gradient with overlap */}
      <div style={{
        position: "absolute",
        bottom: "-50px",
        left: 0,
        right: 0,
        height: "200px",
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.9) 80%, #ffffff 100%)",
        zIndex: 3,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 4, maxWidth: "650px", width: "100%", paddingLeft: "2rem", marginRight: "auto", marginLeft: "0" }}>
        <div style={{
          maxWidth: "600px",
          padding: "2.5rem",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
        }}>
        <p style={{
          fontSize: "0.75rem",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "#17a697",
          margin: "0 0 1rem 0",
        }}>
          {t("jobs_title") || "LIVE TEACHING JOBS"}
        </p>

        <h1 style={{
          fontSize: "2.8rem",
          fontWeight: 900,
          color: "#0d4e7d",
          margin: "0 0 1.5rem 0",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>
          Find your teaching role anywhere in the world
        </h1>

        <p style={{
          fontSize: "1.05rem",
          color: "#223548",
          margin: "0 0 2rem 0",
          lineHeight: 1.7,
          maxWidth: "600px",
          fontWeight: 500,
        }}>
          {t("jobs_sub") || "Search thousands of verified teaching positions. Browse live listings from top schools and language centers worldwide."}
        </p>

        <Link href="#jobs-search" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.95rem 2rem",
          background: "#17a697",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: "0 4px 12px rgba(23, 166, 151, 0.25)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#0f8074";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(23, 166, 151, 0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#17a697";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(23, 166, 151, 0.25)";
        }}>
          Browse jobs
          <span style={{ fontSize: "1.2em" }}>→</span>
        </Link>
        </div>
      </div>
    </section>
  );
}

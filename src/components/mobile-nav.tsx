"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocaleContext } from "@/components/locale-provider";

export function MobileNav() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLocaleContext();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile) return null;

  const navLinks = [
    { href: "/courses",      label: t("nav_courses") },
    { href: "/destinations", label: t("nav_destinations") },
    { href: "/teach-online", label: t("nav_teach_online") },
    { href: "/jobs",         label: t("nav_jobs") },
    { href: "/blog",         label: t("nav_blog") },
  ];

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        style={{
          all: "unset",
          display: "flex",
          flexDirection: "column" as const,
          justifyContent: "center",
          gap: "5px",
          width: "36px",
          height: "36px",
          cursor: "pointer",
          padding: "4px",
        }}
      >
        <span style={{ display:"block", width:"22px", height:"2px", background:"#fff", borderRadius:"2px", transition:"transform 0.2s, opacity 0.2s", transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
        <span style={{ display:"block", width:"22px", height:"2px", background:"#fff", borderRadius:"2px", transition:"opacity 0.2s", opacity: open ? 0 : 1 }} />
        <span style={{ display:"block", width:"22px", height:"2px", background:"#fff", borderRadius:"2px", transition:"transform 0.2s", transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "fixed", top: "72px", left: 0, right: 0,
          background: "#12263a",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1.25rem 1.5rem 1.75rem",
          zIndex: 9999,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}>
          <nav style={{ display:"flex", flexDirection:"column" as const, marginBottom:"1.25rem" }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display:"block", padding:"0.9rem 0",
                borderBottom:"1px solid rgba(255,255,255,0.07)",
                color:"rgba(255,255,255,0.9)", textDecoration:"none",
                fontSize:"1rem", fontWeight:600,
              }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div style={{ display:"flex", gap:"0.75rem", marginBottom:"1rem" }}>
            <Link href="/sign-in" onClick={() => setOpen(false)} style={{
              flex:1, textAlign:"center", padding:"0.75rem",
              border:"1.5px solid rgba(255,255,255,0.3)", borderRadius:"999px",
              color:"#fff", textDecoration:"none", fontSize:"0.9rem", fontWeight:700,
            }}>{t("nav_login")}</Link>
            <Link href="/courses" onClick={() => setOpen(false)} style={{
              flex:1, textAlign:"center", padding:"0.75rem",
              background:"#c8940a", borderRadius:"999px",
              color:"#fff", textDecoration:"none", fontSize:"0.9rem", fontWeight:700,
            }}>{t("nav_enrol")}</Link>
          </div>
          <LanguageSwitcher variant="footer" />
        </div>
      )}
    </>
  );
}

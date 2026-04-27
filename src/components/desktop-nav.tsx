"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NavAuthButtons } from "@/components/nav-auth-buttons";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocaleContext } from "@/components/locale-provider";

export function DesktopNav() {
  const [isDesktop, setIsDesktop] = useState(true);
  const { t } = useLocaleContext();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) return null;

  const links = [
    { href: "/courses", label: t("nav_courses") },
    { href: "/destinations", label: t("nav_destinations") },
    { href: "/teach-online", label: t("nav_teach_online") },
    { href: "/jobs", label: t("nav_jobs") },
    { href: "/blog", label: t("nav_blog") },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: "#123B3A",
              textDecoration: "none",
              fontSize: "0.92rem",
              fontWeight: 600,
              padding: "0.55rem 0.9rem",
              borderRadius: "10px",
              transition: "background 0.15s ease, color 0.15s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(18,59,58,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "transparent";
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          width: "1px",
          height: "22px",
          background: "rgba(18,59,58,0.10)",
          margin: "0 0.15rem",
        }}
      />

      <LanguageSwitcher variant="nav" />
      <NavAuthButtons />
    </div>
  );
}
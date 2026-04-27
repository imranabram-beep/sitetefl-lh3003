"use client";

import Link from "next/link";

interface TeaserCTAProps {
  href: string;
  label: string;
  icon?: boolean;
}

export function TeaserCTA({ href, label, icon = true }: TeaserCTAProps) {
  return (
    <Link href={href} style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "1.25rem 3rem",
      background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
      color: "white",
      borderRadius: "50px",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "1.05rem",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "translateY(-2px)";
      el.style.boxShadow = "0 8px 20px rgba(34, 201, 154, 0.3)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = "translateY(0)";
      el.style.boxShadow = "none";
    }}>
      {label}
      {icon && (
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </Link>
  );
}

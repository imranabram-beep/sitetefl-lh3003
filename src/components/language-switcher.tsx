/* eslint-disable */
"use client";

import { useState } from "react";
import { useLocaleContext } from "@/components/locale-provider";
import { locales, localeNames, localeFlags } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ variant = "nav" }: { variant?: "nav" | "footer" }) {
  const { locale, setLocale } = useLocaleContext();
  const [open, setOpen] = useState(false);

  if (variant === "footer") {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            all: "unset",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            background: open ? "rgba(34, 201, 154, 0.15)" : "rgba(34, 201, 154, 0.08)",
            color: "var(--text-strong)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            border: "1px solid rgba(34, 201, 154, 0.2)",
            transition: "background 0.15s",
          }}
          aria-label="Change language"
        >
          <span style={{ fontSize: "1.1rem" }}>{localeFlags[locale]}</span>
          <span>{localeNames[locale]}</span>
          <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>▾</span>
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              left: 0,
              background: "white",
              border: "1px solid rgba(34, 201, 154, 0.15)",
              borderRadius: "8px",
              padding: "0.5rem",
              zIndex: 9999,
              minWidth: "200px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => { setLocale(l); setOpen(false); }}
                style={{
                  all: "unset",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "6px",
                  background: locale === l ? "rgba(34, 201, 154, 0.1)" : "transparent",
                  border: locale === l ? "1px solid rgba(34, 201, 154, 0.2)" : "1px solid transparent",
                  color: locale === l ? "var(--primary-teal-dark)" : "var(--text-primary)",
                  fontSize: "0.85rem",
                  fontWeight: locale === l ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{localeFlags[l]}</span>
                <span>{localeNames[l]}</span>
              </button>
            ))}
          </div>
        )}

        {/* Close on outside click */}
        {open && (
          <div
            style={{ position: "fixed", inset: 0, zIndex: 9998 }}
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    );
  }

  // Nav variant — globe icon + dropdown
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          all: "unset",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.4rem 0.65rem",
          borderRadius: "8px",
          background: open ? "rgba(255,255,255,0.1)" : "transparent",
          color: "rgba(255,255,255,0.85)",
          fontSize: "0.82rem",
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "inherit",
          border: "1px solid rgba(255,255,255,0.15)",
          transition: "background 0.15s",
        }}
        aria-label="Change language"
      >
        <span style={{ fontSize: "1rem" }}>{localeFlags[locale]}</span>
        <span style={{ fontSize: "0.75rem", opacity: 0.7 }}>▾</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            background: "#12263a",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "14px",
            padding: "0.75rem",
            zIndex: 9999,
            minWidth: "280px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.3rem",
          }}
        >
          <div style={{ gridColumn: "1/-1", fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", padding: "0.2rem 0.4rem 0.6rem" }}>
            Select language
          </div>
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => { setLocale(l); setOpen(false); }}
              style={{
                all: "unset",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.65rem",
                borderRadius: "8px",
                background: locale === l ? "rgba(0,200,176,0.12)" : "transparent",
                border: locale === l ? "1px solid rgba(0,200,176,0.2)" : "1px solid transparent",
                color: locale === l ? "#00c8b0" : "rgba(255,255,255,0.75)",
                fontSize: "0.82rem",
                fontWeight: locale === l ? 700 : 500,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{localeFlags[l]}</span>
              <span style={{ fontSize: "0.78rem" }}>{localeNames[l]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Close on outside click */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9998 }}
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

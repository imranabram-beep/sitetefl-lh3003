"use client";

import { useTesterMode } from "@/hooks/useTesterMode";

export function TesterModeToggle() {
  const { enabled, isLoaded, toggle } = useTesterMode();

  if (!isLoaded) return null;

  return (
    <button
      onClick={toggle}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "999px",
        border: `2px solid ${enabled ? "#ffc107" : "var(--line-strong)"}`,
        background: enabled ? "#fff3cd" : "var(--surface)",
        color: enabled ? "#856404" : "var(--muted)",
        fontSize: "0.8rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      🧪 {enabled ? "Tester mode ON — click to disable" : "Enable tester mode"}
    </button>
  );
}

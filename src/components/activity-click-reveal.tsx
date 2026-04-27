"use client";

import { useState } from "react";

type Item = {
  id: string;
  text: string;        // the label on the button e.g. "Controller"
  reveal: string;      // the definition revealed on click
};

type Props = {
  title?: string;
  description?: string;
  instruction?: string;
  items: Item[];
  onComplete?: () => void;
};

export function ActivityClickReveal({
  title,
  description,
  instruction,
  items,
  onComplete,
}: Props) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Mark complete once all items revealed
        if (next.size === items.length) onComplete?.();
      }
      return next;
    });
  }

  return (
    <div
      style={{
        background: "var(--surface-alt)",
        borderRadius: "var(--radius-sm)",
        padding: "1.5rem",
        border: "1px solid var(--line)",
      }}
    >
      {title && (
        <p
          style={{
            fontWeight: 700,
            color: "var(--text-strong)",
            marginBottom: "0.5rem",
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </p>
      )}

      {description && (
        <p style={{ color: "var(--text)", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
          {description}
        </p>
      )}

      {instruction && (
        <p style={{ color: "var(--muted)", marginBottom: "1.25rem", fontSize: "0.875rem" }}>
          {instruction}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item) => {
          const isOpen = revealed.has(item.id);

          return (
            <div key={item.id}>
              {/* Clickable button */}
              <button
                onClick={() => toggle(item.id)}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  background: isOpen ? "var(--accent-deep)" : "var(--accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: isOpen
                    ? "var(--radius-xs) var(--radius-xs) 0 0"
                    : "var(--radius-xs)",
                  cursor: "pointer",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background 0.15s",
                }}
              >
                {item.text}
                <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>

              {/* Revealed definition */}
              {isOpen && (
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--accent)",
                    borderTop: "none",
                    borderRadius: "0 0 var(--radius-xs) var(--radius-xs)",
                    padding: "12px 16px",
                    fontSize: "0.9rem",
                    color: "var(--text)",
                    lineHeight: 1.6,
                  }}
                >
                  {item.reveal}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.8rem",
          color: "var(--muted)",
          textAlign: "right",
        }}
      >
        {revealed.size} / {items.length} revealed
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";

type Props = {
  title?: string;
  instruction?: string;
  items: string[];        // scrambled
  correctOrder: string[]; // correct
  onComplete?: () => void;
};

export function ActivitySort({ title, instruction, items, correctOrder, onComplete }: Props) {
  const [order, setOrder] = useState<string[]>([...items]);
  const [checked, setChecked] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...order];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setOrder(next);
    setChecked(false);
    setCorrect(null);
  }

  function moveDown(i: number) {
    if (i === order.length - 1) return;
    const next = [...order];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setOrder(next);
    setChecked(false);
    setCorrect(null);
  }

  function handleDragStart(i: number) {
    setDragIdx(i);
  }

  function handleDrop(i: number) {
    if (dragIdx === null || dragIdx === i) return;
    const next = [...order];
    const [moved] = next.splice(dragIdx, 1);
    next.splice(i, 0, moved);
    setOrder(next);
    setDragIdx(null);
    setChecked(false);
    setCorrect(null);
  }

  function checkAnswer() {
    const isCorrect = order.every((item, i) => item === correctOrder[i]);
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) onComplete?.();
  }

  function reset() {
    setOrder([...items]);
    setChecked(false);
    setCorrect(null);
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

      {instruction && (
        <p style={{ color: "var(--muted)", marginBottom: "1rem", fontSize: "0.9rem" }}>
          {instruction}
        </p>
      )}

      {/* Sortable list */}
      <div style={{ marginBottom: "1.25rem" }}>
        {order.map((item, i) => {
          const isCorrect = checked && item === correctOrder[i];
          const isWrong = checked && item !== correctOrder[i];

          return (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                marginBottom: "6px",
                background: isCorrect
                  ? "var(--success-soft)"
                  : isWrong
                  ? "var(--danger-soft)"
                  : "var(--surface)",
                border: `1.5px solid ${
                  isCorrect
                    ? "var(--success)"
                    : isWrong
                    ? "var(--danger)"
                    : "var(--line-strong)"
                }`,
                borderRadius: "var(--radius-xs)",
                cursor: "grab",
                userSelect: "none",
              }}
            >
              {/* Drag handle */}
              <span style={{ color: "var(--muted)", fontSize: "1rem", cursor: "grab" }}>
                ⋮⋮
              </span>

              {/* Item text */}
              <span style={{ flex: 1, color: "var(--text-strong)", fontSize: "0.9rem" }}>
                {item}
              </span>

              {/* Up/down buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <button
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: i === 0 ? "default" : "pointer",
                    opacity: i === 0 ? 0.3 : 0.7,
                    padding: "2px 6px",
                    fontSize: "0.75rem",
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(i)}
                  disabled={i === order.length - 1}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: i === order.length - 1 ? "default" : "pointer",
                    opacity: i === order.length - 1 ? 0.3 : 0.7,
                    padding: "2px 6px",
                    fontSize: "0.75rem",
                  }}
                >
                  ↓
                </button>
              </div>

              {/* Result indicator */}
              {checked && (
                <span style={{ fontSize: "1rem" }}>
                  {isCorrect ? "✓" : "✗"}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback */}
      {checked && (
        <div
          style={{
            padding: "10px 14px",
            borderRadius: "var(--radius-xs)",
            background: correct ? "var(--success-soft)" : "var(--danger-soft)",
            border: `1px solid ${correct ? "var(--success)" : "var(--danger)"}`,
            marginBottom: "1rem",
            fontSize: "0.9rem",
            color: correct ? "var(--success)" : "var(--danger)",
            fontWeight: 600,
          }}
        >
          {correct
            ? "✓ Correct! Well done."
            : "Not quite — try reordering and check again."}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "10px" }}>
        {!correct && (
          <button onClick={checkAnswer} className="button" style={{ fontSize: "0.9rem" }}>
            Check answers
          </button>
        )}
        <button onClick={reset} className="button ghost" style={{ fontSize: "0.9rem" }}>
          Reset
        </button>
      </div>
    </div>
  );
}

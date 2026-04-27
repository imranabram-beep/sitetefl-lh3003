"use client";

import { useState, useEffect, useRef } from "react";

type Props = {
  prompt: string;
  durationSeconds: number;
  title?: string;
  onComplete?: () => void;
};

export function ActivityTimer({ prompt, durationSeconds, title, onComplete }: Props) {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [remaining, setRemaining] = useState(durationSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function startTimer() {
    if (status === "running") return;
    setStatus("running");
    setRemaining(durationSeconds);

    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setStatus("done");
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStatus("idle");
    setRemaining(durationSeconds);
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeDisplay = `${minutes}:${String(seconds).padStart(2, "0")}`;
  const percent = ((durationSeconds - remaining) / durationSeconds) * 100;

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

      {/* Activity prompt box */}
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius-xs)",
          padding: "1rem 1.25rem",
          marginBottom: "1.25rem",
          border: "1px solid var(--line)",
        }}
      >
        <p style={{ color: "var(--text)", fontSize: "0.95rem" }}>{prompt}</p>
      </div>

      {/* Timer display */}
      {status !== "idle" && (
        <div style={{ marginBottom: "1rem" }}>
          {/* Progress bar */}
          <div
            style={{
              height: "6px",
              background: "var(--line)",
              borderRadius: "999px",
              marginBottom: "0.75rem",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${percent}%`,
                background:
                  status === "done"
                    ? "var(--success)"
                    : remaining < 10
                    ? "var(--danger)"
                    : "var(--accent)",
                borderRadius: "999px",
                transition: "width 1s linear",
              }}
            />
          </div>

          {/* Time remaining */}
          <div style={{ textAlign: "center" }}>
            {status === "done" ? (
              <p
                style={{
                  color: "var(--success)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                ✓ Time's up!
              </p>
            ) : (
              <p
                style={{
                  color:
                    remaining < 10 ? "var(--danger)" : "var(--text-strong)",
                  fontWeight: 800,
                  fontSize: "2rem",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {timeDisplay}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {status === "idle" && (
          <button
            onClick={startTimer}
            className="button"
            style={{
              background: "var(--success)",
              minWidth: "180px",
              fontSize: "1rem",
            }}
          >
            ▶ Start timer
          </button>
        )}
        {status === "running" && (
          <button
            onClick={resetTimer}
            className="button ghost"
            style={{ fontSize: "0.9rem" }}
          >
            Reset
          </button>
        )}
        {status === "done" && (
          <button
            onClick={resetTimer}
            className="button ghost"
            style={{ fontSize: "0.9rem" }}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

/* eslint-disable */
import { ReactNode } from "react";

/**
 * BlogThumbnail - Glass-morphism thumbnail for blog listing cards
 * Used on the blog index page to show a preview of each post
 */
export function BlogThumbnail({ illustration }: { illustration: ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "16px",
        padding: "1.5rem",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        {illustration}
      </div>
    </div>
  );
}

interface BlogHeroImageProps {
  illustration: ReactNode;
  alt: string;
  position?: "left" | "right" | "center";
}

/**
 * BlogHeroImage - Full-width hero image with responsive positioning
 * Placed in the hero section of blog posts
 */
export function BlogHeroImage({
  illustration,
  alt,
  position = "right",
}: BlogHeroImageProps) {
  const getPositionClass = () => {
    switch (position) {
      case "left":
        return "justify-start";
      case "center":
        return "justify-center";
      case "right":
      default:
        return "justify-end";
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        right: position === "right" ? "2rem" : position === "left" ? "auto" : "50%",
        left: position === "left" ? "2rem" : position === "center" ? "50%" : "auto",
        top: "50%",
        transform: position === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
        width: "300px",
        height: "300px",
        maxWidth: "40%",
        zIndex: 2,
        opacity: 0.9,
      }}
    >
      {illustration}
    </div>
  );
}

interface BlogInfographicProps {
  title: string;
  children: ReactNode;
  columns?: 1 | 2 | 3;
}

/**
 * BlogInfographic - Glass-morphism container for infographics and diagrams
 * Used for data visualization and step-by-step guides within blog posts
 */
export function BlogInfographic({
  title,
  children,
  columns = 1,
}: BlogInfographicProps) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
        padding: "2rem",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
        marginBottom: "2rem",
      }}
    >
      {title && (
        <h3
          style={{
            margin: "0 0 1.5rem",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#0d1f2d",
          }}
        >
          {title}
        </h3>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            columns === 3
              ? "repeat(auto-fit, minmax(150px, 1fr))"
              : columns === 2
              ? "repeat(auto-fit, minmax(250px, 1fr))"
              : "1fr",
          gap: "1.5rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface DataCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  color?: "teal" | "green" | "blue" | "purple" | "orange";
}

/**
 * DataCard - Small card for displaying salary, stats, or other data within infographics
 */
export function DataCard({ label, value, icon, color = "teal" }: DataCardProps) {
  const colorMap = {
    teal: "#17a697",
    green: "#10b981",
    blue: "#3b82f6",
    purple: "#a855f7",
    orange: "#f59e0b",
  };

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        border: `2px solid ${colorMap[color]}`,
        borderRadius: "12px",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      {icon && (
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          {icon}
        </div>
      )}
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 800,
          color: colorMap[color],
          marginBottom: "0.25rem",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.85rem",
          color: "#7a8898",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface StepProps {
  number: number;
  title: string;
  description: string;
}

/**
 * ProcessStep - Step card for step-by-step guides
 */
export function ProcessStep({ number, title, description }: StepProps) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #17a697 0%, #0f766e 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "1.1rem",
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <div>
        <h4
          style={{
            margin: "0 0 0.5rem",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#0d1f2d",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: "0.95rem",
            color: "#4a5868",
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

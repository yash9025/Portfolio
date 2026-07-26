"use client";

import { useState } from "react";

interface StickyNoteProps {
  label?: string;
  text: string;
  rotation?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function StickyNote({
  label = "// NOTE",
  text,
  rotation = 3,
  className = "",
  style = {},
}: StickyNoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`sticky-note ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 170,
        minHeight: 140,
        background: "#FFFFFF",
        border: "2px solid #000000",
        boxShadow: isHovered
          ? "8px 8px 0px 0px rgba(0,0,0,1)"
          : "6px 6px 0px 0px rgba(0,0,0,1)",
        padding: "14px 14px",
        fontFamily: "var(--font-mono)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "default",
        transform: isHovered
          ? "rotate(0deg) translate(-2px, -2px)"
          : `rotate(${rotation}deg)`,
        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease",
        zIndex: isHovered ? 20 : undefined,
        ...style,
      }}
    >
      <div>
        <div
          style={{
            fontSize: "0.62rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#000000",
            opacity: 0.6,
            marginBottom: 8,
            borderBottom: "1px dashed #000000",
            paddingBottom: 4,
          }}
        >
          {label}
        </div>
        <p
          style={{
            fontSize: "0.76rem",
            lineHeight: 1.45,
            color: "#000000",
            margin: 0,
            fontWeight: 500,
          }}
        >
          {text}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: "#00ffb3",
            border: "1px solid #000000",
          }}
        />
      </div>
    </div>
  );
}

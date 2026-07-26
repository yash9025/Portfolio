"use client";

export default function ProfileCard() {
  return (
    <div
      className="hard-shadow"
      style={{
        background: "#FFFFFF",
        padding: "20px",
        width: 260,
        userSelect: "none",
      }}
    >
      {/* Avatar placeholder — initials */}
      <div
        style={{
          width: 56,
          height: 56,
          border: "2px solid #000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontWeight: 800,
          fontSize: "1.2rem",
          marginBottom: 14,
          background: "#000000",
          color: "#FFFFFF",
        }}
      >
        YA
      </div>

      {/* Name + handle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "-0.02em",
          }}
        >
          Yash Agrawal
        </span>
        <span
          style={{
            display: "inline-block",
            transform: "rotate(-3deg)",
            border: "2px solid #000000",
            padding: "1px 8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            background: "#000000",
            color: "#FFFFFF",
          }}
        >
          @yash
        </span>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          lineHeight: 1.5,
          paddingBottom: 12,
          borderBottom: "2px solid #000000",
          marginBottom: 10,
        }}
      >
        Full Stack Developer · B.Tech CSE @ PDEU · Building reactive systems
        with React, Node.js & AI.
      </p>

      {/* Decorative dots */}
      <div style={{ display: "flex", gap: 6 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#000000",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "2px solid #000000",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: "2px solid #000000",
          }}
        />
      </div>
    </div>
  );
}

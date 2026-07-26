"use client";

interface StatusCardProps {
  status?: string;
  lastUpdated?: string;
}

export default function StatusCard({
  status = "OPEN FOR WORK",
  lastUpdated = "JULY 2026",
}: StatusCardProps) {
  return (
    <div
      className="hard-shadow"
      style={{
        background: "#FFFFFF",
        padding: "16px 20px",
        width: 260,
        userSelect: "none",
        position: "relative",
      }}
    >
      {/* Top row: label + dot */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--text-muted)",
            borderBottom: "2px solid #000000",
            paddingBottom: 2,
          }}
        >
          Status
        </span>
        <div className="status-dot" />
      </div>

      {/* Big status text */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 800,
          fontSize: "1.05rem",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          marginBottom: 14,
        }}
      >
        {status}
      </p>

      {/* Timestamp */}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          color: "var(--text-light)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Last Updated: {lastUpdated}
      </span>
    </div>
  );
}

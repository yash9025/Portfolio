"use client";

export default function EducationWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/education.txt
      </p>

      <div
        style={{
          border: "2px solid #000000",
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "0.92rem",
                marginBottom: 2,
              }}
            >
              Pandit Deendayal Energy University
            </h3>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--text-muted)",
              }}
            >
              Gandhinagar, Gujarat
            </p>
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          >
            Jul 2023 – May 2027
          </span>
        </div>

        <p style={{ fontSize: "0.82rem", marginBottom: 10 }}>
          <strong>B.Tech</strong> — Computer Science & Engineering
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 8,
            border: "2px solid #000000",
            padding: "4px 12px",
            background: "#000000",
            color: "#FFFFFF",
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            CGPA
          </span>
          <span style={{ fontWeight: 800, fontSize: "1.1rem" }}>9.54</span>
        </div>
      </div>

      <div style={{ borderTop: "2px solid #000000", paddingTop: 14 }}>
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          Core Subjects
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[
            "Data Structures & Algorithms",
            "Operating Systems",
            "Computer Networks",
            "DBMS",
            "OOP",
            "System Design",
          ].map((s) => (
            <span key={s} className="tech-badge">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

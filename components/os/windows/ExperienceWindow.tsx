"use client";

const EXPERIENCES = [
  {
    role: "Full Stack Developer",
    company: "Abould",
    period: "Feb 2026 – July 2026",
    type: "Remote",
    bullets: [
      "Built backend APIs for 2 SaaS products in production with 500+ users, as part of a 3-person dev team.",
      "Optimized Redis caching & DB indexing, reducing p95 API latency by 40% on high-traffic endpoints.",
      "Developed real-time Plaid sync engine with instant alerts, cutting FCM pushes by 80% and achieving 79% expense review completion.",
      "Engineered Maker–Checker payout system using Stripe, reducing operational overhead by 65%.",
    ],
    tech: ["Node.js", "Redis", "PostgreSQL", "Stripe", "Plaid API", "FCM"],
  },
  {
    role: "Web Development Intern",
    company: "Xenovate Tech Solutions",
    period: "Aug 2025 – Oct 2025",
    type: "Remote",
    bullets: [
      "Built Dockerized BI platform on GCP, reducing deployment latency by 40% to accelerate data access.",
      "Engineered SaaS credit billing system, improving data retrieval speeds by 35% via optimized logic.",
      "Deployed AI email composer, reducing manual customer outreach drafting time by 90%.",
    ],
    tech: ["Docker", "GCP", "Next.js", "TypeScript", "Python / AI"],
  },
];

export default function ExperienceWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/work-experience.txt
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.company}
            style={{
              border: "2px solid #000000",
              padding: 16,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: "0.88rem",
                    marginBottom: 2,
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {exp.company} · {exp.type}
                </p>
              </div>
              <span
                style={{
                  fontSize: "0.62rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                  border: "1px solid #000000",
                  padding: "2px 8px",
                }}
              >
                {exp.period}
              </span>
            </div>

            {/* Bullets */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                marginBottom: 12,
              }}
            >
              {exp.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "0.78rem",
                    lineHeight: 1.6,
                    marginBottom: 6,
                    paddingLeft: 14,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      fontWeight: 700,
                    }}
                  >
                    ›
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Tech badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {exp.tech.map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

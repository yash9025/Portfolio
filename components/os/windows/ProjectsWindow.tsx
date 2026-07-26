"use client";

import { ExternalLink } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: "mediconnect",
    name: "MediConnect",
    tagline: "Healthcare Ecosystem · Real-Time OPD Queue · RAG",
    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Redis",
      "Socket.io",
      "LangChain",
      "Gemini",
      "Cloudinary",
    ],
    stats: [
      { label: "Congestion cut", value: "40%" },
      { label: "Redundant visits cut", value: "60%" },
      { label: "Auth model", value: "RBAC" },
    ],
    bullets: [
      "WebSocket-driven system handling concurrent users with real-time updates, reducing congestion by 40%.",
      "RAG-based AI agent with vector embeddings + LangChain pipelines to retrieve MoHFW-grounded medical knowledge and recommend specialists.",
      "Secure report-sharing protocol for remote diagnoses, reducing redundant visits by 60%.",
      "Razorpay payments & Cloudinary media pipelines secured via RBAC for strict patient data privacy.",
    ],
    links: {
      live: "https://mediconnect-wx0o.onrender.com",
      github: "https://github.com/agrawal6353",
    },
  },
  {
    id: "queueforge",
    name: "QueueForge",
    tagline: "High-Concurrency Distributed Job Queue",
    tech: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Express.js",
      "Socket.io",
      "React.js",
      "Docker",
    ],
    stats: [
      { label: "Double-processing", value: "ZERO" },
      { label: "Task recovery", value: "100%" },
      { label: "Load test", value: "200 VU" },
    ],
    bullets: [
      "Zero double-processing across 3 workers under 200 VU k6 load via Postgres SKIP LOCKED.",
      "100% task recovery from orphaned jobs via Reaper daemon, verified through chaos testing.",
      "Live telemetry streamed to React dashboard via WebSocket with single-poll fan-out to clients.",
    ],
    links: {
      live: "https://queueforge-frontend.onrender.com",
      github: "https://github.com/yash9025/QueueForge",
    },
  },
  {
    id: "quickassist",
    name: "AI Quick Assist",
    tagline: "AI Copilot · Customer Support · Real-Time",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cohere AI",
    ],
    stats: [
      { label: "Efficiency boost", value: "31%" },
      { label: "LCP", value: "<2.5s" },
      { label: "AI engine", value: "Cohere" },
    ],
    bullets: [
      "Built AI-driven customer support chat enabling real-time agent–user interaction.",
      "Integrated Cohere AI for smart suggestions and tone correction, boosting efficiency by 31%.",
      "Achieved LCP < 2.5 s via asynchronous API handling and code-splitting.",
    ],
    links: {
      live: "https://ai-support-quickassist-cmxo.onrender.com",
      github: "https://github.com/agrawal6353",
    },
  },
  {
    id: "motogp-dashboard",
    name: "MotoGP Telemetry & Schedule Dashboard",
    tagline: "Live Telemetry · Grand Prix Schedule · PulseLive Engine",
    tech: [
      "React.js",
      "Node.js",
      "PulseLive API",
      "Tailwind CSS",
      "Express.js",
      "REST API",
    ],
    stats: [
      { label: "Data engine", value: "PulseLive" },
      { label: "Telemetry", value: "REAL-TIME" },
      { label: "Coverage", value: "FULL GP" },
    ],
    bullets: [
      "Engineered a comprehensive, real-time MotoGP telemetry and race schedule dashboard powered by the official PulseLive API engine, eliminating regional timezone navigation friction.",
      "Implemented live session timing results, instant Grand Prix race status indicators, and automated rider and constructor championship standings.",
      "Designed an intuitive, high-performance UI showcasing detailed weekend session schedules, team rosters, rider profiles, and historical lap-timing archives.",
    ],
    links: {
      live: "https://motogp-dashbaord.onrender.com",
      github: "https://github.com/yash9025/Motogp-Dashbaord",
    },
  },
];

export default function ProjectsWindow() {
  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 12 }}>
        ~/projects/
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            style={{
              border: "2px solid #000000",
              padding: 0,
            }}
          >
            {/* Project header */}
            <div
              style={{
                borderBottom: "2px solid #000000",
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.58rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--text-muted)",
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    marginTop: 2,
                  }}
                >
                  {proj.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {proj.tagline}
                </p>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {proj.links.live && (
                  <a
                    href={proj.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${proj.name} live demo`}
                    style={{
                      width: 28,
                      height: 28,
                      border: "2px solid #000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFFFFF",
                      color: "#000000",
                      transition: "var(--transition)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#000000";
                      e.currentTarget.style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.color = "#000000";
                    }}
                  >
                    <ExternalLink size={14} strokeWidth={2.5} />
                  </a>
                )}
                <a
                  href={proj.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${proj.name} GitHub`}
                  style={{
                    width: 28,
                    height: 28,
                    border: "2px solid #000000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FFFFFF",
                    color: "#000000",
                    transition: "var(--transition)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#000000";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FFFFFF";
                    e.currentTarget.style.color = "#000000";
                  }}
                >
                  <GithubIcon size={14} />
                </a>
              </div>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${proj.stats.length}, 1fr)`,
                borderBottom: "2px solid #000000",
              }}
            >
              {proj.stats.map((stat, si) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "8px 10px",
                    textAlign: "center",
                    borderRight:
                      si < proj.stats.length - 1
                        ? "2px solid #000000"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.55rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "0.88rem" }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div style={{ padding: "12px 14px" }}>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  marginBottom: 10,
                }}
              >
                {proj.bullets.map((b, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.75rem",
                      lineHeight: 1.6,
                      marginBottom: 4,
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
                {proj.tech.map((t) => (
                  <span key={t} className="tech-badge">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

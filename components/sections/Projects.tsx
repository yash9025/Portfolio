"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectSpecimen = dynamic(
  () => import("../projects/ProjectSpecimen"),
  { ssr: false, loading: () => null }
);

/* ── Data ───────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "mediconnect",
    name: "MediConnect",
    tagline: "Healthcare Ecosystem · Real-Time OPD Queue · RAG",
    description:
      "Full-stack telemedicine platform with WebSocket-driven real-time OPD queue, RAG-based AI agent (LangChain + Gemini) for MoHFW-grounded medical knowledge, secure RBAC report sharing, and Razorpay payment flows.",
    tech: ["React.js", "Node.js", "MongoDB", "Redis", "Socket.io", "LangChain", "Gemini", "Cloudinary"],
    color: "#00c8ff",
    glow: "rgba(0,200,255,0.22)",
    geoType: "icosahedron" as const,
    stats: [
      { label: "Congestion cut",      value: "40%" },
      { label: "Redundant visits cut", value: "60%" },
      { label: "Auth model",           value: "RBAC" },
    ],
    bullets: [
      "WebSocket-driven system handling concurrent users with real-time updates, reducing congestion by 40%.",
      "RAG-based AI agent with vector embeddings + LangChain pipelines to retrieve MoHFW-grounded medical knowledge and recommend specialists.",
      "Secure report-sharing protocol for remote diagnoses, reducing redundant visits by 60%.",
      "Razorpay payments & Cloudinary media pipelines secured via RBAC for strict patient data privacy.",
    ],
    links: { live: "#", github: "https://github.com/agrawal6353" },
  },
  {
    id: "quickassist",
    name: "QuickAssist",
    tagline: "AI Copilot · Customer Support · Real-Time",
    description:
      "Intelligent support chat with Cohere AI for smart suggestions and tone correction. Achieved LCP < 2.5 s via async API handling and code-splitting, boosting agent efficiency by 31%.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Cohere AI"],
    color: "#7b61ff",
    glow: "rgba(123,97,255,0.22)",
    geoType: "torusKnot" as const,
    stats: [
      { label: "Efficiency boost", value: "31%" },
      { label: "LCP",              value: "<2.5s" },
      { label: "AI engine",        value: "Cohere" },
    ],
    bullets: [
      "Built AI-driven customer support chat enabling real-time agent–user interaction.",
      "Integrated Cohere AI for smart suggestions and tone correction, boosting efficiency by 31%.",
      "Achieved LCP < 2.5 s via asynchronous API handling and code-splitting.",
    ],
    links: { live: "#", github: "https://github.com/agrawal6353" },
  },
];

/* ── Iris SVG decoration (decorative rings at clip boundary) ─────── */
function IrisRings({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        opacity: 0.18,
      }}
    >
      {[30, 40, 48].map((r, i) => (
        <circle
          key={i}
          cx="50"
          cy="38"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="0.3"
          strokeDasharray={`${1 + i * 0.5} ${2 - i * 0.3}`}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 28, r2 = 52;
        return (
          <line
            key={`spoke-${i}`}
            x1={50 + r1 * Math.cos(angle)}
            y1={38 + r1 * Math.sin(angle)}
            x2={50 + r2 * Math.cos(angle)}
            y2={38 + r2 * Math.sin(angle)}
            stroke={color}
            strokeWidth="0.15"
            opacity={0.6}
          />
        );
      })}
    </svg>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const irisRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading reveal */
      gsap.from(headingRef.current, {
        opacity: 0, y: 50, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      /* ── IRIS OPENING — Phase 3 signature moment ── */
      gsap.fromTo(
        irisRef.current,
        { clipPath: "circle(0% at 50% 35%)" },
        {
          clipPath: "circle(200% at 50% 35%)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: irisRef.current,
            start: "top 78%",
            end: "center 25%",
            scrub: 1.8,
          },
        }
      );

      /* Project rows stagger inside iris */
      const rows = irisRef.current?.querySelectorAll<HTMLElement>(".proj-row");
      if (rows) {
        gsap.from(Array.from(rows), {
          opacity: 0, y: 50, stagger: 0.3, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: irisRef.current, start: "top 60%", toggleActions: "play none none reverse" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ padding: "8rem 2rem", position: "relative" }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "20%", right: "8%",
        width: 500, height: 500, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(123,97,255,0.065) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 1140, margin: "0 auto" }}>

        {/* Section heading */}
        <div ref={headingRef} style={{ marginBottom: "4rem" }}>
          <p style={{ color: "var(--accent)", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            02 — Projects
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            What I&apos;ve{" "}
            <span className="text-gradient">Shipped</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.8rem", maxWidth: 520, lineHeight: 1.65 }}>
            Drag the specimens to orbit ↗ — powered by Three.js, Bloom post-processing, and React Three Fiber.
          </p>
        </div>

        {/* ── IRIS-REVEALED content ── */}
        <div
          ref={irisRef}
          style={{
            clipPath: "circle(0% at 50% 35%)",
            position: "relative",
          }}
        >
          {/* Decorative iris rings */}
          <IrisRings color="#00c8ff" />

          <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
            {PROJECTS.map((proj, pi) => (
              <div
                key={proj.id}
                id={`project-${proj.id}`}
                className="proj-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(280px, 460px) 1fr",
                  gap: "3rem",
                  alignItems: "center",
                }}
              >
                {/* ── 3D Specimen ── */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    border: `1px solid ${proj.color}30`,
                    background: `radial-gradient(circle at 50% 50%, ${proj.color}0a 0%, transparent 70%)`,
                    boxShadow: `0 0 60px ${proj.glow}`,
                  }}>
                    <ProjectSpecimen color={proj.color} geoType={proj.geoType} height={370} />
                  </div>
                  <p style={{
                    textAlign: "center", marginTop: "0.7rem",
                    fontSize: "0.68rem", color: "var(--text-muted)",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>
                    ⟳ Drag to orbit
                  </p>
                </div>

                {/* ── Project details ── */}
                <div>
                  {/* Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: proj.color, boxShadow: `0 0 14px ${proj.glow}`, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.7rem", color: proj.color, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>
                      {proj.tagline}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "var(--font-space)", color: "var(--text)", marginBottom: "1rem" }}>
                    {proj.name}
                  </h3>

                  {/* Stats */}
                  <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
                    {proj.stats.map(s => (
                      <div key={s.label} style={{ padding: "0.6rem 1rem", borderRadius: 8, background: `${proj.color}0d`, border: `1px solid ${proj.color}28`, textAlign: "center" }}>
                        <div style={{ fontSize: "1.1rem", fontWeight: 700, color: proj.color, fontFamily: "var(--font-space)", lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontSize: "0.63rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Bullets */}
                  <ul style={{ listStyle: "none", marginBottom: "1.4rem" }}>
                    {proj.bullets.map((b, bi) => (
                      <li key={bi} style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.7, paddingLeft: "1.2rem", position: "relative", marginBottom: "0.38rem" }}>
                        <span style={{ position: "absolute", left: 0, color: proj.color, fontSize: "0.52rem", top: "0.52rem" }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.4rem" }}>
                    {proj.tech.map(t => (
                      <span key={t} style={{ padding: "0.22rem 0.7rem", borderRadius: "99px", fontSize: "0.72rem", fontWeight: 500, background: `${proj.color}12`, color: proj.color, border: `1px solid ${proj.color}28` }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: "0.8rem" }}>
                    <a
                      href={proj.links.github}
                      id={`${proj.id}-github`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none", padding: "0.42rem 1.1rem", border: "1px solid var(--border)", borderRadius: "99px", transition: "color 0.25s, border-color 0.25s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = proj.color; e.currentTarget.style.borderColor = `${proj.color}55`; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={proj.links.live}
                      id={`${proj.id}-live`}
                      style={{ color: "#fff", fontSize: "0.85rem", textDecoration: "none", padding: "0.42rem 1.1rem", borderRadius: "99px", background: `linear-gradient(135deg, ${proj.color}, var(--accent-2))`, boxShadow: `0 0 18px ${proj.glow}`, transition: "opacity 0.25s, transform 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}
                    >
                      Live Demo ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 768px) {
          .proj-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

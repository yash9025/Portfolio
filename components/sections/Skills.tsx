"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkillsRadial = dynamic(() => import("../skills/SkillsRadial"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: 460,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-muted)",
      fontSize: "0.8rem",
      letterSpacing: "0.15em",
    }}>
      LOADING RADIAL…
    </div>
  ),
});

/* ── Data ───────────────────────────────────────────────────────── */
type Skill = { name: string; level: number };
type Category = { label: string; color: string; skills: Skill[] };

const SKILL_CATEGORIES: Category[] = [
  {
    label: "Languages",
    color: "#00c8ff",
    skills: [
      { name: "JavaScript",  level: 95 },
      { name: "C++",         level: 88 },
      { name: "Python",      level: 82 },
      { name: "Java",        level: 75 },
    ],
  },
  {
    label: "Frameworks & Libraries",
    color: "#7b61ff",
    skills: [
      { name: "React.js",    level: 95 },
      { name: "Node.js",     level: 92 },
      { name: "Next.js",     level: 90 },
      { name: "Express.js",  level: 90 },
      { name: "LangChain",   level: 78 },
      { name: "Socket.io",   level: 82 },
    ],
  },
  {
    label: "Databases & Cloud",
    color: "#00ffb3",
    skills: [
      { name: "MongoDB",             level: 88 },
      { name: "PostgreSQL",          level: 85 },
      { name: "MySQL",               level: 83 },
      { name: "Redis",               level: 82 },
      { name: "Pinecone / Vector DB", level: 75 },
    ],
  },
  {
    label: "DevOps & Tools",
    color: "#f59e0b",
    skills: [
      { name: "Git / GitHub",    level: 95 },
      { name: "Docker",          level: 82 },
      { name: "GCP",             level: 78 },
      { name: "Postman",         level: 90 },
      { name: "Render / Vercel", level: 88 },
    ],
  },
];

const PRACTICES = [
  "RESTful API Design", "Agile Development", "System Reliability",
  "Debugging & Troubleshooting", "OOP", "DBMS", "Computer Networks",
  "Data Structures & Algorithms", "Operating Systems",
];

/* ── Animated bar ────────────────────────────────────────────────── */
function SkillBar({ skill, color }: { skill: Skill; color: string }) {
  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.from(fillRef.current, {
      scaleX: 0, transformOrigin: "left center", duration: 1.3, ease: "power3.out",
      scrollTrigger: { trigger: fillRef.current, start: "top 90%", toggleActions: "play none none reverse" },
    });
  }, []);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem", fontSize: "0.88rem" }}>
        <span style={{ color: "var(--text)", fontWeight: 500 }}>{skill.name}</span>
        <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{skill.level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
        <div ref={fillRef} style={{ height: "100%", width: `${skill.level}%`, borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}55` }} />
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const radialRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const badgesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el: Element | null) => ({
        trigger: el, start: "top 85%", toggleActions: "play none none reverse",
      });

      gsap.from(headingRef.current, { opacity: 0, y: 50, duration: 1, ease: "power3.out", scrollTrigger: st(headingRef.current) });
      gsap.from(radialRef.current,  { opacity: 0, y: 40, duration: 1, ease: "power3.out", scrollTrigger: { trigger: radialRef.current, start: "top 80%", toggleActions: "play none none reverse" } });

      const cols = gridRef.current?.querySelectorAll<HTMLElement>(".skill-col");
      if (cols) {
        gsap.from(Array.from(cols), { opacity: 0, y: 50, stagger: 0.14, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: gridRef.current, start: "top 80%", toggleActions: "play none none reverse" } });
      }

      const badges = badgesRef.current?.querySelectorAll<HTMLElement>(".badge");
      if (badges) {
        gsap.from(Array.from(badges), { opacity: 0, scale: 0.82, stagger: 0.05, duration: 0.5, ease: "back.out(2)", scrollTrigger: { trigger: badgesRef.current, start: "top 88%", toggleActions: "play none none reverse" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" style={{ padding: "8rem 2rem", position: "relative" }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "15%", left: "20%",
        width: 600, height: 300, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(0,255,179,0.05) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "3rem" }}>
          <p style={{ color: "var(--accent)", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            03 — Skills
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            The{" "}
            <span className="text-gradient">Exoskeleton</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "0.8rem", maxWidth: 500, lineHeight: 1.65 }}>
            Scroll in — the radial bones extend to reveal the full stack. Each arm = one skill node.
          </p>
        </div>

        {/* ── Phase 4: 3D Radial Diagram ── */}
        <div
          ref={radialRef}
          style={{
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "rgba(10,22,40,0.4)",
            backdropFilter: "blur(12px)",
            marginBottom: "3rem",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Subtle scan-line across the canvas */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, height: 2,
            background: "linear-gradient(90deg, transparent, rgba(0,200,255,0.3), transparent)",
            zIndex: 2, pointerEvents: "none",
            animation: "scan-line 5s linear infinite",
          }} />
          <SkillsRadial containerRef={radialRef} />
        </div>

        {/* ── Bar chart columns ── */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {SKILL_CATEGORIES.map(cat => (
            <div
              key={cat.label}
              className="skill-col"
              style={{
                padding: "1.8rem",
                borderRadius: "var(--radius)",
                background: "rgba(10, 22, 40, 0.55)",
                border: "1px solid var(--border)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${cat.color}38`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <h3 style={{ fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: cat.color, marginBottom: "1.4rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${cat.color}28` }}>
                {cat.label}
              </h3>
              {cat.skills.map(s => <SkillBar key={s.name} skill={s} color={cat.color} />)}
            </div>
          ))}
        </div>

        {/* Practices badges */}
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.8rem" }}>
          Practices & Coursework
        </p>
        <div ref={badgesRef} style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {PRACTICES.map(p => (
            <span
              key={p}
              className="badge"
              style={{ padding: "0.35rem 0.9rem", borderRadius: "99px", fontSize: "0.78rem", fontWeight: 500, background: "rgba(255,255,255,0.04)", color: "var(--text-muted)", border: "1px solid var(--border)", letterSpacing: "0.04em", transition: "color 0.25s, border-color 0.25s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "rgba(0,200,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

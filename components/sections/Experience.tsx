"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Animated counter ─────────────────────────────────────────────── */
function CountUp({
  to,
  decimals = 0,
  prefix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: to,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: spanRef.current,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      onUpdate() {
        if (spanRef.current) {
          spanRef.current.textContent =
            prefix + obj.val.toFixed(decimals);
        }
      },
    });
  }, [to, decimals, prefix]);
  return (
    <span ref={spanRef}>
      {prefix}0
    </span>
  );
}

/* ── Data ───────────────────────────────────────────────────────────── */
const EDUCATION = {
  school: "Pandit Deendayal Energy University",
  location: "Gandhinagar, Gujarat",
  degree: "B.Tech — Computer Science & Engineering",
  period: "Jul 2023 – May 2027",
  cgpa: 9.54,
};

const ACHIEVEMENTS = [
  { label: "LeetCode",      to: 1846, prefix: "",  decimals: 0, sub: "Top 6.5% globally",      color: "#f59e0b" },
  { label: "Codeforces",    to: 1351, prefix: "",  decimals: 0, sub: "Specialist",              color: "#ef4444" },
  { label: "ICPC Huawei",   to: 1311, prefix: "#", decimals: 0, sub: "36,000+ participants",   color: "#00c8ff" },
  { label: "LC Weekly 485", to: 81,   prefix: "#", decimals: 0, sub: "34,000+ participants",   color: "#7b61ff" },
];

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
    color: "#00c8ff",
    slideFrom: -90,
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
    color: "#7b61ff",
    slideFrom: 90,
  },
];

/* ── Main export ─────────────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const eduRef     = useRef<HTMLDivElement>(null);
  const achRef     = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.from(headingRef.current, {
        opacity: 0, y: 50, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headingRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      /* Education card — slide from right */
      gsap.from(eduRef.current, {
        opacity: 0, x: 70, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: eduRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      /* Achievement chips — spring bounce stagger */
      const chips = achRef.current?.querySelectorAll<HTMLElement>(".ach-chip");
      if (chips) {
        gsap.from(Array.from(chips), {
          opacity: 0, scale: 0.45, y: 25,
          stagger: { each: 0.13, from: "start" },
          duration: 0.7, ease: "back.out(2.8)",
          scrollTrigger: { trigger: achRef.current, start: "top 84%", toggleActions: "play none none reverse" },
        });
      }

      /* Timeline line — draw from top to bottom via scrub */
      gsap.from(lineRef.current, {
        scaleY: 0, transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 76%",
          end: "bottom 55%",
          scrub: 1.5,
        },
      });

      /* Experience cards — alternating slide + per-card tech chips */
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".exp-card");
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const slideX = i % 2 === 0 ? -90 : 90;
          gsap.from(card, {
            opacity: 0, x: slideX, duration: 1.05,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 82%", toggleActions: "play none none reverse" },
          });
          const techChips = card.querySelectorAll<HTMLElement>(".tech-chip");
          gsap.from(Array.from(techChips), {
            opacity: 0, scale: 0.75, y: 10,
            stagger: 0.07, duration: 0.45, ease: "back.out(2)",
            scrollTrigger: { trigger: card, start: "top 74%", toggleActions: "play none none reverse" },
          });
          const bullets = card.querySelectorAll<HTMLElement>(".bullet-item");
          gsap.from(Array.from(bullets), {
            opacity: 0, x: -20,
            stagger: 0.1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 70%", toggleActions: "play none none reverse" },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" style={{ padding: "8rem 2rem", position: "relative" }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "15%", left: "5%",
        width: 500, height: 500, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,200,255,0.05) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "3.5rem" }}>
          <p style={{ color: "var(--accent)", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            01 — Experience
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
            Where I&apos;ve{" "}
            <span className="text-gradient">Built Things</span>
          </h2>
        </div>

        {/* ── Education card — AMBER colour scheme ── */}
        <div
          ref={eduRef}
          style={{
            padding: "1.8rem 2rem",
            borderRadius: "var(--radius)",
            background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(10,22,40,0.6) 60%)",
            border: "1px solid rgba(245,158,11,0.3)",
            backdropFilter: "blur(14px)",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer stripe */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.7), transparent)",
          }} />

          <div>
            <p style={{ fontSize: "0.68rem", color: "#f59e0b", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem", fontWeight: 600 }}>
              🎓 Education
            </p>
            <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.22rem" }}>
              {EDUCATION.school}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
              {EDUCATION.degree}&nbsp;&nbsp;·&nbsp;&nbsp;{EDUCATION.location}
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            {/* CGPA with counter */}
            <div style={{
              fontSize: "2.4rem", fontWeight: 700,
              color: "#f59e0b",
              fontFamily: "var(--font-space)",
              lineHeight: 1,
              textShadow: "0 0 30px rgba(245,158,11,0.55)",
            }}>
              <CountUp to={EDUCATION.cgpa} decimals={2} />
            </div>
            <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "0.12em", marginTop: "0.2rem" }}>
              CGPA &nbsp;·&nbsp; {EDUCATION.period}
            </div>
          </div>
        </div>

        {/* ── Achievement chips ── */}
        <div
          ref={achRef}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}
        >
          {ACHIEVEMENTS.map(a => (
            <div
              key={a.label}
              className="ach-chip"
              style={{
                padding: "1.1rem 1.4rem",
                borderRadius: "var(--radius)",
                background: "rgba(10, 22, 40, 0.6)",
                border: `1px solid ${a.color}30`,
                backdropFilter: "blur(12px)",
                textAlign: "center",
                flex: "1 1 130px",
                transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s",
                cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px) scale(1.04)";
                e.currentTarget.style.boxShadow = `0 0 30px ${a.color}35`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                fontSize: "clamp(1.3rem, 2.8vw, 1.9rem)",
                fontWeight: 700, color: a.color,
                fontFamily: "var(--font-space)", lineHeight: 1,
                marginBottom: "0.3rem",
                textShadow: `0 0 20px ${a.color}55`,
              }}>
                <CountUp to={a.to} prefix={a.prefix} decimals={a.decimals} />
              </div>
              <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.12rem" }}>
                {a.label}
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>{a.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Work timeline ── */}
        <div ref={cardsRef} style={{ position: "relative", paddingLeft: "2rem" }}>

          {/* Animated vertical line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute", left: 0, top: 8, bottom: 8, width: 1,
              background: "linear-gradient(to bottom, var(--accent), var(--accent-2), var(--accent-3))",
              opacity: 0.45,
              transformOrigin: "top",
            }}
          />

          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="exp-card"
              style={{
                position: "relative",
                marginBottom: "2.5rem",
                padding: "2rem",
                borderRadius: "var(--radius)",
                background: "rgba(10, 22, 40, 0.55)",
                border: "1px solid var(--border)",
                backdropFilter: "blur(12px)",
                transition: "border-color 0.3s, box-shadow 0.3s, transform 0.35s cubic-bezier(.34,1.2,.64,1)",
              }}
              onMouseEnter={e => {
                const tilt = i % 2 === 0 ? -2 : 2;
                e.currentTarget.style.borderColor = `${exp.color}55`;
                e.currentTarget.style.boxShadow = `0 20px 60px ${exp.color}15, 0 0 0 1px ${exp.color}22`;
                e.currentTarget.style.transform = `perspective(1000px) rotateY(${tilt}deg) translateY(-6px)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Timeline dot + pulse ring */}
              <div style={{ position: "absolute", left: "-2.55rem", top: "2rem" }}>
                {/* Outer pulse ring */}
                <div style={{
                  position: "absolute",
                  width: 22, height: 22,
                  borderRadius: "50%",
                  border: `1px solid ${exp.color}`,
                  top: -6, left: -6,
                  opacity: 0,
                  animation: `dot-pulse-${i} 2.2s ease-out infinite ${i * 0.4}s`,
                }} />
                {/* Core dot */}
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: exp.color,
                  boxShadow: `0 0 14px ${exp.color}, 0 0 28px ${exp.color}55`,
                  position: "relative", zIndex: 1,
                }} />
              </div>

              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.9rem" }}>
                <div>
                  <h3 style={{ fontSize: "1.12rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.2rem" }}>
                    {exp.role}
                  </h3>
                  <p style={{
                    color: exp.color, fontSize: "0.92rem", fontWeight: 600,
                    textShadow: `0 0 20px ${exp.color}40`,
                  }}>
                    {exp.company}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.77rem", padding: "0.2rem 0.8rem", border: "1px solid var(--border)", borderRadius: "99px", whiteSpace: "nowrap", display: "block", marginBottom: "0.28rem" }}>
                    {exp.period}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.68rem", opacity: 0.55 }}>{exp.type}</span>
                </div>
              </div>

              {/* Bullet points with class for animation */}
              <ul style={{ listStyle: "none", marginBottom: "1.2rem" }}>
                {exp.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="bullet-item"
                    style={{ color: "var(--text-muted)", fontSize: "0.91rem", lineHeight: 1.7, paddingLeft: "1.2rem", position: "relative", marginBottom: "0.35rem" }}
                  >
                    <span style={{ position: "absolute", left: 0, color: exp.color, fontSize: "0.52rem", top: "0.5rem" }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Tech chips with class for animation */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {exp.tech.map(t => (
                  <span
                    key={t}
                    className="tech-chip"
                    style={{
                      padding: "0.22rem 0.7rem", borderRadius: "99px",
                      fontSize: "0.73rem", fontWeight: 500,
                      background: `${exp.color}12`, color: exp.color,
                      border: `1px solid ${exp.color}28`,
                      letterSpacing: "0.04em",
                      transition: "background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${exp.color}25`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${exp.color}12`; e.currentTarget.style.transform = ""; }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Community */}
        <div style={{ padding: "1.2rem 1.8rem", borderRadius: "var(--radius)", background: "rgba(10,22,40,0.4)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🤝</span>
          <div>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.12rem" }}>
              Community Outreach Lead — Arthved Foundation
            </p>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              Led 5 community programs securing essential resources for 50 families.
            </p>
          </div>
        </div>
      </div>

      {/* Dot pulse keyframes */}
      <style>{`
        @keyframes dot-pulse-0 {
          0%   { transform: scale(1); opacity: 0.55; }
          70%  { transform: scale(2.8); opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes dot-pulse-1 {
          0%   { transform: scale(1); opacity: 0.55; }
          70%  { transform: scale(2.8); opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}

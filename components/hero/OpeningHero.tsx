"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: () => null });

// ── ECG heartbeat path ─────────────────────────────────────────────
// viewBox "0 0 1000 120", centre-Y = 60
// Pattern: flat → P-wave → QRS-complex → T-wave → flat (×3)
const ECG_D =
  "M -80,60 L 140,60 " +
  "L 152,52 L 160,68 L 168,6 L 177,114 L 186,40 L 200,60 " +
  "L 370,60 " +
  "L 382,52 L 390,68 L 398,6 L 407,114 L 416,40 L 430,60 " +
  "L 640,60 " +
  "L 652,52 L 660,68 L 668,6 L 677,114 L 686,40 L 700,60 " +
  "L 1080,60";

// ── Synapse branch paths ───────────────────────────────────────────
// viewBox "0 0 1000 600", origin at (500, 300)
const BRANCHES = [
  { d: "M 500,300 C 450,255 378,215 255,145", color: "#00c8ff", nx: 255, ny: 145 },
  { d: "M 500,300 C 488,225 472,163 450,75",  color: "#00c8ff", nx: 450, ny: 75  },
  { d: "M 500,300 C 558,255 625,215 748,145", color: "#7b61ff", nx: 748, ny: 145 },
  { d: "M 500,300 C 615,283 706,260 848,248", color: "#7b61ff", nx: 848, ny: 248 },
  { d: "M 500,300 C 585,362 648,402 756,464", color: "#00ffb3", nx: 756, ny: 464 },
  { d: "M 500,300 C 510,400 522,465 536,558", color: "#00ffb3", nx: 536, ny: 558 },
  { d: "M 500,300 C 415,362 355,402 247,464", color: "#00c8ff", nx: 247, ny: 464 },
  { d: "M 500,300 C 386,283 295,260 152,248", color: "#7b61ff", nx: 152, ny: 248 },
] as const;

const NAME_FIRST = "YASH";
const NAME_LAST  = "AGRAWAL";

export default function OpeningHero() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const ecgRef        = useRef<SVGPathElement>(null);
  const nameRef       = useRef<HTMLDivElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const statusRef     = useRef<HTMLDivElement>(null);
  const scanLineRef   = useRef<HTMLDivElement>(null);

  const branchRefs = useRef<(SVGPathElement | null)[]>(
    Array(BRANCHES.length).fill(null)
  );
  const nodeRefs = useRef<(SVGCircleElement | null)[]>(
    Array(BRANCHES.length).fill(null)
  );

  useEffect(() => {
    const ecgPath = ecgRef.current;
    if (!ecgPath) return;

    // ── ECG path length for draw animation ──────────────────────
    const ecgLen = ecgPath.getTotalLength();
    gsap.set(ecgPath, { strokeDasharray: ecgLen, strokeDashoffset: ecgLen });

    // ── Synapse path lengths ─────────────────────────────────────
    branchRefs.current.forEach((el) => {
      if (!el) return;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.set(nodeRefs.current.filter(Boolean), {
      scale: 0,
      transformOrigin: "center",
    });

    // ── Initial text states ──────────────────────────────────────
    const chars = nameRef.current
      ? Array.from(nameRef.current.querySelectorAll<HTMLElement>(".char"))
      : [];
    gsap.set(chars, { opacity: 0, y: 36 });
    gsap.set([taglineRef.current, ctaRef.current, statusRef.current], {
      opacity: 0,
      y: 18,
    });

    // ── Master timeline (scrubbed to scroll) ─────────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Phase A — ECG draws across (0 → 1.4)
      tl.to(ecgPath, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1.4,
      }, 0);

      // Phase B — system status flickers in (1.0)
      tl.to(statusRef.current, { opacity: 1, y: 0, duration: 0.35 }, 1.0);

      // Phase B — name resolves letter-by-letter (1.2 → 2.2)
      tl.to(chars, {
        opacity: 1,
        y: 0,
        stagger: { each: 0.055, from: "start" },
        ease: "power3.out",
        duration: 0.7,
      }, 1.2);

      // Phase B — tagline + CTA appear (1.9 → 2.5)
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5 }, 1.9);
      tl.to(ctaRef.current,     { opacity: 1, y: 0, duration: 0.5 }, 2.1);

      // Phase C — synapse branches grow one by one (2.5 → 4.0)
      branchRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, {
          strokeDashoffset: 0,
          ease: "power2.inOut",
          duration: 0.4,
        }, 2.5 + i * 0.09);

        const node = nodeRefs.current[i];
        if (node) {
          tl.to(node, {
            scale: 1,
            ease: "back.out(3)",
            duration: 0.28,
          }, 2.72 + i * 0.09);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} id="hero" style={{ height: "500vh", position: "relative" }}>

      {/* ── Sticky viewport ──────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 3D particle background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Hero3D />
        </div>

        {/* Radial vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 22%, var(--bg) 100%)",
          }}
        />

        {/* Scan-line shimmer */}
        <div
          ref={scanLineRef}
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,200,255,0.4) 50%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
            animation: "scan-line 6s linear infinite",
            opacity: 0.6,
          }}
        />

        {/* ── ECG SVG ──────────────────────────────────────────── */}
        <svg
          viewBox="0 0 1000 120"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            top: "14%",
            left: 0,
            width: "100%",
            height: 160,
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id="ecg-glow" x="-5%" y="-100%" width="110%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Subtle secondary trace */}
            <filter id="ecg-glow-2" x="-5%" y="-100%" width="110%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>
          {/* Halo layer */}
          <path
            d={ECG_D}
            fill="none"
            stroke="#00c8ff"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#ecg-glow-2)"
            opacity={0.25}
          />
          {/* Main line */}
          <path
            ref={ecgRef}
            d={ECG_D}
            fill="none"
            stroke="#00c8ff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecg-glow)"
          />
        </svg>

        {/* ── Synapse SVG ──────────────────────────────────────── */}
        <svg
          viewBox="0 0 1000 600"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter id="syn-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sub-branches (decorative, thinner, offset) */}
          {BRANCHES.map((br, i) => (
            <path
              key={`sub-${i}`}
              d={br.d}
              fill="none"
              stroke={br.color}
              strokeWidth="4"
              strokeLinecap="round"
              opacity={0.08}
            />
          ))}

          {/* Main branches + nodes */}
          {BRANCHES.map((br, i) => (
            <g key={i} filter="url(#syn-glow)">
              <path
                ref={(el) => { branchRefs.current[i] = el; }}
                d={br.d}
                fill="none"
                stroke={br.color}
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity={0.8}
              />
              {/* Outer ring */}
              <circle cx={br.nx} cy={br.ny} r={11} fill="none" stroke={br.color} strokeWidth={0.8} opacity={0.35} />
              {/* Core dot */}
              <circle
                ref={(el) => { nodeRefs.current[i] = el; }}
                cx={br.nx}
                cy={br.ny}
                r={5}
                fill={br.color}
                opacity={0.95}
              />
            </g>
          ))}
        </svg>

        {/* ── Centre text content ───────────────────────────────── */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            textAlign: "center",
            padding: "0 1.5rem",
            maxWidth: 920,
          }}
        >
          {/* System boot status */}
          <div ref={statusRef} style={{ marginBottom: "1.4rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.32em",
                color: "var(--accent-3)",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              ▸ NEURAL SYSTEM ONLINE
            </span>
          </div>

          {/* Name — character-by-character */}
          <div
            ref={nameRef}
            aria-label="YASH AGRAWAL"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 5.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-space)",
              lineHeight: 1,
              marginBottom: "1.1rem",
              display: "flex",
              justifyContent: "center",
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
              gap: "0 0.01em",
            }}
          >
            {/* "YASH" — gradient */}
            {NAME_FIRST.split("").map((c, i) => (
              <span
                key={`f${i}`}
                className="char"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #00c8ff 0%, #7b61ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } as React.CSSProperties}
              >
                {c}
              </span>
            ))}
            {/* Space */}
            <span className="char" style={{ display: "inline-block", width: "0.38em" }}>&nbsp;</span>
            {/* "AGRAWAL" — white */}
            {NAME_LAST.split("").map((c, i) => (
              <span
                key={`l${i}`}
                className="char"
                style={{ display: "inline-block", color: "var(--text)" }}
              >
                {c}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            style={{
              fontSize: "clamp(0.78rem, 1.8vw, 1.05rem)",
              color: "var(--text-muted)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 300,
              marginBottom: "2.8rem",
              lineHeight: 1.8,
            }}
          >
            Full Stack Developer&nbsp;&nbsp;·&nbsp;&nbsp;PDEU, Gandhinagar&nbsp;&nbsp;·&nbsp;&nbsp;CGPA 9.54
            <br />
            <span style={{ fontSize: "0.9em", opacity: 0.75 }}>
              LeetCode Top 6.5%&nbsp;&nbsp;·&nbsp;&nbsp;ICPC Rank 1311 / 36,000+
            </span>
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              id="opening-cta-projects"
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: "99px",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.03em",
                boxShadow: "0 0 30px var(--glow), 0 0 60px rgba(0,200,255,0.15)",
                transition: "var(--transition)",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px) scale(1.03)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "")}
            >
              Explore Work
            </a>
            <a
              href="/Yash_Agrawal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              id="opening-cta-resume"
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: "99px",
                border: "1px solid rgba(0,200,255,0.4)",
                background: "rgba(0,200,255,0.06)",
                color: "var(--accent)",
                fontWeight: 500,
                fontSize: "0.95rem",
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "var(--transition)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(0,200,255,0.14)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(0,200,255,0.06)";
                e.currentTarget.style.transform = "";
              }}
            >
              Download CV ↗
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-muted)",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            zIndex: 4,
          }}
        >
          <span>Scroll to begin</span>
          <div
            style={{
              width: 1,
              height: 50,
              background: "linear-gradient(to bottom, var(--accent), transparent)",
              animation: "float 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

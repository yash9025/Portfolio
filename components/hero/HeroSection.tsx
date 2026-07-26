"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* Dynamically import Canvas-heavy component — SSR disabled */
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,200,255,0.12) 0%, transparent 70%)",
      }}
    />
  ),
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, { opacity: 0, y: 60, duration: 1.2, delay: 0.3 })
        .from(subRef.current,     { opacity: 0, y: 30, duration: 0.9 }, "-=0.7")
        .from(ctaRef.current,     { opacity: 0, y: 20, duration: 0.8 }, "-=0.6")
        .from(scrollCueRef.current, { opacity: 0, duration: 1 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        height: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 3D Background Canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Hero3D />
      </div>

      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, var(--bg) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "860px",
        }}
      >
        {/* Status chip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderRadius: "99px",
            border: "1px solid rgba(0,200,255,0.3)",
            background: "rgba(0,200,255,0.06)",
            fontSize: "0.78rem",
            color: "var(--accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent-3)",
              boxShadow: "0 0 8px var(--accent-3)",
              animation: "pulse-glow 2s infinite",
              display: "inline-block",
            }}
          />
          Available for work
        </div>

        <h1
          ref={headingRef}
          style={{
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-space)",
            marginBottom: "1.5rem",
          }}
        >
          <span className="text-gradient">Yash</span>{" "}
          <span style={{ color: "var(--text)" }}>Agrawal</span>
          <br />
          <span
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              color: "var(--text-muted)",
              letterSpacing: "-0.01em",
            }}
          >
            Full Stack Developer
          </span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-muted)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Building living, reactive systems at the intersection of engineering
          and creative technology. React · Node.js · Three.js · AI.
        </p>

        <div
          ref={ctaRef}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            id="hero-cta-projects"
            style={{
              padding: "0.85rem 2rem",
              borderRadius: "99px",
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
              boxShadow: "0 0 30px var(--glow)",
              transition: "var(--transition)",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px) scale(1.03)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "")}
          >
            View Projects
          </a>
          <a
            href="#contact"
            id="hero-cta-contact"
            style={{
              padding: "0.85rem 2rem",
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
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
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
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          zIndex: 2,
        }}
      >
        <span>Scroll</span>
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "float 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

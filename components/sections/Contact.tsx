"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Social links ────────────────────────────────────────────────── */
const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/agrawal6353",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yash-agrawal/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:agrawal6353@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

/* ── Pulsing awakening orb (Phase 5 signature) ───────────────────── */
function AwakeningOrb() {
  const orbRef    = useRef<HTMLDivElement>(null);
  const ringsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.from(orbRef.current, {
        scale: 0, opacity: 0, duration: 1.2, ease: "back.out(1.5)",
        scrollTrigger: { trigger: orbRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });

      // Breathing pulse — the "Awakening" breath
      gsap.to(orbRef.current, {
        scale: 1.12,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Ring pulses (delayed)
      const rings = ringsRef.current?.children;
      if (rings) {
        Array.from(rings).forEach((ring, i) => {
          gsap.to(ring, {
            scale: 2.4 + i * 0.7,
            opacity: 0,
            duration: 2.8 + i * 0.4,
            ease: "power1.out",
            repeat: -1,
            delay: i * 0.9,
          });
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: 160,
        height: 160,
        margin: "0 auto 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Pulse rings */}
      <div ref={ringsRef} style={{ position: "absolute", inset: 0 }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(0,200,255,0.35)",
              transform: "scale(1)",
              opacity: 0.4,
            }}
          />
        ))}
      </div>
      {/* Orb */}
      <div
        ref={orbRef}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 35%, rgba(0,255,255,0.9) 0%, rgba(0,200,255,0.6) 30%, rgba(123,97,255,0.4) 65%, rgba(0,255,179,0.2) 100%)",
          boxShadow:
            "0 0 40px rgba(0,200,255,0.7), 0 0 80px rgba(0,200,255,0.35), inset 0 0 30px rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const emailBarRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el: Element | null) => ({
        trigger: el, start: "top 85%", toggleActions: "play none none reverse",
      });
      gsap.from(headingRef.current, { opacity: 0, y: 50, duration: 1, ease: "power3.out", scrollTrigger: st(headingRef.current) });
      gsap.from(emailBarRef.current, { opacity: 0, y: 30, duration: 0.8, delay: 0.1, ease: "power3.out", scrollTrigger: st(emailBarRef.current) });
      gsap.from(formRef.current,    { opacity: 0, y: 60, duration: 1, delay: 0.15, ease: "power3.out", scrollTrigger: st(formRef.current) });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.9rem 1.2rem", borderRadius: 10,
    background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)",
    color: "var(--text)", fontSize: "0.95rem", fontFamily: "var(--font-sans)",
    outline: "none", transition: "border-color 0.25s, box-shadow 0.25s",
  };
  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = "rgba(0,200,255,0.55)";
      e.target.style.boxShadow = "0 0 0 3px rgba(0,200,255,0.08)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = "var(--border)";
      e.target.style.boxShadow = "none";
    },
  };

  return (
    <section ref={sectionRef} id="contact" style={{ padding: "8rem 2rem 10rem", position: "relative" }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "5%", right: "10%",
        width: 400, height: 400, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,200,255,0.07) 0%, transparent 70%)",
      }} />

      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* ── Phase 5: Awakening orb ── */}
        <AwakeningOrb />

        {/* Heading */}
        <div ref={headingRef} style={{ marginBottom: "3rem", textAlign: "center" }}>
          <p style={{ color: "var(--accent)", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            04 — Contact
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", fontFamily: "var(--font-space)", lineHeight: 1.1, marginBottom: "0.9rem" }}>
            Let&apos;s{" "}
            <span className="text-gradient">Build Together</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.98rem", lineHeight: 1.7, maxWidth: 440, margin: "0 auto 1.8rem" }}>
            Open to full-time roles, freelance projects, and collaboration.
            I reply within 24 hours.
          </p>

          {/* Social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                id={`contact-${s.label.toLowerCase()}`}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.45rem", padding: "0.5rem 1rem", borderRadius: "99px", border: "1px solid var(--border)", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, transition: "var(--transition)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,200,255,0.5)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 18px var(--glow)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Email bar */}
        <div
          ref={emailBarRef}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderRadius: "var(--radius)", background: "rgba(0,200,255,0.05)", border: "1px solid rgba(0,200,255,0.22)", marginBottom: "2rem", flexWrap: "wrap", gap: "0.5rem" }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Direct email</span>
          <a href="mailto:agrawal6353@gmail.com" id="contact-email-direct" style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", fontFamily: "var(--font-mono, monospace)" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
          >
            agrawal6353@gmail.com ↗
          </a>
        </div>

        {/* Contact form */}
        <form
          ref={formRef}
          id="contact-form"
          onSubmit={handleSubmit}
          style={{ padding: "2.5rem", borderRadius: "var(--radius)", background: "rgba(10, 22, 40, 0.55)", border: "1px solid var(--border)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.4rem", display: "block" }}>Name</label>
              <input id="contact-name" name="name" type="text" required placeholder="Ada Lovelace" value={form.name} onChange={handleChange} style={inputStyle} {...focusProps} />
            </div>
            <div>
              <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.4rem", display: "block" }}>Email</label>
              <input id="contact-email" name="email" type="email" required placeholder="ada@example.com" value={form.email} onChange={handleChange} style={inputStyle} {...focusProps} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "0.4rem", display: "block" }}>Message</label>
            <textarea id="contact-message" name="message" required rows={6} placeholder="Hey Yash, I have a project in mind…" value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: "vertical", minHeight: 140 }} {...focusProps} />
          </div>

          <button
            id="contact-submit"
            type="submit"
            disabled={status !== "idle"}
            style={{
              padding: "0.9rem 2rem", borderRadius: "99px", border: "none",
              cursor: status === "idle" ? "pointer" : "not-allowed",
              background: status === "sent" ? "linear-gradient(135deg, var(--accent-3), #00c8aa)" : "linear-gradient(135deg, var(--accent), var(--accent-2))",
              color: "#fff", fontWeight: 600, fontSize: "0.95rem", letterSpacing: "0.04em",
              alignSelf: "flex-end", boxShadow: "0 0 30px var(--glow)",
              opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.3s, transform 0.25s",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={e => { if (status === "idle") e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
          >
            {status === "idle" ? "Send Message →" : status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Try Again"}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "3.5rem", opacity: 0.4, lineHeight: 1.8 }}>
          © {new Date().getFullYear()} Yash Agrawal &nbsp;·&nbsp; PDEU, Gandhinagar &nbsp;·&nbsp; agrawal6353@gmail.com
          <br />
          Built with Next.js 16 &nbsp;·&nbsp; React Three Fiber &nbsp;·&nbsp; GSAP &nbsp;·&nbsp; Lenis
        </p>
      </div>
    </section>
  );
}

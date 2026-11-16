"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"      },
  { label: "Contact",    href: "#contact"     },
];

export default function NavBar() {
  const navRef   = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Scroll-aware background */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Mount animation */
  useEffect(() => {
    gsap.from(navRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      delay: 1.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        id="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s",
          background: scrolled
            ? "rgba(2, 4, 7, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          id="nav-logo"
          style={{
            fontFamily: "var(--font-space)",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "var(--text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="text-gradient">YA</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: 4 }}>
            .dev
          </span>
        </a>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                id={`nav-${label.toLowerCase()}`}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  transition: "color 0.25s",
                  position: "relative",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire me button */}
        <a
          href="https://drive.google.com/file/d/1RjfcoUkrxRKtQ3e1ZjiOpbWoCFnbIna7/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          id="nav-resume"
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: "99px",
            border: "1px solid rgba(0,200,255,0.4)",
            color: "var(--accent)",
            fontSize: "0.85rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "var(--transition)",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(0,200,255,0.1)";
            e.currentTarget.style.boxShadow = "0 0 20px var(--glow)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Resume ↗
        </a>
      </nav>

      {/* Inline responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}

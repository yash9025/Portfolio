"use client";

import { useState, useEffect } from "react";

export default function MenuBar({ onHireMe }: { onHireMe?: () => void }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="menu-bar" role="menubar" aria-label="Desktop menu bar">
      {/* Left: menus */}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <span
          style={{
            fontWeight: 700,
            padding: "0 12px",
            fontSize: "0.78rem",
            letterSpacing: "0.04em",
          }}
        >
          ⌘ YA
        </span>
        <span
          className="hidden md:inline"
          style={{ padding: "0 10px", cursor: "default" }}
        >
          File
        </span>
        <span
          className="hidden md:inline"
          style={{ padding: "0 10px", cursor: "default" }}
        >
          Edit
        </span>
        <span
          className="hidden md:inline"
          style={{ padding: "0 10px", cursor: "default" }}
        >
          View
        </span>
        <span
          className="hidden md:inline"
          style={{ padding: "0 10px", cursor: "default" }}
        >
          Help
        </span>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right: Hire Me + clock */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onHireMe}
          id="hire-me-btn"
          style={{
            background: "#000000",
            color: "#FFFFFF",
            border: "2px solid #000000",
            padding: "2px 14px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
            transition: "var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#000000";
            e.currentTarget.style.color = "#FFFFFF";
          }}
        >
          Hire Me
        </button>
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
            color: "var(--text-muted)",
            minWidth: 88,
            textAlign: "right",
          }}
        >
          {time}
        </span>
      </div>
    </div>
  );
}

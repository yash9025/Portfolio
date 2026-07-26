"use client";

import { useState } from "react";
import { Terminal, Maximize2 } from "lucide-react";

interface MiniTerminalWidgetProps {
  onExpand: () => void;
}

export default function MiniTerminalWidget({ onExpand }: MiniTerminalWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onExpand}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 260,
        background: "#000000",
        border: "2px solid #000000",
        boxShadow: isHovered
          ? "6px 6px 0px 0px rgba(0,0,0,1)"
          : "4px 4px 0px 0px rgba(0,0,0,1)",
        transform: isHovered
          ? "translate(-2px, -2px)"
          : "translate(0px, 0px)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        padding: "12px",
        userSelect: "none",
      }}
      title="Click to expand full interactive ZSH terminal"
    >
      {/* Mini Titlebar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px dashed rgba(255,255,255,0.25)",
          paddingBottom: 6,
          marginBottom: 8,
          fontSize: "0.68rem",
          color: "#00ffb3",
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Terminal size={12} strokeWidth={2.5} />
          <span>zsh — mini</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            border: "1px solid rgba(0,255,179,0.5)",
            padding: "1px 6px",
            fontSize: "0.58rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            background: isHovered ? "#00ffb3" : "transparent",
            color: isHovered ? "#000000" : "#00ffb3",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
        >
          <span>expand</span>
          <Maximize2 size={9} strokeWidth={2.5} />
        </div>
      </div>

      {/* Mini terminal preview body */}
      <div style={{ fontSize: "0.72rem", lineHeight: 1.5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.85 }}>
          <span style={{ color: "#00ffb3", fontWeight: 700 }}>$</span>
          <span style={{ color: "#FFFFFF" }}>status --live</span>
        </div>
        <div
          style={{
            color: "#00ffb3",
            paddingLeft: 10,
            marginBottom: 6,
            fontSize: "0.68rem",
          }}
        >
          &gt; open for work 🟢
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#00ffb3", fontWeight: 700 }}>~ %</span>
          <span style={{ color: "#FFFFFF" }}>
            whoami<span className="blinking-cursor" style={{ color: "#00ffb3" }}>█</span>
          </span>
        </div>
      </div>

      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          margin-left: 3px;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

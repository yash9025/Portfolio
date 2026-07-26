"use client";

import { useState, useEffect, useRef } from "react";

type TerminalCmd = {
  cmd: string;
  out: string;
};

const COMMANDS: TerminalCmd[] = [
  { cmd: "whoami", out: "yash agrawal" },
  {
    cmd: "cat about.txt",
    out: "full stack engineer & creative technologist @ pdeu (cgpa: 9.54)",
  },
  {
    cmd: "cat experience.txt",
    out: "full stack developer @ abould · web development intern @ xenovate",
  },
  {
    cmd: "echo $STATUS",
    out: "open for work — ready to engineer resilient high-concurrency systems",
  },
  {
    cmd: "skills --top",
    out: "react · node.js · redis · postgresql · docker · gcp · socket.io",
  },
];

export default function TerminalWindow() {
  const [history, setHistory] = useState<TerminalCmd[]>([]);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom of terminal */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, typed, isFinished]);

  /* Typewriter engine */
  useEffect(() => {
    if (step >= COMMANDS.length) {
      setIsFinished(true);
      return;
    }

    const currentCmd = COMMANDS[step].cmd;

    if (typed.length < currentCmd.length) {
      const timer = setTimeout(() => {
        setTyped(currentCmd.slice(0, typed.length + 1));
      }, 45);
      return () => clearTimeout(timer);
    } else {
      /* Pause after finishing command typing before output displays */
      const pauseTimer = setTimeout(() => {
        setHistory((prev) => [...prev, COMMANDS[step]]);
        setStep((s) => s + 1);
        setTyped("");
      }, 350);
      return () => clearTimeout(pauseTimer);
    }
  }, [step, typed]);

  const handleRestart = () => {
    setHistory([]);
    setStep(0);
    setTyped("");
    setIsFinished(false);
  };

  return (
    <div
      style={{
        background: "#000000",
        color: "#FFFFFF",
        padding: "16px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.82rem",
        lineHeight: 1.6,
        minHeight: "340px",
        borderRadius: 0,
        border: "1px solid #000000",
        position: "relative",
        boxShadow: "inset 0 0 10px rgba(0,255,179,0.08)",
      }}
    >
      {/* Terminal header bar / restart controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          paddingBottom: 8,
          marginBottom: 14,
          fontSize: "0.7rem",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <span>zsh — 80x24</span>
        <button
          onClick={handleRestart}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#00ffb3",
            padding: "2px 8px",
            fontSize: "0.62rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
          }}
        >
          [clear / replay]
        </button>
      </div>

      {/* Completed history */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {history.map((item, idx) => (
          <div key={idx}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#00ffb3", fontWeight: 700 }}>~ %</span>
              <span style={{ color: "#FFFFFF" }}>{item.cmd}</span>
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                paddingLeft: 12,
                marginTop: 2,
              }}
            >
              {item.out}
            </div>
          </div>
        ))}

        {/* Active typing command */}
        {!isFinished && step < COMMANDS.length && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "#00ffb3", fontWeight: 700 }}>~ %</span>
              <span style={{ color: "#FFFFFF" }}>
                {typed}
                <span className="blinking-cursor">█</span>
              </span>
            </div>
          </div>
        )}

        {/* Final idle prompt */}
        {isFinished && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <span style={{ color: "#00ffb3", fontWeight: 700 }}>~ %</span>
            <span className="blinking-cursor" style={{ color: "#00ffb3" }}>
              █
            </span>
          </div>
        )}
      </div>

      <div ref={bottomRef} />

      <style jsx>{`
        .blinking-cursor {
          display: inline-block;
          margin-left: 4px;
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

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  FileText,
  GraduationCap,
  Briefcase,
  Code2,
  FolderOpen,
  Contact,
  Trophy,
  Terminal,
} from "lucide-react";

import MenuBar from "./MenuBar";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import ProfileCard from "./ProfileCard";
import StatusCard from "./StatusCard";
import Dock from "./Dock";
import HeroCenterpiece from "./HeroCenterpiece";
import MiniTerminalWidget from "./MiniTerminalWidget";

import AboutWindow from "./windows/AboutWindow";
import EducationWindow from "./windows/EducationWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import AchievementsWindow from "./windows/AchievementsWindow";
import ContactWindow from "./windows/ContactWindow";
import TerminalWindow from "./windows/TerminalWindow";

/* ── Window content registry ─────────────────────────────── */
type WindowDef = {
  id: string;
  title: string;
  icon: typeof FileText;
  label: string;
  content: React.ReactNode;
  width: number;
  height: number;
};

const WINDOW_DEFS: WindowDef[] = [
  {
    id: "about",
    title: "About Me.txt",
    icon: FileText,
    label: "About Me.txt",
    content: <AboutWindow />,
    width: 520,
    height: 480,
  },
  {
    id: "education",
    title: "Education.txt",
    icon: GraduationCap,
    label: "Education.txt",
    content: <EducationWindow />,
    width: 500,
    height: 400,
  },
  {
    id: "experience",
    title: "Work Experience.txt",
    icon: Briefcase,
    label: "Work Exp.txt",
    content: <ExperienceWindow />,
    width: 560,
    height: 520,
  },
  {
    id: "skills",
    title: "Skills.txt",
    icon: Code2,
    label: "Skills.txt",
    content: <SkillsWindow />,
    width: 480,
    height: 460,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderOpen,
    label: "Projects",
    content: <ProjectsWindow />,
    width: 580,
    height: 560,
  },
  {
    id: "achievements",
    title: "Achievements.txt",
    icon: Trophy,
    label: "Achievements.txt",
    content: <AchievementsWindow />,
    width: 540,
    height: 500,
  },
  {
    id: "contact",
    title: "Contact Info.txt",
    icon: Contact,
    label: "Contact.txt",
    content: <ContactWindow />,
    width: 460,
    height: 400,
  },
  {
    id: "terminal",
    title: "terminal — zsh",
    icon: Terminal,
    label: "Terminal",
    content: <TerminalWindow />,
    width: 560,
    height: 440,
  },
];

/* ── Open window state ───────────────────────────────────── */
type OpenWindow = {
  id: string;
  title: string;
  content: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  width: number;
  height: number;
};

/* Offset generator so cascading windows don't stack exactly */
let openCount = 0;
function nextPosition(): { x: number; y: number } {
  const base = { x: 180, y: 60 };
  const offset = (openCount % 6) * 30;
  openCount++;
  return { x: base.x + offset, y: base.y + offset };
}

/* ── Desktop Component ───────────────────────────────────── */
export default function Desktop() {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [topZ, setTopZ] = useState(10);
  const desktopRef = useRef<HTMLDivElement>(null);

  /* Mouse tilt effect */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typeof window === "undefined") return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setTilt({ x: dy * -1.5, y: dx * 1.5 });
    },
    []
  );

  /* Open a window */
  const openWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        /* If already open, bring to front */
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          const newZ = topZ + 1;
          setTopZ(newZ);
          return prev.map((w) =>
            w.id === id ? { ...w, zIndex: newZ } : w
          );
        }

        const def = WINDOW_DEFS.find((d) => d.id === id);
        if (!def) return prev;

        const newZ = topZ + 1;
        setTopZ(newZ);

        return [
          ...prev,
          {
            id: def.id,
            title: def.title,
            content: def.content,
            position: nextPosition(),
            zIndex: newZ,
            width: def.width,
            height: def.height,
          },
        ];
      });
    },
    [topZ]
  );

  /* Close a window */
  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  /* Bring window to front */
  const focusWindow = useCallback(
    (id: string) => {
      const newZ = topZ + 1;
      setTopZ(newZ);
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, zIndex: newZ } : w))
      );
    },
    [topZ]
  );

  /* Global Escape handler — close front-most window */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && windows.length > 0) {
        const front = windows.reduce((a, b) =>
          a.zIndex > b.zIndex ? a : b
        );
        closeWindow(front.id);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [windows, closeWindow]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        perspective: "1200px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Menu Bar */}
      <MenuBar onHireMe={() => openWindow("contact")} />

      {/* Desktop canvas with tilt */}
      <div
        ref={desktopRef}
        className="desktop-grid"
        style={{
          position: "absolute",
          top: 32,
          left: 0,
          right: 0,
          bottom: 0,
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          transformOrigin: "center center",
        }}
      >
        {/* Centerpiece Hero Photo & Sticky Notes */}
        <HeroCenterpiece />

        {/* Desktop Icons — grid */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: 4,
            zIndex: 1,
          }}
        >
          {WINDOW_DEFS.filter((def) => def.id !== "terminal").map((def) => (
            <DesktopIcon
              key={def.id}
              id={def.id}
              icon={def.icon}
              label={def.label}
              onClick={() => openWindow(def.id)}
            />
          ))}
        </div>

        {/* Floating Widget Cards — top right on desktop, bottom of icons on mobile */}
        <div
          className="widget-cards"
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            zIndex: 2,
          }}
        >
          <ProfileCard />
          <StatusCard />
          <MiniTerminalWidget onExpand={() => openWindow("terminal")} />
        </div>

        {/* Open Windows */}
        <AnimatePresence>
          {windows.map((w) => (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              position={w.position}
              zIndex={w.zIndex}
              width={w.width}
              height={w.height}
              onClose={closeWindow}
              onFocus={focusWindow}
            >
              {w.content}
            </Window>
          ))}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <Dock onOpenProjects={() => openWindow("projects")} />

      {/* Responsive styles for widget cards and icon grid */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .widget-cards {
            position: static !important;
            flex-direction: row !important;
            flex-wrap: wrap;
            padding: 16px 24px;
            gap: 12px !important;
          }
          .widget-cards > div {
            width: 100% !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .widget-cards {
            right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

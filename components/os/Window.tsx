"use client";

import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  width?: number;
  height?: number;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
}

export default function Window({
  id,
  title,
  children,
  position,
  zIndex,
  width = 520,
  height = 420,
  onClose,
  onFocus,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  /* Compute initial clamped position once so re-renders don't reset drag */
  const [initialPos] = useState(() => {
    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winH = typeof window !== "undefined" ? window.innerHeight : 800;
    return {
      x: Math.min(Math.max(16, position.x), Math.max(16, winW - width - 20)),
      y: Math.min(Math.max(16, position.y), Math.max(16, winH - height - 60)),
    };
  });

  /* Bring to front on any pointer down inside the window */
  const handlePointerDown = () => {
    onFocus(id);
  };

  /* Close on Escape when this window is focused */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(id);
      }
    };
    const el = windowRef.current;
    el?.addEventListener("keydown", handleKeyDown);
    return () => el?.removeEventListener("keydown", handleKeyDown);
  }, [id, onClose]);

  return (
    <motion.div
      ref={windowRef}
      className="os-window"
      tabIndex={-1}
      role="dialog"
      aria-label={`${title} window`}
      style={{
        position: "absolute",
        left: initialPos.x,
        top: initialPos.y,
        zIndex,
        width: `min(${width}px, 95vw)`,
        maxHeight: `min(${height}px, calc(100vh - 100px))`,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={{
        top: -initialPos.y,
        left: -initialPos.x + 20,
        right: (typeof window !== "undefined" ? window.innerWidth : 1200) - 100,
        bottom: (typeof window !== "undefined" ? window.innerHeight : 800) - 100,
      }}
      onPointerDown={handlePointerDown}
    >
      {/* Title bar — drag handle */}
      <motion.div
        className="os-window-titlebar"
        onPointerDown={(e) => {
          handlePointerDown();
          dragControls.start(e);
        }}
        style={{
          touchAction: "none",
          cursor: "move",
          userSelect: "none",
        }}
      >
        <span className="os-window-title" style={{ pointerEvents: "none" }}>
          {title}
        </span>
        <button
          className="os-window-close"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          aria-label={`Close ${title}`}
          tabIndex={0}
        >
          <X size={12} strokeWidth={3} />
        </button>
      </motion.div>

      {/* Content */}
      <div className="os-window-content window-scroll">{children}</div>
    </motion.div>
  );
}

"use client";

import type { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  id: string;
}

export default function DesktopIcon({
  icon: Icon,
  label,
  onClick,
  id,
}: DesktopIconProps) {
  return (
    <button
      className="desktop-icon"
      onClick={onClick}
      id={`desktop-icon-${id}`}
      aria-label={`Open ${label}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="desktop-icon-box">
        <Icon size={22} strokeWidth={2} />
      </div>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}

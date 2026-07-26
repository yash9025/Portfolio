"use client";

import Image from "next/image";
import { useState } from "react";
import StickyNote from "./StickyNote";

export default function HeroCenterpiece() {
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const [hoveredNote, setHoveredNote] = useState<number | null>(null);

  return (
    <div className="hero-centerpiece-wrapper">
      {/* ─── Note 1: Top-Left (peeking out from behind/beside) ─── */}
      <div
        className={`note-top-left ${hoveredNote === 1 ? "hovered" : ""}`}
        onMouseEnter={() => setHoveredNote(1)}
        onMouseLeave={() => setHoveredNote(null)}
      >
        <StickyNote
          label="// ACHIEVEMENTS"
          text="LeetCode Top 6.5% · 9.54 CGPA @ PDEU · ICPC Huawei Rank #1311 🏆"
          rotation={-4}
        />
      </div>

      {/* ─── Hero Photo (Anchor Centerpiece) ─── */}
      <div
        className="hero-photo-container"
        onMouseEnter={() => setIsPhotoHovered(true)}
        onMouseLeave={() => setIsPhotoHovered(false)}
        style={{
          position: "relative",
          border: "2px solid #000000",
          background: "#000000",
          boxShadow: isPhotoHovered
            ? "4px 4px 0px 0px rgba(0,0,0,1)"
            : "8px 8px 0px 0px rgba(0,0,0,1)",
          transform: isPhotoHovered
            ? "translate(4px, 4px)"
            : "translate(0px, 0px)",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          overflow: "hidden",
          cursor: "default",
          zIndex: 2,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src="/hero-img.png"
            alt="Yash Agrawal — Full Stack Engineer"
            fill
            sizes="(max-width: 768px) 300px, 360px"
            style={{
              objectFit: "cover",
              filter: "contrast(1.1) grayscale(0.1)",
            }}
            priority
          />
        </div>
      </div>

      {/* ─── Note 2: Bottom-Right (peeking out from behind/beside) ─── */}
      <div
        className={`note-bottom-right ${hoveredNote === 2 ? "hovered" : ""}`}
        onMouseEnter={() => setHoveredNote(2)}
        onMouseLeave={() => setHoveredNote(null)}
      >
        <StickyNote
          label="// EXP & CREED"
          text="Built scalable systems at Abould & Xenovate. 'Simplicity is prerequisite for reliability.'"
          rotation={3.5}
        />
      </div>

      <style jsx>{`
        /* Desktop layout — centered absolute anchor with overlapping notes */
        .hero-centerpiece-wrapper {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
        }

        .hero-photo-container {
          width: 360px;
          height: 440px;
        }

        /* Note 1: sits behind photo at z-index 1, pops forward and over image on hover */
        .note-top-left {
          position: absolute;
          top: -30px;
          left: -110px;
          z-index: 1;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s;
        }
        .note-top-left.hovered {
          z-index: 10;
          transform: translate(45px, 25px) scale(1.06);
        }

        /* Note 2: sits at z-index 3, pops forward and over image on hover */
        .note-bottom-right {
          position: absolute;
          bottom: -25px;
          right: -100px;
          z-index: 3;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s;
        }
        .note-bottom-right.hovered {
          z-index: 10;
          transform: translate(-45px, -25px) scale(1.06);
        }

        /* Mobile layout — stack cleanly below icons in normal flow without overlapping */
        @media (max-width: 768px) {
          .hero-centerpiece-wrapper {
            position: static !important;
            transform: none !important;
            flex-direction: column !important;
            gap: 20px !important;
            padding: 24px 20px 40px;
            margin: 0 auto;
            width: 100%;
            max-width: 400px;
          }

          .hero-photo-container {
            width: 100% !important;
            max-width: 310px !important;
            height: 380px !important;
          }

          .note-top-left,
          .note-bottom-right,
          .note-top-left.hovered,
          .note-bottom-right.hovered {
            position: static !important;
            top: auto !important;
            left: auto !important;
            right: auto !important;
            bottom: auto !important;
            transform: none !important;
            z-index: auto !important;
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

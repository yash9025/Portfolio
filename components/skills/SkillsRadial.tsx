"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Skill data for radial ───────────────────────────────────────── */
const RADIAL_SKILLS = [
  { name: "React / Next",   level: 0.95, color: "#00c8ff", angle:   0 },
  { name: "Node.js",        level: 0.92, color: "#00c8ff", angle:  45 },
  { name: "TypeScript",     level: 0.90, color: "#7b61ff", angle:  90 },
  { name: "MongoDB",        level: 0.88, color: "#7b61ff", angle: 135 },
  { name: "PostgreSQL",     level: 0.85, color: "#00ffb3", angle: 180 },
  { name: "Docker / GCP",   level: 0.82, color: "#00ffb3", angle: 225 },
  { name: "Redis",          level: 0.82, color: "#f59e0b", angle: 270 },
  { name: "LangChain / AI", level: 0.78, color: "#f59e0b", angle: 315 },
];

const MAX_LEN = 3.0; // max bone length in world units

/* ── Bone (cylinder) component ───────────────────────────────────── */
function Bone({
  skill,
  progressRef,
  index,
}: {
  skill: (typeof RADIAL_SKILLS)[number];
  progressRef: React.MutableRefObject<number[]>;
  index: number;
}) {
  const meshRef    = useRef<THREE.Mesh>(null!);
  const matRef     = useRef<THREE.MeshStandardMaterial>(null!);
  const nodeRef    = useRef<THREE.Mesh>(null!);
  const htmlRef    = useRef<THREE.Group>(null!);

  const rad       = (skill.angle * Math.PI) / 180;
  const targetLen = skill.level * MAX_LEN;
  const color     = new THREE.Color(skill.color);

  useFrame(() => {
    const p = progressRef.current[index];
    const currentLen = p * targetLen;
    if (!meshRef.current || !nodeRef.current || !htmlRef.current) return;

    // Extend bone from centre outward
    const half = currentLen / 2;
    meshRef.current.position.x = Math.cos(rad) * half;
    meshRef.current.position.z = Math.sin(rad) * half;
    meshRef.current.scale.y    = currentLen < 0.001 ? 0.001 : currentLen;

    // Node tip
    nodeRef.current.position.x = Math.cos(rad) * currentLen;
    nodeRef.current.position.z = Math.sin(rad) * currentLen;
    nodeRef.current.visible     = currentLen > 0.1;

    // Label group
    htmlRef.current.position.x = Math.cos(rad) * (currentLen + 0.5);
    htmlRef.current.position.z = Math.sin(rad) * (currentLen + 0.5);

    // Glow intensity based on progress
    if (matRef.current) {
      matRef.current.emissiveIntensity = p * 0.8;
    }
  });

  return (
    <group>
      {/* Bone cylinder — thin, horizontal, extending outward */}
      <mesh
        ref={meshRef}
        rotation={[0, -rad + Math.PI / 2, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.018, 0.018, 1, 8]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Node at tip */}
      <mesh ref={nodeRef}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* HTML label */}
      <group ref={htmlRef}>
        <Html
          center
          style={{
            color: skill.color,
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "var(--font-space, system-ui)",
            textShadow: `0 0 10px ${skill.color}88`,
          }}
        >
          {skill.name}
          <br />
          <span style={{ opacity: 0.6, fontSize: "9px" }}>
            {Math.round(skill.level * 100)}%
          </span>
        </Html>
      </group>
    </group>
  );
}

/* ── Centre hub ──────────────────────────────────────────────────── */
function Hub() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.y = t * 0.3;
    const breathe = 1 + Math.sin(t * 2) * 0.06;
    meshRef.current.scale.setScalar(breathe);
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.22, 1]} />
      <meshPhysicalMaterial
        color="#00c8ff"
        emissive={new THREE.Color("#00c8ff")}
        emissiveIntensity={1.2}
        roughness={0.05}
        metalness={1}
      />
    </mesh>
  );
}

/* ── Camera + scene auto-rotate ─────────────────────────────────── */
function SceneController({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.08) * 0.4;
    camera.position.z = 5.5 + Math.cos(t * 0.08) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Inner scene ─────────────────────────────────────────────────── */
function RadialScene({
  progressRef,
  globalProgress,
}: {
  progressRef: React.MutableRefObject<number[]>;
  globalProgress: React.MutableRefObject<number>;
}) {
  useFrame(() => {
    RADIAL_SKILLS.forEach((_, i) => {
      progressRef.current[i] = THREE.MathUtils.lerp(
        progressRef.current[i],
        globalProgress.current,
        0.028
      );
    });
  });

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#00c8ff" />
      <Hub />
      {RADIAL_SKILLS.map((skill, i) => (
        <Bone key={skill.name} skill={skill} progressRef={progressRef} index={i} />
      ))}
    </>
  );
}

/* ── Exported wrapper ────────────────────────────────────────────── */
export default function SkillsRadial({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasWrapRef   = useRef<HTMLDivElement>(null);
  const progressRef     = useRef<number[]>(Array(RADIAL_SKILLS.length).fill(0));
  const globalProgress  = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 72%",
      onEnter:     () => { globalProgress.current = 1; },
      onLeaveBack: () => { globalProgress.current = 0; },
    });
    return () => trigger.kill();
  }, [containerRef]);

  return (
    <div ref={canvasWrapRef} style={{ width: "100%", height: 460, position: "relative" }}>
      <Canvas
        camera={{ position: [0, 2.8, 5.5], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <RadialScene progressRef={progressRef} globalProgress={globalProgress} />
        <SceneController progress={globalProgress} />
      </Canvas>
    </div>
  );
}

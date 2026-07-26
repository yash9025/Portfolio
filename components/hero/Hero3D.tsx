"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Low-power device detection ──────────────────────────── */
function isLowPower(): boolean {
  if (typeof navigator === "undefined") return false;
  return (navigator.hardwareConcurrency ?? 8) < 4;
}

/* ── Inner scene (inside Canvas) ────────────────────────── */
function ParticleCluster({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  /* Generate particle positions once */
  const [positions, sizes] = useMemo(() => {
    const count = 2200;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const radius = 2.4;

    for (let i = 0; i < count; i++) {
      /* Spherical distribution */
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); // cube root for uniform fill

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      sz[i] = Math.random() * 0.8 + 0.2;
    }
    return [pos, sz];
  }, []);

  /* Lerp targets for mouse parallax */
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    /* Smooth follow mouse */
    target.current.x += (mouseRef.current.x * 0.5 - target.current.x) * 0.05;
    target.current.y += (mouseRef.current.y * 0.5 - target.current.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y = target.current.x * 0.4 + t * 0.06;
      groupRef.current.rotation.x = target.current.y * 0.3 + Math.sin(t * 0.2) * 0.1;
    }

    if (pointsRef.current) {
      /* Breathing scale */
      const breathe = 1 + Math.sin(t * 0.8) * 0.04;
      pointsRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00c8ff"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.85}
        />
      </Points>
      {/* Secondary inner core — purple tint */}
      <Points
        positions={positions.slice(0, 600 * 3)}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#7b61ff"
          size={0.032}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

/* ── Camera parallax ─────────────────────────────────────── */
function CameraRig({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    target.current.x += (mouseRef.current.x * 0.15 - target.current.x) * 0.03;
    target.current.y += (-mouseRef.current.y * 0.1 - target.current.y) * 0.03;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Exported component ──────────────────────────────────── */
export default function Hero3D() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const lowPower = isLowPower();

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (lowPower) {
    /* Static gradient fallback for weak GPUs */
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,200,255,0.18) 0%, rgba(123,97,255,0.12) 45%, transparent 70%)",
        }}
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.2} />
      <ParticleCluster mouseRef={mouseRef} />
      <CameraRig mouseRef={mouseRef} />
    </Canvas>
  );
}

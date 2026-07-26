"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function isLowPower() {
  if (typeof navigator === "undefined") return false;
  return (navigator.hardwareConcurrency ?? 8) < 4;
}

type GeoType = "icosahedron" | "octahedron" | "torusKnot";

/* ── Inner Three.js scene ─────────────────────────────────────────── */
function SpecimenMesh({
  color,
  geoType,
  hovered,
}: {
  color: string;
  geoType: GeoType;
  hovered: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef   = useRef<THREE.MeshPhysicalMaterial>(null!);
  const colorObj = new THREE.Color(color);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.rotation.y = t * (hovered ? 0.45 : 0.18);
    groupRef.current.rotation.x = Math.sin(t * 0.55) * 0.12;
    const breathe = 1 + Math.sin(t * 1.4) * 0.035;
    groupRef.current.scale.setScalar(breathe);
    if (matRef.current) {
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        matRef.current.emissiveIntensity,
        hovered ? 0.9 : 0.45,
        0.06
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Solid core */}
      <mesh>
        {geoType === "icosahedron" && <icosahedronGeometry args={[1.2, 2]} />}
        {geoType === "octahedron"  && <octahedronGeometry  args={[1.2, 2]} />}
        {geoType === "torusKnot"   && <torusKnotGeometry   args={[0.82, 0.28, 120, 16]} />}
        <meshPhysicalMaterial
          ref={matRef}
          color={color}
          emissive={colorObj}
          emissiveIntensity={0.45}
          roughness={0.05}
          metalness={0.92}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh>
        {geoType === "icosahedron" && <icosahedronGeometry args={[1.38, 2]} />}
        {geoType === "octahedron"  && <octahedronGeometry  args={[1.38, 2]} />}
        {geoType === "torusKnot"   && <torusKnotGeometry   args={[0.9, 0.34, 60, 10]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.18} />
      </mesh>
      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
      {/* Point light inside specimen */}
      <pointLight color={color} intensity={3} distance={4} />
    </group>
  );
}

/* ── Exported component ───────────────────────────────────────────── */
export default function ProjectSpecimen({
  color,
  geoType,
  height = 380,
}: {
  color: string;
  geoType: GeoType;
  height?: number;
}) {
  const [hovered, setHovered] = useState(false);

  if (isLowPower()) {
    return (
      <div style={{
        height,
        borderRadius: "var(--radius)",
        background: `radial-gradient(circle at 50% 50%, ${color}25 0%, transparent 70%)`,
      }} />
    );
  }

  return (
    <div
      style={{ height, cursor: hovered ? "grabbing" : "grab" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <ambientLight intensity={0.12} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color={color} />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color={color} />
        <SpecimenMesh color={color} geoType={geoType} hovered={hovered} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!hovered}
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI * 0.32}
          maxPolarAngle={Math.PI * 0.68}
        />
        <EffectComposer>
          <Bloom
            intensity={2.2}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.88}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";
import { getScenePalette } from "./palette";

const CYCLE = 8;

function stageOpacity(t: number, stage: number, stages = 4, fade = 0.35) {
  const start = stage / stages;
  const end = (stage + 1) / stages;
  const span = end - start;
  const a = start;
  const b = start + span * fade;
  const c = end - span * fade;
  const d = end;
  if (t < a || t > d) return 0;
  if (t < b) return (t - a) / (b - a);
  if (t > c) return 1 - (t - c) / (d - c);
  return 1;
}

function Beam({ palette, beamColor }: { palette: ReturnType<typeof getScenePalette>; beamColor: string }) {
  const beamRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.LineSegments>(null);
  const weldRef = useRef<THREE.Mesh>(null);
  const weldLightRef = useRef<THREE.PointLight>(null);
  const crateRef = useRef<THREE.LineSegments>(null);
  const beamMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = (state.clock.getElapsedTime() % CYCLE) / CYCLE;

    const specOp = stageOpacity(t, 0);
    const testOp = stageOpacity(t, 1);
    const fabOp = stageOpacity(t, 2);
    const deliverOp = stageOpacity(t, 3);

    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = specOp * 0.55 * palette.opacityMult;
    }
    if (beamRef.current) {
      beamRef.current.position.y = deliverOp > 0 ? -0.05 * deliverOp : 0;
      beamRef.current.rotation.z = specOp * 0.03;
    }
    if (beamMatRef.current) {
      beamMatRef.current.opacity = 0.35 + 0.65 * (1 - specOp * 0.5);
      beamMatRef.current.emissiveIntensity = testOp * 0.5;
    }
    if (weldRef.current) {
      const s = 0.4 + fabOp * 0.8;
      weldRef.current.scale.set(s, s, s);
      const mat = weldRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = fabOp;
    }
    if (weldLightRef.current) {
      weldLightRef.current.intensity = fabOp * 3.5;
    }
    if (crateRef.current) {
      const mat = crateRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = deliverOp * 0.8 * palette.opacityMult;
      const s = 0.94 + deliverOp * 0.06;
      crateRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <lineSegments ref={gridRef} position={[0, 0, -0.4]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 1.6, 8, 4)]} />
        <lineBasicMaterial color={palette.lineBase} transparent opacity={0} />
      </lineSegments>

      <mesh ref={beamRef} castShadow>
        <boxGeometry args={[2.6, 0.22, 0.22]} />
        <meshStandardMaterial
          ref={beamMatRef}
          color={beamColor}
          metalness={0.5}
          roughness={0.45}
          emissive={palette.lineBase}
          emissiveIntensity={0}
          transparent
          opacity={0.35}
        />
      </mesh>

      <mesh ref={weldRef} position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial
          color="#ffb347"
          emissive="#ff8c1a"
          emissiveIntensity={1.4}
          transparent
          opacity={0}
        />
      </mesh>
      <pointLight ref={weldLightRef} position={[0, 0.16, 0]} color="#ffb347" intensity={0} distance={2.5} />

      <lineSegments ref={crateRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.1, 0.7, 0.7)]} />
        <lineBasicMaterial color={palette.lineFaint} transparent opacity={0} />
      </lineSegments>
    </group>
  );
}

function Rig({ palette, beamColor }: { palette: ReturnType<typeof getScenePalette>; beamColor: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.12;
  });
  return (
    <group ref={group}>
      <Beam palette={palette} beamColor={beamColor} />
    </group>
  );
}

export default function ProcessScene() {
  const { theme } = useTheme();
  const palette = useMemo(() => getScenePalette(theme), [theme]);
  const beamColor = theme === "light" ? "#5b6b85" : "#9fb0c9";

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.5, 4.6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[3, 4, 3]} intensity={1} />
      <directionalLight position={[-3, -2, -2]} intensity={0.5} />
      <Rig palette={palette} beamColor={beamColor} />
    </Canvas>
  );
}
